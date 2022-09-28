import { obtainOauthAccessToken } from '@lib/twitter/oauth1';
import type { NextPageContext } from 'next';
import Twitter from 'twitter';

export default function TwitterOauth1CallbackPage({
    twitter
}: {
    twitter: {
        favorites: any[];
    };
}) {
    console.log(twitter);
    return <div>TwitterOauth1CallbackPage</div>;
}

export async function getServerSideProps(ctx: NextPageContext) {
    // 模拟获取数据

    // Get the oauth_verifier query parameter
    const oauthVerifier = ctx.query.oauth_verifier as string;
    // Get the oauth_token query parameter.
    // It's the same as the request token from step 1
    const oauthToken = ctx.query.oauth_token as string;
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

    const favorites = await new Promise((resolve, reject) => {
        client.get('favorites/list', (error: any, tweets: any, response: any) => {
            if (error) {
                reject(error);
                return;
            }
            console.log(tweets); // The favorites.
            console.log(response.toJSON());
            resolve(tweets);
        });
    });

    // 把数据放在 props 对象中返回出去
    return {
        props: {
            twitter: {
                favorites
            }
        }
    };
}