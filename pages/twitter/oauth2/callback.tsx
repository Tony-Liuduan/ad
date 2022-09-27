import { oauth2Client } from '@lib/twitter/oauth2';
import type { NextPageContext } from 'next';
import Client from 'twitter-api-sdk';

export default function TwitterOauth2CallbackPage({ twitter }: any) {
    console.log(twitter);
    return <div>TwitterOauth2CallbackPage</div>;
}

export async function getServerSideProps(ctx: NextPageContext) {
    const { code } = ctx.query;
    // FIXME:
    // error: {
    //     error: 'invalid_request',
    //     error_description: 'Missing required parameter [code_verifier].'
    // }
    await oauth2Client.requestAccessToken(code as string).catch(err => {
        console.log(err);
    });

    const client = new Client(oauth2Client);

    const myUser: {
        data: {
            id: string;
            name: string;
            username: string;
        };
    } = (await client.users.findMyUser()) as any;

    console.log(myUser);

    // 把数据放在 props 对象中返回出去
    return {
        props: {
            twitter: {
                myUser
            }
        }
    };
}
