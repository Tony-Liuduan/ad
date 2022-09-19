import '@lib/tracker';
import { tracker } from '@lib/tracker';
import styles from '@styles/index.module.scss';
import classNames from 'classnames';

export default function IndexPage() {
    return (
        <>
            <div className={styles['video-wrap']}>
                <video
                    className={styles.video}
                    crossOrigin="anonymous"
                    preload="auto"
                    autoPlay
                    // eslint-disable-next-line react/no-unknown-property
                    controls
                    onPlay={e => tracker('/click/video/play', { duration: (e.target as any).duration })}
                    onPause={e => tracker('/click/video/pause', { duration: (e.target as any).duration })}
                >
                    <source src="/trailer.mp4" type="video/mp4" />
                </video>
            </div>
            <div className={classNames(styles.footer, 'safe-bottom')}>
                <a className="primary" data-trace="/click/download/app">
                    下载 APP
                </a>
            </div>
        </>
    );
}
