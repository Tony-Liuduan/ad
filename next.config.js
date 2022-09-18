/** @type {import('next').NextConfig} */
const { version } = require('./package.json');

const nextConfig = {
    reactStrictMode: false, //【BUG】React 18 升级后useEffect执行了两次： https://juejin.cn/post/7096401845693710367
    swcMinify: true,
    distDir: 'dist',
    env: {
        APP_ENV: process.env.NODE_ENV // FIX: 测试环境中 NODE_ENV 为 production：https://github.com/vercel/next.js/issues/17032
    }
};

module.exports = nextConfig;
