import { nextRouterHandleConfig } from '@app/middlewares/error';
import { nextRouter } from '@app/utils/next-router';

export default nextRouter
    .get((req, res) => {
        res.status(200).json(req.query);
    })
    .handler(nextRouterHandleConfig);
