import { nextRouterHandleConfig } from '@app/middlewares/error';
import { logger, nextLogger } from '@app/utils/logger';
import { nextRouter } from '@app/utils/next-router';
import { http } from '@lib/http.server';
import { keypair$ } from '@lib/polkadot';
import { hexToU8a, stringToU8a, u8aToHex } from '@polkadot/util';
import { keccak256AsU8a } from '@polkadot/util-crypto';
import config from 'config';
import findLastIndex from 'lodash/findLastIndex';
import groupBy from 'lodash/groupBy';
import * as $ from 'parity-scale-codec';

interface TraceEvent {
    event: string;
    pathname: string;
    timestamp: number;
    searchParams: Record<string, any>;
    extra?: Record<string, any>;
    isDone?: boolean; // 是否已评分
}

enum TRACE_EVENT_TYPE {
    PAGE_VEIVE = 'pageView',
    PAGE_CLOSE = 'pageClose',
    CLICK_DOWNLOAD_APP = '/click/download/app',
    CLICK_VIDEO_PLAY = '/click/video/play',
    CLICK_VIDEO_PAUSE = '/click/video/pause'
}

enum SCORE_TYPE {
    PAGE_VEIVE = 'pageView',
    VIDEO_VEIVE = 'videoView',
    DOWNLOAD_APP = 'downloadApp'
}

// 定义满分满分
const FULL_SCORE = 5;
// 定义点击下载按钮评分
const DOWNDLOAD_APP_SCORE = 5;
// 定义浏览页面满分时长 s
const FULL_SCORE_PAGE_VIEW_DURATION = 10;
// 定义默认浏览视频满分时长 s
const FULL_SCORE_VIDEO_VIEW_DURATION = 10;

// FIXME: db 人数太多了内存不够用怎么办
// FIXME: 若多台服务器多实例部署，则需要考虑异步问题
const db = new Map<string, TraceEvent[]>();

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
        const body = JSON.parse(req.body);
        nextLogger.trace(req, body);
        switch (body.event) {
            case TRACE_EVENT_TYPE.PAGE_VEIVE:
                handlePageViewTrace(body);
                break;
            case TRACE_EVENT_TYPE.PAGE_CLOSE:
                handlePageCloseTrace(body);
                break;
            case TRACE_EVENT_TYPE.CLICK_DOWNLOAD_APP:
                handleClickDownloadTrace(body);
                break;
            case TRACE_EVENT_TYPE.CLICK_VIDEO_PLAY:
                handleVideoPalyTrace(body);
                break;
            case TRACE_EVENT_TYPE.CLICK_VIDEO_PAUSE:
                handleVideoPauseTrace(body);
                break;
        }
    })
    .handler(nextRouterHandleConfig);

/**
 * @description: 用户进入页面打点
 * 已用户维度记录用户进入页面时间
 */
async function handlePageViewTrace(traceEvent: TraceEvent) {
    const { userId } = traceEvent.searchParams;
    const traces = db.get(userId);
    // 记录新值
    db.delete(userId);
    db.set(userId, [traceEvent]);
    // 如果还有未发送的历史记录则先发送历史记录评分
    if (traces?.length) {
        handleSubmitTraces(userId, traces);
    }
}

/**
 * @description: 用户离开页面打点
 */
async function handlePageCloseTrace(traceEvent: TraceEvent) {
    const { pathname } = traceEvent;
    const { userId } = traceEvent.searchParams;
    // 如果无历史进入记录则放弃本次打点
    if (!validTraces(userId, pathname)) {
        db.delete(userId);
        return;
    }
    // 追加记录
    const traces = db.get(userId)!;
    db.set(userId, [...traces, traceEvent]);
    handleSubmitTraces(userId, db.get(userId)!);
    traces[0].isDone = true;
}

/**
 * @description: 点击下载 APP事件打点处理
 */
