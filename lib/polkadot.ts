import { logger } from '@app/utils/logger';
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import config from 'config';

export const keypair$ = new Promise(async (resolve, reject) => {
    try {
        const provider = new WsProvider(config.get('endpoint'));
        await ApiPromise.create({ provider });
        const keyring = new Keyring({ type: 'sr25519' });
        const keypair = keyring.addFromUri(config.get('advertiserMnemonic'));
        resolve(keypair);
    } catch (error) {
        logger.error(error);
        reject(error);
    }
});
