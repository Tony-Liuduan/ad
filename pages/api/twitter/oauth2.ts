import { nextRouterHandleConfig } from '@app/middlewares/error';
import { nextRouter } from '@app/utils/next-router';
import { oauth2Client } from '@lib/twitter/oauth2';

export default nextRouter
    .get(async (_req, res) => {
        // const { state } = req.query;
        const authUrl = oauth2Client.generateAuthURL({
            state: 'testOauth',
            code_challenge_method: 's256'
        });
        res.redirect(authUrl);
    })
    .handler(nextRouterHandleConfig);