async function handleClickDownloadTrace(traceEvent: TraceEvent) {
    const { pathname } = traceEvent;
    const { userId } = traceEvent.searchParams;
    // 如果无历史进入记录则放弃本次打点
    if (!validTraces(userId, pathname)) {
        db.delete(userId);
        return;
    }
    // 不记录到 db，直接请求打分
    sendUserScore(userId, SCORE_TYPE.DOWNLOAD_APP, DOWNDLOAD_APP_SCORE, traceEvent.searchParams);
}

/**
 * @description: 用户播放视频打点
 */
async function handleVideoPalyTrace(traceEvent: TraceEvent) {
    const { pathname } = traceEvent;
    const { userId } = traceEvent.searchParams;
    // 如果无历史进入记录则放弃本次打点
    if (!validTraces(userId, pathname)) {
        db.delete(userId);
        return;
    }
    // 追加记录
    const traces = db.get(userId)!;
    db.set(userId, [...traces, traceEvent]);
}

/**
 * @description: 用户暂停视频打点
 */
async function handleVideoPauseTrace(traceEvent: TraceEvent) {
    const { pathname } = traceEvent;
    const { userId } = traceEvent.searchParams;
    // 如果无历史进入记录则放弃本次打点
    if (!validTraces(userId, pathname)) {
        db.delete(userId);
        return;
    }
    // 追加记录
    const traces = db.get(userId)!;
    db.set(userId, [...traces, traceEvent]);
}

/**
 * @description: 提交用户打点数据入口方法
 */
async function handleSubmitTraces(userId: string, traces: TraceEvent[]) {
    // 按 pathname 区分统计 trace
    const traceMap = groupBy(
        traces.sort((x, y) => x.timestamp - y.timestamp),
        'pathname'
    );

    Object.keys(traceMap).forEach(pathname => {
        const traceListByPathname = traceMap[pathname];
        // 洗数据，截取最后一个 pageView 到第一个 pageClose 之间的值
        const pageViewIndex = findLastIndex(traceListByPathname, item => item.event === TRACE_EVENT_TYPE.PAGE_VEIVE);
        const pageCloseIndex = traceListByPathname.findIndex(item => item.event === TRACE_EVENT_TYPE.PAGE_CLOSE);
        // 检查数据是否可用, 不可用则返回
        if (
            [pageCloseIndex, pageViewIndex].includes(-1) ||
            pageViewIndex >= pageCloseIndex ||
            traceListByPathname[pageViewIndex].timestamp >= traceListByPathname[pageCloseIndex].timestamp ||
            traceListByPathname[pageViewIndex].isDone
        ) {
            return;
        }
        // 拿到清洗后的埋点数据
        const flushTraces = traceListByPathname.slice(pageViewIndex, pageCloseIndex + 1);
        handleSubmitFlushTrace(userId, flushTraces);
    });
}

/**
 * @description: 提交清晰后的打点数据 && 评分
 */
