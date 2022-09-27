import yargs from 'yargs';
import { ROOT } from './paths';

const { dir, port, hostname } = yargs(process.argv.slice(2))
    .options({
        dir: { type: 'string', default: ROOT },
        hostname: { type: 'string' },
        port: { type: 'number', default: Number(process.env.PORT) || 8080 }
    })
    .parseSync();

/* server 启动基本参数 */
export const args = {
    dir,
    port,
    hostname
};

/* dev server 启动参数 */
export const devArags = {
    allowRetry: true,
    dev: true,
    isNextDevCommand: true
};
