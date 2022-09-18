import type Koa from 'koa';

export async function middlewareCors(ctx: Koa.ParameterizedContext, next: Koa.Next) {
    const origin = ctx.get('Origin');

    // 使用 Vary: Origin 让同一个 URL 有多份缓存，https://zhuanlan.zhihu.com/p/38972475
    // 区分对待有无 Origin 请求头”的同时不加Vary:Origin头会引起缓存错乱问题
    ctx.set('Vary', 'Origin');

    // 区分对待有无 Origin请求头
    // 有Origin请求头才会返回Access-Control-Allow-Origin响应头，没有就不返回
    if (origin) {
        ctx.set('Access-Control-Allow-Origin', origin); // 允许跨域
        ctx.set('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,HEAD,PUT,DELETE'); // 支持的方法
        ctx.set('Access-Control-Allow-Credentials', 'true'); // 允许传入Cookie

        // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Max-Age
        // 过期时间一个月，单位 s，表示 preflight request  （预检请求）的返回结果（即 Access-Control-Allow-Methods 和Access-Control-Allow-Headers 提供的信息） 可以被缓存多久
        ctx.set('Access-Control-Max-Age', '86400');

        // 如果有特殊的请求头，直接响应
        if (ctx.get('Access-Control-Request-Headers')) {
            ctx.set('Access-Control-Allow-Headers', ctx.get('Access-Control-Request-Headers'));
        }

        // 如果是 OPTIONS 请求，则直接返回
        if (ctx.method === 'OPTIONS') {
            ctx.status = 204;
            return;
        }
    }

    await next();
}
