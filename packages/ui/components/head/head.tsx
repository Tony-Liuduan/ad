import Head from 'next/head';
import React from 'react';
import type { AppHeadProps } from './head.type';

const DEFAULT_TITLE = 'AD';
const DEFAULT_ICON = '/';

export const AppHead: React.FC<AppHeadProps> = ({ title, icon, children }) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
            />
            {/* 忽略页面中的数字识别为电话，忽略email识别 */}
            <meta name="format-detection" content="telphone=no, email=no" />
            {/* 启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏 */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            {/* 添加到主屏幕后，全屏显示 */}
            <meta name="apple-touch-fullscreen" content="yes" />
            {/* 启用360浏览器的极速模式(webkit)  */}
            <meta name="renderer" content="webkit" />
            {/* 优先使用 IE 最新版本和 Chrome */}
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <title>{title || DEFAULT_TITLE}</title>
            <link rel="icon" type="image/x-icon" href={icon || DEFAULT_ICON} />
            {children}
        </Head>
    );
};
