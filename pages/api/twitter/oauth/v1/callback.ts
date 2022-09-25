import { nextRouterHandleConfig } from '@app/middlewares/error';
import { nextRouter } from '@app/utils/next-router';
import { obtainOauthAccessToken } from '@lib/twitter/oauth1';
import Twitter from 'twitter';

export default nextRouter
    .get(async (req, res) => {
        // Get the oauth_verifier query parameter
        const oauthVerifier = req.query.oauth_verifier as string;
        // Get the oauth_token query parameter.
        // It's the same as the request token from step 1
        const oauthToken = req.query.oauth_token as string;
        console.log('Got oauth from twitter', oauthVerifier, oauthToken);

        const accessTokenData = await obtainOauthAccessToken({
            apiUrl: 'https://api.twitter.com/oauth/access_token',
            consumerKey: process.env.TWITTER_CONSUMER_KEY!,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
            oauthToken,
            oauthVerifier,
            method: 'POST'
        });

        // const response = await twitterSignIn.getAccessToken(requestToken, oauthTokenMap[requestToken], oauthVerifier);

        console.log('Got user access token', accessTokenData);

        const { oauth_token, oauth_token_secret } = accessTokenData;

        const client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY!,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
            access_token_key: oauth_token,
            access_token_secret: oauth_token_secret
        });

        client.get('favorites/list', (error: any, tweets: any, response: any) => {
            if (error) throw error;
            console.log(tweets); // The favorites.
            console.log(response); // Raw response object.
        });

        res.status(200);
        res.end();
    })
    .handler(nextRouterHandleConfig);
