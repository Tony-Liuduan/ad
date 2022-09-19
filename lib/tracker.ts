import qs from 'qs';
import { isClient, isFunction } from './is';

function sendByBeacon(url: string, data: any): Promise<void> {
    if (isFunction(navigator?.sendBeacon)) {
        return new Promise<void>((resolve, reject) => {
            try {
                const res = navigator.sendBeacon(url, JSON.stringify(data));
                if (res) {
                    resolve();
                } else {
                    reject(new Error(`sendBeacon ${url} failed`));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    return Promise.reject(new Error('not supported sendBeacon'));
}

function sendByXMLHttpRequest(url: string, data: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open('POST', url, true);
        if (xhr.setRequestHeader) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.timeout = 5000;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                xhr.status && xhr.status > 199 && xhr.status < 300
                    ? resolve()
                    : reject(new Error(`statusError ${xhr.status}`));
            }
        };
        xhr.onload = () => {
            resolve();
        };
        xhr.ontimeout = e => {
            reject(e);
        };
        xhr.onabort = e => {
            reject(e);
        };
        xhr.onerror = e => {
            reject(e);
        };
        try {
            xhr.send(JSON.stringify(data));
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * 发送埋点请求
 *
 * 优先使用 sendBeacon 发送，不支持或者失败使用 xml 发送
 */
export function tracker(eventValue: string, extra?: Record<string, any>): Promise<void> {
    if (!isClient) {
        return Promise.resolve();
    }
    const url = '/api/trace';
    console.log(extra);
    const data = {
        pathname: location.pathname,
        event: eventValue,
        timestamp: new Date().getTime(),
        searchParams: qs.parse(location.search.slice(1)),
        extra
    };
    return sendByBeacon(url, data).catch(() => sendByXMLHttpRequest(url, data));
}

(() => {
    if (!isClient) {
        return;
    }
    /**
     * 初始化监听页面点击事件，识别 html 标签 data-tracker 属性，发送 click 打点
     * 示例：<button data-trace="EventValue">xxx</button>
     */
    window.addEventListener(
        'click',
        e => {
            let node = e.target as ParentNode | null;
            while (node) {
                if (node.nodeName === 'BODY') {
                    return;
                }
                const eventValue = (node as { dataset?: { trace?: string } })?.dataset?.trace;
                if (eventValue) {
                    tracker(eventValue);
                    return;
                }
                node = node.parentNode;
            }
        },
        false
    );

    /**
     * 页面的进入和离开事件
     */
    tracker('pageView');
    window.addEventListener('beforeunload', () => {
        tracker('pageClose');
    });
})();
