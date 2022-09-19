import { nextRouterHandleConfig } from '@app/middlewares/error';
import { nextRouter } from '@app/utils/next-router';

export default nextRouter
    .post((req, res) => {
        console.log(req.body, req.headers.referer);
        res.status(200);
        res.end();
    })
    .handler(nextRouterHandleConfig);
