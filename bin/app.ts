import { onClientError } from '@app/middlewares/error';
import { args } from '@app/utils/args';
import { createKoaApp } from '@app/utils/koa-app';
import { logger } from '@app/utils/logger';
import http from 'http';
import next from 'next';
import type { NextServer, NextServerOptions, RequestHandler } from 'next/dist/server/next';

export function startDevServer(opts: NextServerOptions & { allowRetry?: boolean }) {
    let requestHandler: RequestHandler;

    const server = http.createServer(createKoaApp((req, res) => requestHandler(req, res)).callback());

    return new Promise<NextServer>((resolve, reject) => {
        const port = opts.port;
        server.on('clientError', onClientError);
        server.on('error', (err: NodeJS.ErrnoException) => {
            reject(err);
        });
        server.on('listening', () => {
            const addr = server.address();
            const hostname = !opts.hostname || opts.hostname === '0.0.0.0' ? 'localhost' : opts.hostname;

            const app = next({
                ...opts,
                hostname,
                customServer: false,
                httpServer: server,
                port: addr && typeof addr === 'object' ? addr.port : port
            });

            requestHandler = app.getRequestHandler();
            resolve(app);
        });

        server.listen(port, opts.hostname);
    });
}

export async function main() {
    const { dir, port, hostname } = args;
    try {
        const app = await startDevServer({
            dir,
            port,
            hostname
        });
        // next app prepare
        await app.prepare();
    } catch (err: unknown) {
        logger.fatal(err);
        process.exit(1);
    }
}

main();