async function handleSubmitFlushTrace(userId: string, traces: TraceEvent[]) {
    // 移除 db
    if ((db.get(userId) ?? []).length > 1) {
        db.delete(userId);
    }

    const len = traces.length;
    const pageCloseTrace = traces[len - 1];
    const { searchParams } = traces[0];

    /**
     * @description: 计算用户访问页面时长
     */
    const pageViewDuration = (pageCloseTrace.timestamp - traces[0].timestamp) / 1000;
    let pageViewScore = 0;
    // 浏览时长大于 10s 满分，小于 10s 按比例赋予分数
    if (pageViewDuration >= 10) {
        pageViewScore = FULL_SCORE;
    } else {
        pageViewScore = Math.round((pageViewDuration / FULL_SCORE_PAGE_VIEW_DURATION) * FULL_SCORE);
    }
    // 发送页面浏览评分
    sendUserScore(userId, SCORE_TYPE.PAGE_VEIVE, pageViewScore, searchParams);

    /**
     * @description: 计算用户流量视频时长
     */
    let i = 1;
    let videoPlayTime = 0;
    let videoTimes = [];
    let videoTotalDuration = 0;
    let videoScore = 0;
    while (i < len - 1) {
        const { timestamp, event, extra } = traces[i];
        if (!videoTotalDuration && extra?.duration) {
            videoTotalDuration = extra?.duration;
        }
        // 收集 play 时间
        if (event === TRACE_EVENT_TYPE.CLICK_VIDEO_PLAY) {
            videoPlayTime = timestamp;
        } else if (videoPlayTime && event === TRACE_EVENT_TYPE.CLICK_VIDEO_PAUSE) {
            // 收集 暂停 时间
            videoTimes.push([videoPlayTime, timestamp]);
            videoPlayTime = 0;
        }
        i++;
    }
    if (videoPlayTime) {
        videoTimes.push([videoPlayTime, pageCloseTrace.timestamp]);
    }
    // 计算视频浏览时长 s
    const videoViewDuration = videoTimes.reduce((sum, item) => item[1] - item[0] + sum, 0) / 1000;
    videoTotalDuration = videoTotalDuration || Math.max(videoViewDuration, FULL_SCORE_VIDEO_VIEW_DURATION);
    // 计算评分
    videoScore = Math.round((videoViewDuration / videoTotalDuration) * FULL_SCORE);
    // 发送视频评分
    sendUserScore(userId, SCORE_TYPE.VIDEO_VEIVE, videoScore, searchParams);
}

/**
 * @description: 验证埋点是否可用
 */
function validTraces(userId: string, pathname: string) {
    const traces = db.get(userId);
    // 如果无历史进入记录则放弃本次打点
    return traces?.some(trace => trace.event === TRACE_EVENT_TYPE.PAGE_VEIVE && trace.pathname === pathname);
}

/**
 * @description: 发送评分
 */
async function sendUserScore(userId: string, scoreType: SCORE_TYPE, score: number, searchParams: Record<string, any>) {
    logger.trace({ userId, scoreType, score, status: 'start' });

    const keypair: any = await keypair$;

    let { ad, nftId, did, referrer, tag } = searchParams;

    score = Math.max(Math.min(5, score), -5) || 0;

    let currentScores;
    try {
        const resp = await http.get(
            `${config.get<string>('airdropServer')}/advertisers/scores?ad=${ad}&nft=${nftId}&did=${did}`
        );
        currentScores = resp.data.scores;
    } catch (e) {
        currentScores = [];
    }

    const tag2Score: { [tag: string]: number } = {};
    currentScores.forEach((score: any) => {
        if (score.tag && score.tag !== 'null') {
            tag2Score[score.tag] = parseInt(score.score, 10);
        }
    });
    if (tag) {
        tag2Score[tag] = parseInt(score + '', 10);
    }

    const scores = Object.keys(tag2Score).map(tag => {
        return {
            tag,
            score: tag2Score[tag]
        };
    });

    try {
        const adIdU8a = hexToU8a(ad);
        const nftIdU8a = $.u32.encode(parseInt(nftId, 10));
        const didU8a = hexToU8a(did);

        const scoresU8a = scores.reduce((pre, current) => {
            return new Uint8Array([...pre, ...stringToU8a(current.tag), ...$.i8.encode(current.score)]);
        }, new Uint8Array());

        let messageU8a = new Uint8Array([...adIdU8a, ...nftIdU8a, ...didU8a, ...scoresU8a]);

        if (referrer) {
            messageU8a = new Uint8Array([...messageU8a, ...hexToU8a(referrer)]);
        }

        const messageU8aHash = keccak256AsU8a(messageU8a);
        const signature = keypair.sign(messageU8aHash);

        const signatureHex = u8aToHex(signature);

        const reqBody: any = {
            ad,
            nft: nftId,
            did,
            scores,
            signer_did: config.get('advertiserDid'),
            signature: signatureHex
        };

        if (referrer) {
            reqBody.referer = referrer;
        }

        await http.post(`${config.get<string>('airdropServer')}/advertisers/scores`, reqBody);
        logger.trace({ userId, scoreType, score, status: 'success' });
    } catch (e: unknown) {
        logger.error(e);
    }
}
