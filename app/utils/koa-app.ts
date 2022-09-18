import Koa from 'koa';
import type { RequestHandler } from 'next/dist/server/next';
import { middlewareCors } from '../middlewares/cors';
import { middlewareError, onError, watchNodeGlobalError } from '../middlewares/error';
import { middlewarePerformance } from '../middlewares/performance';

export function createKoaApp(requestHandler: RequestHandler) {
    watchNodeGlobalError();
    const app = new Koa();
    // 表示是否开启代理信任开关，默认为false，如果开启代理信任，对于获取request请求中的 host，protocol，ip分别优先从Header字段中的X-Forwarded-Host，X-Forwarded-Proto，X-Forwarded-For获取
    app.proxy = true;
    app.on('error', onError);
    app.use(middlewareError);
    app.use(middlewarePerformance);
    app.use(middlewareCors);
    app.use(async function (ctx) {
        await requestHandler(ctx.req, ctx.res);
    });
    return app;
}
