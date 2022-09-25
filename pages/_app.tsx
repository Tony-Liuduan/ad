import '@styles/globals.scss';
import { AppHead } from '@ui/components/head/head';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <AppHead></AppHead>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
