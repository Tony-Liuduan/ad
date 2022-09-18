import { isDevelopment } from '@lib/env';
import type Koa from 'koa';
import { ctxLogger } from '../utils/logger';

export async function middlewarePerformance(ctx: Koa.ParameterizedContext, next: Koa.Next) {
    if (isDevelopment || /favicon\.ico/.test(ctx.url)) {
        await next();
    } else {
        const reqTime = +new Date();
        await next();
        const resTime = +new Date();
        const logObj: {
            duration: number;
            status: number;
            redirect?: string;
        } = {
            duration: resTime - reqTime,
            status: ctx.status
        };
        if (ctx.response.headers.location) {
            logObj.redirect = ctx.response.headers.location as string;
        }
        ctxLogger.trace(ctx, logObj);
    }
}
