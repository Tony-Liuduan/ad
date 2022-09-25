import { nextRouterHandleConfig } from '@app/middlewares/error';
import { nextRouter } from '@app/utils/next-router';
import { obtainOauthRequestToken } from '@lib/twitter/oauth1';

export default nextRouter
    .get(async (_req, res) => {
        const obtainRequestTokenConfig = {
            apiUrl: 'https://api.twitter.com/oauth/request_token',
            callbackUrl: process.env.ORIGIN + '/twitter/oauth/v1/callback',
            consumerKey: process.env.TWITTER_CONSUMER_KEY!,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
            method: 'POST'
        };
        const requestTokenData = await obtainOauthRequestToken(obtainRequestTokenConfig);
        if (requestTokenData.oauth_callback_confirmed !== 'true') {
            res.status(503);
            res.send({ error: 'Twitter Oauth Request Token Error' });
            res.end();
            return;
        }
        res.redirect(`https://api.twitter.com/oauth/authorize?oauth_token=${requestTokenData.oauth_token}`);
        res.status(200);
        res.end();
        /**
         * https://cri.dev/posts/2020-02-15-Twitter-OAuth-by-example-in-Nodejs/
         *
         *
         *
        var oauth = new OAuth.OAuth(
            'https://api.twitter.com/oauth/request_token',
            'https://api.twitter.com/oauth/access_token',
            process.env.TWITTER_CONSUMER_KEY!,
            process.env.TWITTER_CONSUMER_SECRET!,
            '1.0A',
            null,
            'HMAC-SHA1'
        );
        const get = promisify(oauth.get.bind(oauth));
        const body = (await get(
            `https://api.twitter.com/1.1/users/show.json?screen_name=twitterdev`,
            process.env.TWITTER_CLIENT_ID!,
            process.env.TWITTER_CLIENT_SECRET!
        )) as string;
        res.status(200);
        res.send(JSON.parse(body));
        res.end();
        */
    })
    .handler(nextRouterHandleConfig);
