import config from 'config';
import Koa from 'koa';
import type { RequestHandler } from 'next/dist/server/next';
import Client, { auth } from 'twitter-api-sdk';
import { middlewareCors } from '../middlewares/cors';
import { middlewareError, onError, watchNodeGlobalError } from '../middlewares/error';
import { middlewarePerformance } from '../middlewares/performance';

const twitterConfig = config.get<any>('twitter');
const oauth2Client = new auth.OAuth2User({
    client_id: twitterConfig.CLIENT_ID,
    client_secret: twitterConfig.CLIENT_SECRET,
    callback: twitterConfig.CALLBACK2,
    scopes: [
        'tweet.read',
        'tweet.write',
        'tweet.moderate.write',
        'users.read',
        'follows.read',
        'follows.write',
        'offline.access',
        'space.read',
        'mute.read',
        'mute.write',
        'like.read',
        'like.write',
        'list.read',
        'list.write',
        'block.read',
        'block.write',
        'bookmark.read',
        'bookmark.write'
    ]
});

export function createKoaApp(requestHandler: RequestHandler) {
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
            const myUser: any = await client.users.findMyUser();
            const userId = myUser.data.id; // 1574050891262353408
            // 查询：获取当前用户关注的人列表，目标 id：292132128
            const following = await client.users.usersIdFollowing(userId);
            // 查询：获取关注当前用户的人列表
            // const followers = await client.users.usersIdFollowers(userId);
            // 查询：用户喜欢的推文列表，目标推文 id：1449148429058260992
            const lickedTweets = await client.tweets.usersIdLikedTweets(userId);
            // 查询：用户转发、评论列表
            // 转发："text": "RT @jack: just setting up my twttr"
            // 评论："text": "@compoundfinance test"
            const usersIdTweets = await client.tweets.usersIdTweets(userId);
            // 执行：转发某条推特
            // const usersIdRetweets = await client.tweets.usersIdRetweets(userId, { tweet_id: '20' });

            console.log('following', JSON.stringify(following, null, 2));
            console.log('lickedTweets', JSON.stringify(lickedTweets, null, 2));
            console.log('usersIdTweets', JSON.stringify(usersIdTweets, null, 2));
            // console.log('usersIdRetweets', JSON.stringify(usersIdRetweets, null, 2));

            ctx.body = {
                myUser,
                following,
                lickedTweets,
                usersIdTweets
                // usersIdRetweets
            };

            return;
        }
        await next();
    });
    app.use(async function (ctx) {
        await requestHandler(ctx.req, ctx.res);
    });
    return app;
}
