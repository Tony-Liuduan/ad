import { obtainOauthAccessToken } from '@lib/twitter/oauth1';
import config from 'config';
import type { NextPageContext } from 'next';
import Twitter from 'twitter';

const twitterConfig = config.get<any>('twitter');

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

    const accessTokenData = await obtainOauthAccessToken({
        apiUrl: 'https://api.twitter.com/oauth/access_token',
        consumerKey: twitterConfig.TWITTER_CONSUMER_KEY!,
        consumerSecret: twitterConfig.TWITTER_CONSUMER_SECRET!,
        oauthToken,
        oauthVerifier,
        method: 'POST'
    });

    const { oauth_token, oauth_token_secret } = accessTokenData;

    const client = new Twitter({
        consumer_key: twitterConfig.TWITTER_CONSUMER_KEY!,
        consumer_secret: twitterConfig.TWITTER_CONSUMER_SECRET!,
        access_token_key: oauth_token,
        access_token_secret: oauth_token_secret
    });

    const params = {};
    const timeline = await new Promise((resolve, reject) => {
        client.get('statuses/user_timeline', params, (error, tweets) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(tweets);
        });
    });

    // 把数据放在 props 对象中返回出去
    return {
        props: {
            twitter: {
                timeline
            }
        }
    };
}
