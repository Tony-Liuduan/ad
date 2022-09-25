import { nextRouterHandleConfig } from '@app/middlewares/error';
import { nextRouter } from '@app/utils/next-router';
import { oauth2Client } from '@lib/twitter/oauth2';
import Client from 'twitter-api-sdk';

export default nextRouter
    .get(async (req, res) => {
        const { code } = req.query;
        await oauth2Client.requestAccessToken(code as string);

        const client = new Client(oauth2Client);

        const myUser: {
            data: {
                id: string;
                name: string;
                username: string;
            };
        } = (await client.users.findMyUser()) as any;

        res.status(200);
        res.send(myUser);
        res.end();
    })
    .handler(nextRouterHandleConfig);
