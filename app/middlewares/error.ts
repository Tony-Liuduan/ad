import type { HttpErrorInfo } from '@lib/http.type';
import type { AxiosError } from 'axios';
import type Koa from 'koa';
import type { Socket } from 'net';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ctxLogger, logger, nextLogger } from '../utils/logger';

export const watchNodeGlobalError = () => {
    // 抓取全局异常
    process.on('uncaughtException', function uncaughtException(err: Error) {
        logger.fatal(err);
        process.exit(1);
    });

    // 抓取异步异常
    process.on('unhandledRejection', function unhandledRejection(err: Error | (HttpErrorInfo & AxiosError)) {
        logger.error(err);
    });
};

export async function middlewareError(ctx: Koa.ParameterizedContext, next: Koa.Next) {
    try {
        await next();
    } catch (err) {
        ctxLogger.error(ctx, err);
        ctx.body = err;
    }
}

export async function onError(err: Error, ctx?: Koa.ParameterizedContext) {
    if (ctx) {
        ctxLogger.error(ctx, err);
    } else {
        logger.error(err);
    }
}

export async function onClientError(err: Error, socket: Socket) {
    logger.error(err);
    socket.end('HTTP 400 Bad Request Request invalid\r\n\r\n');
}

export async function onNextRouterError(err: unknown, req: NextApiRequest, res: NextApiResponse) {
    const { errorType, errorMsg, ...error } = (err || {}) as HttpErrorInfo & AxiosError;
    nextLogger.error(req, errorMsg || error.message);
    res.statusCode = error?.response?.status ?? 500;
    res.end(errorMsg || error.message);
}

export async function onNextRouterNoMatch(req: NextApiRequest, res: NextApiResponse) {
    const message = `Route ${req.method} ${req.url} not found`;
    nextLogger.error(req, message);
    res.statusCode = 404;
    res.end(req.method !== 'HEAD' ? message : undefined);
}

export const nextRouterHandleConfig = {
    onError: onNextRouterError,
    onNoMatch: onNextRouterNoMatch
};
