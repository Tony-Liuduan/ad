import { logger } from '@app/utils/logger';
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';

export const keypair$ = new Promise(async (resolve, reject) => {
    try {
        const provider = new WsProvider(process.env.endpoint);
        await ApiPromise.create({ provider });
        const keyring = new Keyring({ type: 'sr25519' });
        const keypair = keyring.addFromUri(process.env.advertiserMnemonic!);
        resolve(keypair);
    } catch (error) {
        logger.error(error);
        reject(error);
    }
});
