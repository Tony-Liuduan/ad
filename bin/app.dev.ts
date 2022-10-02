import { args, devArags } from '@app/utils/args';
import { createKoaApp } from '@app/utils/koa-app';
import fs from 'fs';
import http from 'http';
import next from 'next';
import { startedDevelopmentServer } from 'next/dist/build/output';
import type { NextServer, NextServerOptions, RequestHandler } from 'next/dist/server/next';
import { CONFIG_FILES } from 'next/dist/shared/lib/constants';
import path from 'path';

export function startDevServer(opts: NextServerOptions & { allowRetry?: boolean }) {
    let requestHandler: RequestHandler;

    const server = http.createServer(createKoaApp((req, res) => requestHandler(req, res)).callback());

    return new Promise<NextServer>((resolve, reject) => {
        let port = opts.port;
        let retryCount = 0;

        server.on('error', (err: NodeJS.ErrnoException) => {
            if (port && opts.allowRetry && err.code === 'EADDRINUSE' && retryCount < 10) {
                console.log(`Port ${port} is in use, trying ${port + 1} instead.`);
                port += 1;
                retryCount += 1;
                server.listen(port, opts.hostname);
            } else {
                reject(err);
            }
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
            hostname,
            ...devArags
        });

        // 控制台打印
        const appUrl = `http://${app.hostname}:${app.port}`;
        console.log(`started server on ${app.hostname}:${app.port}, url: ${appUrl}`);

        startedDevelopmentServer(appUrl, `${app.hostname}:${app.port}`);

        // next app prepare
        await app.prepare();

        // 开发模式下自动打开浏览器
        // execSync(`open ${appUrl}`);
    } catch (err: unknown) {
        if (err && typeof err === 'object' && (err as { code?: string }).code === 'EADDRINUSE') {
            const errorMessage = `Port ${port} is already in use.`;
            console.error(errorMessage);
        } else {
            console.error(err);
        }
        process.nextTick(() => process.exit(1));
    }

    for (const CONFIG_FILE of CONFIG_FILES) {
        fs.watchFile(path.resolve(dir, CONFIG_FILE), (cur, prev) => {
            if (cur.size > 0 || prev.size > 0) {
                console.log(`\n> Found a change in ${CONFIG_FILE}. Restart the server to see the changes in effect.`);
            }
        });
    }
}

main();
