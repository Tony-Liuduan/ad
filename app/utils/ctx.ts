import type Koa from 'koa';

export function getClientIp(ctx: Koa.ParameterizedContext): string {
    return ctx.ip || ctx.req.connection.remoteAddress || '';
}

export function getUA(ctx: Koa.ParameterizedContext): string {
    return ctx.header['user-agent'] || '';
}

export const getRoutePrefix = (ctx: Koa.ParameterizedContext): string => {
    return ctx.path.split('/')[1];
};
