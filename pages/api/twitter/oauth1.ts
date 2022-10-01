import { nextRouterHandleConfig } from '@app/middlewares/error';
import { nextRouter } from '@app/utils/next-router';
import { obtainOauthRequestToken } from '@lib/twitter/oauth1';
import config from 'config';

const twitterConfig = config.get<any>('twitter');

export default nextRouter
    .get(async (_req, res) => {
        const obtainRequestTokenConfig = {
            apiUrl: 'https://api.twitter.com/oauth/request_token',
            callbackUrl: twitterConfig.CALLBACK1!,
            consumerKey: twitterConfig.TWITTER_CONSUMER_KEY!,
            consumerSecret: twitterConfig.TWITTER_CONSUMER_SECRET!,
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
    })
    .handler(nextRouterHandleConfig);
