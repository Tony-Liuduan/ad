import Head from 'next/head';
import React from 'react';
import type { AppHeadProps } from './head.type';

export const AppHead: React.FC<AppHeadProps> = ({ children }) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
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
            <meta property="og:title" content="Compound" />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <title>Compound</title>
            <meta
                name="description"
                content="Compound is an algorithmic, autonomous interest rate protocol built for developers, to unlock a universe of open financial applications."
            />
            {children}
        </Head>
    );
};
