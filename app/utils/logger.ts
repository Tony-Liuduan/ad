/**
 * level: log4js 的日志分为九个等级，各个级别的名字和权重如下：
 *
 * ALL: new Level(Number.MIN_VALUE, "ALL"),  输出所有日志
 * TRACE: new Level(5000, "TRACE"),          输出级别相等或更高级别的日志
 * DEBUG: new Level(10000, "DEBUG"),
 * INFO: new Level(20000, "INFO"),
 * WARN: new Level(30000, "WARN"),
 * ERROR: new Level(40000, "ERROR"),          指出虽然发生错误事件，但仍然不影响系统的继续运行。打印错误和异常信息，如果不想输出太多的日志，可以使用这个级别
 * FATAL: new Level(50000, "FATAL"),          指出每个严重的错误事件将会导致应用程序的退出。这个级别比较高了。重大错误，这种级别你可以直接停止程序了
 * MARK: new Level(9007199254740992, "MARK"),
 * OFF: new Level(Number.MAX_VALUE, "OFF"),  所有日志都不输出
 *
 * 详见：https://zhuanlan.zhihu.com/p/22110802
 */

import { isDevelopment } from '@lib/env';
import { isObject } from '@lib/is';
import { format } from 'date-fns';
import type Koa from 'koa';
import type { Layout, LoggingEvent } from 'log4js';
import log4js from 'log4js';
import type { NextApiRequest } from 'next';
import util from 'util';
import packageJson from '../../package.json';
import { getClientIp, getUA } from './ctx';

const APP_NAME = packageJson.name;
const TIMESTAMP_FORMAT = 'yyyy-MM-dd HH:mm:ss.SSS';

const error2Obj = (err: unknown) => {
    // is axios error，防止 JSON.stringfiy 循环引用
    if (
        isObject(err) &&
        /axios/i.test(err.name) &&
        isObject(err.config) &&
        isObject(err.request) &&
        err.hasOwnProperty('code')
    ) {
        return {
            name: err.name,
            code: err.code,
            errorType: err.errorType,
            errorMsg: err.errorMsg,
            message: err.message,
            url: err.config.url,
            req: {
                headers: err.config.headers,
                params: err.config.params,
                data: err.config.data
            },
            res: {
                data: err.response?.data,
                status: err.response?.status,
                statusText: err.response?.statusText
            }
        };
    }
    if (!util.types.isNativeError(err)) {
        return err;
    }
    return {
        message: err.message,
        stack: err.stack
    };
};

log4js.addLayout('logger', function () {
    return function (event: LoggingEvent & { functionName?: string; fileName?: string }) {
        const { level, data, startTime } = event;
        const timeStamp = format(startTime, TIMESTAMP_FORMAT);
        const levelStr = level.levelStr;
        const userData = data.map(error2Obj);
        let output = '';
        try {
            output = JSON.stringify(userData);
        } catch (_e) {}
        return `${timeStamp} [${levelStr}] [${APP_NAME}] ${output}\n`;
    };
});

log4js.addLayout('ctxLogger', function () {
    return function (event: LoggingEvent & { functionName?: string; fileName?: string }) {
        const { level, data, startTime } = event;
        const timeStamp = format(startTime, TIMESTAMP_FORMAT);
        const levelStr = level.levelStr;
        const userData = data.map(error2Obj);
        let output = '';
        try {
            const ctx = userData[0] as Koa.ParameterizedContext;
            const clientIp = getClientIp(ctx);
            const ua = getUA(ctx);
            const hostname = ctx.hostname;
            const method = ctx.method;
            const url = ctx.url;
            const referer = ctx.header.referer || '';
            const extra = userData.slice(1);
            output = `clientIp=${clientIp} ua=${ua} hostname=${hostname} method=${method} url=${url} referer=${referer} extra=${JSON.stringify(
                extra
            )}`;
        } catch (_) {
            try {
                output = JSON.stringify(userData);
            } catch (_e) {}
        }
        return `${timeStamp} [${levelStr}] [${APP_NAME}] ${output}\n`;
    };
});

log4js.addLayout('nextLogger', function (_config: Layout) {
    return function (event: LoggingEvent & { functionName?: string; fileName?: string }) {
        const { level, data, startTime } = event;
        const timeStamp = format(startTime, TIMESTAMP_FORMAT);
        const levelStr = level.levelStr;
        const userData = data.map(error2Obj);
        let output = '';
        try {
            const req = userData[0] as NextApiRequest;
            const clientIp = req.connection.remoteAddress || '';
            const ua = req.headers['user-agent'];
            const hostname = req.headers.host;
            const method = req.method;
            const url = req.url;
            const referer = req.headers.referer || '';
            const extra = userData.slice(1);
            output = `clientIp=${clientIp} ua=${ua} hostname=${hostname} method=${method} url=${url} referer=${referer} extra=${JSON.stringify(
                extra
            )}`;
        } catch (_) {
            try {
                output = JSON.stringify(userData);
            } catch (_e) {}
        }
        return `${timeStamp} [${levelStr}] [${APP_NAME}] ${output}\n`;
    };
});

log4js.configure({
    appenders: {
        default: {
            type: isDevelopment ? 'console' : 'stdout',
            layout: {
                type: 'logger'
            }
        },
        ctxReq: {
            type: isDevelopment ? 'console' : 'stdout',
            layout: {
                type: 'ctxLogger'
            }
        },
        nextReq: {
            type: isDevelopment ? 'console' : 'stdout',
            layout: {
                type: 'nextLogger'
            }
        }
    },
    categories: {
        default: {
            appenders: ['default'],
            level: 'all'
        },
        ctxReq: {
            appenders: ['ctxReq'],
            level: 'all'
        },
        nextReq: {
            appenders: ['nextReq'],
            level: 'all'
        }
    },
    disableClustering: !isDevelopment
});

export const logger = log4js.getLogger();
export const ctxLogger = log4js.getLogger('ctxReq');
export const nextLogger = log4js.getLogger('nextReq');
