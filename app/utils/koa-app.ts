import Koa from 'koa';
import type { RequestHandler } from 'next/dist/server/next';
import Client, { auth } from 'twitter-api-sdk';
import config from '../../config.json';
import { middlewareCors } from '../middlewares/cors';
import { middlewareError, onError, watchNodeGlobalError } from '../middlewares/error';
import { middlewarePerformance } from '../middlewares/performance';

export function createKoaApp(requestHandler: RequestHandler) {
    const oauth2Client = new auth.OAuth2User({
        client_id: config.twitter.CLIENT_ID,
        client_secret: config.twitter.CLIENT_SECRET,
        callback: config.twitter.CALLBACK2,
        scopes: ['tweet.read', 'users.read']
    });
    watchNodeGlobalError();
    const app = new Koa();
    // 表示是否开启代理信任开关，默认为false，如果开启代理信任，对于获取request请求中的 host，protocol，ip分别优先从Header字段中的X-Forwarded-Host，X-Forwarded-Proto，X-Forwarded-For获取
    app.proxy = true;
    app.on('error', onError);
    app.use(middlewareError);
    app.use(middlewarePerformance);
    app.use(middlewareCors);
    app.use(async (ctx, next) => {
        if (ctx.path.startsWith('/api/twitter/oauth2')) {
            const authUrl = oauth2Client.generateAuthURL({
                state: 'testOauth',
                code_challenge_method: 's256'
            });
            ctx.redirect(authUrl);
            return;
        }
        if (ctx.path.startsWith('/twitter/oauth2/callback')) {
            const { code } = ctx.query;
            await oauth2Client.requestAccessToken(code as string);
            const client = new Client(oauth2Client);
            const myUser = await client.users.findMyUser();
            ctx.body = myUser;
            return;
        }
        await next();
    });
    app.use(async function (ctx) {
        await requestHandler(ctx.req, ctx.res);
    });
    return app;
}
