import { nextRouterHandleConfig } from '@app/middlewares/error';
import { nextRouter } from '@app/utils/next-router';

interface TraceEvent {
    event: string;
    pathname: string;
    timeStamp: number;
    searchParams: Record<string, any>;
    extra?: Record<string, any>;
}

export default nextRouter
    .use(async (req, res, next) => {
        // reference 校验
        const referer = req.headers.referer;
        const { hostname, pathname } = new URL(referer || '');
        const body = JSON.parse(req.body);
        if (hostname !== process.env.HOSTNAME || pathname !== body.pathname || !body.searchParams.userId) {
            // 请求非法
            res.status(403);
            res.end();
            return;
        }
        await next();
    })
    .post(async (req, res) => {
        const body: TraceEvent = JSON.parse(req.body);
        switch (body.event) {
            case 'pageView':
                handlePageViewTrace(body);
            case 'pageClose':
                handlePageCloseTrace(body);
            case '/click/download/app':
                handleClickDownloadTrace(body);
            case '/click/video/play':
                handleVideoPalyTrace(body);
            case '/click/video/pause':
                handleVideoPauseTrace(body);
        }
        res.status(200);
        res.end();
    })
    .handler(nextRouterHandleConfig);

/**
 * @description: 用户进入页面打点
 */
function handlePageViewTrace(traceEvent: TraceEvent) {}

/**
 * @description: 用户离开页面打点
 */
function handlePageCloseTrace(traceEvent: TraceEvent) {}

/**
 * @description: 点击下载 APP事件打点处理
 */
function handleClickDownloadTrace(traceEvent: TraceEvent) {}

/**
 * @description: 用户播放视频打点
 */
function handleVideoPalyTrace(traceEvent: TraceEvent) {}

/**
 * @description: 用户暂停视频打点
 */
function handleVideoPauseTrace(traceEvent: TraceEvent) {}
