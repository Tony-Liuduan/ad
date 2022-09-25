import { nextRouterHandleConfig } from '@app/middlewares/error';
import { nextRouter } from '@app/utils/next-router';

export default nextRouter
    .use(async (req, res, next) => {
        // reference 校验
        const referer = req.headers.referer;
        const { hostname, pathname } = new URL(referer || '');
        const body = JSON.parse(req.body);
        if (hostname !== process.env.HOSTNAME || pathname !== body.pathname || !body.searchParams?.userId) {
            // 请求非法
            res.status(403);
            res.end();
            return;
        }
        await next();
    })
    .post(async (req, res) => {
        res.status(200);
        res.end();
    })
    .handler(nextRouterHandleConfig);
