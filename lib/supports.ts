import { isClient } from './is';

// https://zhuanlan.zhihu.com/p/24555031
// 移动Web滚动性能优化: Passive event listeners
export let supportsPassive = false;
if (isClient) {
    try {
        const opts = {};
        Object.defineProperty(opts, 'passive', {
            get() {
                supportsPassive = true;
            }
        });
        window.addEventListener('test-passive', null as any, opts);
    } catch (e) {}
}
