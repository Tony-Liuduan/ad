/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { tracker } from '@lib/tracker';
import styles from '@styles/index.module.scss';

export function Compound() {
    return (
        <div id="main">
            <header id="header" className="landing">
                <div className="alert vote call-to-action">
                    <span> Compound III, the next-generation protocol, is now live. Read the</span>
                    <a
                        className="alert--inline"
                        rel="external"
                        href="https://twitter.com/compoundfinance/status/1562969434360549378?s=20&amp;t=nHUScYjBHjH1QhsM3ZNR_Q"
                    >
                        announcement
                    </a>
                    <span> or</span>
                    <a rel="external" href="https://v3-app.compound.finance">
                        Try it
                    </a>
                </div>

                <div className="container-large">
                    <div className="row align-middle">
                        <div className="col-sm-3 col-xs-10 logo">
                            <a className="brand" data-trace="/click/download/app"></a>
                        </div>

                        <div className="mobile-hide col-xs-6 text-center links"></div>

                        <div className="mobile-hide col-xs-3 text-right">
                            <a
                                className="dapp button hollow"
                                rel="external"
                                href="https://app.compound.finance/"
                                data-trace="/click/download/app"
                            >
                                App
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mobile-header">
                    <div className="links">
                        <ul>
                            <a href="/">
                                <li>
                                    <p>Home</p>
                                </li>
                            </a>
                            <a href="/markets">
                                <li>
                                    <p>Markets</p>
                                </li>
                            </a>
                            <a href="/governance">
                                <li>
                                    <p>Governance</p>
                                </li>
                            </a>
                            <a href="/prices">
                                <li>
                                    <p>Prices</p>
                                </li>
                            </a>
                        </ul>
                    </div>
                    <a className="dapp button hollow" rel="external" href="https://app.compound.finance/">
                        App
                    </a>
                </div>
            </header>

            <div>
                <section id="landing-overview">
                    <div className="container-large" style={{ width: '100%' }}>
                        <div id="dot-grid"></div>
                        <div className="row">
                            <div className="col-sm-12 text-left compound-data">
                                <div className="header-line">
                                    <h1>
                                        <span className="totals totals--debt">
                                            <span>
                                                <div className="digit">
                                                    <div className="digit-holder active">$</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">
                                                        8 7 6 5 4 3 2 1 0
                                                    </div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">
                                                        6 5 4 3 2 1 0
                                                    </div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">
                                                        8 7 6 5 4 3 2 1 0
                                                    </div>
                                                </div>
                                                <div className="digit comma">
                                                    <div className="digit-holder active">,</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-ten active">5 4 3 2 1 0</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-hundred active">1 0</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">
                                                        7 6 5 4 3 2 1 0
                                                    </div>
                                                </div>
                                                <div className="digit comma">
                                                    <div className="digit-holder active">,</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-hundred active">1 0</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">
                                                        7 6 5 4 3 2 1 0
                                                    </div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">2 1 0</div>
                                                </div>
                                            </span>
                                        </span>
                                    </h1>
                                    <h1 style={{ marginLeft: '0.5rem' }}>of borrowing backed by</h1>
                                </div>
                                <div className="header-line">
                                    <h1>
                                        <span className="totals">
                                            <span>
                                                <div className="digit">
                                                    <div className="digit-holder active">$</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">3 2 1 0</div>
                                                </div>
                                                <div className="digit comma">
                                                    <div className="digit-holder active">,</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">0</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">0</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">
                                                        7 6 5 4 3 2 1 0
                                                    </div>
                                                </div>
                                                <div className="digit comma">
                                                    <div className="digit-holder active">,</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-ten active">4 3 2 1 0</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">2 1 0</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">
                                                        7 6 5 4 3 2 1 0
                                                    </div>
                                                </div>
                                                <div className="digit comma">
                                                    <div className="digit-holder active">,</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">
                                                        8 7 6 5 4 3 2 1 0
                                                    </div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">0</div>
                                                </div>
                                                <div className="digit">
                                                    <div className="digit-holder digit-thousand active">
                                                        7 6 5 4 3 2 1 0
                                                    </div>
                                                </div>
                                            </span>
                                        </span>
                                    </h1>
                                    <h1 style={{ marginLeft: '0.5rem' }}>
                                        of collateral across
                                        <span className="totals" style={{ margin: '0px 0.5rem' }}>
                                            2
                                        </span>
                                        networks
                                    </h1>
                                </div>
                                <div className="market-panels">
                                    <div className="market-panel">
                                        <div className="market-panel__info">
                                            <div className="market-panel__market">
                                                <div className="icon icon--ETH"></div>
                                                <div className="market-panel__market__icon">17</div>
                                                <p>Ethereum | V2</p>
                                            </div>
                                            <div className="market-panel__bar-holder market-panel__bar-holder--collateral">
                                                <div className="bar">
                                                    <div className="bar__fill" style={{ width: '100%' }}></div>
                                                </div>
                                                <p className="market-panel__bar-holder__text">$2,956.75M</p>
                                            </div>
                                            <div className="market-panel__bar-holder market-panel__bar-holder--debt">
                                                <div className="bar">
                                                    <div className="bar__fill" style={{ width: '100%' }}></div>
                                                </div>
                                                <p className="market-panel__bar-holder__text">$841.66M</p>
                                            </div>
                                        </div>
                                        <div className="market-panel__buttons">
                                            <a
                                                className="market-panel__button"
                                                rel="external"
                                                href="https://app.compound.finance"
                                            >
                                                App
                                            </a>
                                            <div className="market-panel__buttons__divider"></div>
                                            <a className="market-panel__button" href="/markets">
                                                Market
                                            </a>
                                        </div>
                                    </div>
                                    <div className="market-panel">
                                        <div className="market-panel__info">
                                            <div className="market-panel__market">
                                                <div className="icon icon--ETH"></div>
                                                <div className="icon icon--USDC"></div>
                                                <p>Ethereum | USDC</p>
                                            </div>
                                            <div className="market-panel__bar-holder market-panel__bar-holder--collateral">
                                                <div className="bar">
                                                    <div className="bar__fill" style={{ width: '0%' }}></div>
                                                </div>
                                                <p className="market-panel__bar-holder__text">$50.67M</p>
                                            </div>
                                            <div className="market-panel__bar-holder market-panel__bar-holder--debt">
                                                <div className="bar">
                                                    <div className="bar__fill" style={{ width: '0%' }}></div>
                                                </div>
                                                <p className="market-panel__bar-holder__text">$26.84M</p>
                                            </div>
                                        </div>
                                        <div className="market-panel__buttons">
                                            <a
                                                className="market-panel__button"
                                                rel="external"
                                                href="https://v3-app.compound.finance"
                                            >
                                                App
                                            </a>
                                            <div className="market-panel__buttons__divider"></div>
                                            <a
                                                className="market-panel__button"
                                                rel="external"
                                                href="https://v3-app.compound.finance/markets"
                                            >
                                                Market
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="try-compound">
                    <div className="container-large try-compound">
                        <div className="row">
                            <div className="col-sm-5 text-left try-compound__header">
                                <label className="label big">Try Compound</label>
                                <h2 className="summary">Community-built interfaces integrating the protocol</h2>
                            </div>
                        </div>
                        <div className="projects">
                            <div className="tab-group projects__tab-group">
                                <div className="tab-group__options">
                                    <label className="tab-group__option tab-group__option--active tab-group__option--active--green">
                                        Institutions
                                    </label>
                                </div>
                                <div className="tab-group__line"></div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 projects__carousel">
                                    <div className="carousel slide">
                                        <div className="carousel-inner" role="listbox">
                                            <div className="active carousel-item">
                                                <div className="projects__carousel__slide projects__carousel__slide--active">
                                                    <div className="row">
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://compoundtreasury.com"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--compound-treasury"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Compound Treasury</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Earn 4.00% APR on USD balances without any of
                                                                        the complexities of crypto.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://custody.coinbase.com"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--coinbase-custody"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Coinbase Custody</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Secure custody for COMP &amp; cTokens, and
                                                                        native support for Compound governance.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://anchorage.com"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--anchorage"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Anchorage</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Safe crypto custody complete with trading,
                                                                        staking, and Compound governance.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://www.fireblocks.com"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--fireblocks"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Fireblocks</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Safely move assets between exchanges, wallets
                                                                        &amp; Compound.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://www.bitgo.com/"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--bitgo"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Bitgo</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Full-service crypto custodian, with support for
                                                                        both cTokens and COMP.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://www.ledger.com/lend"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--ledger"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Ledger</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Access Compound directly from the security of
                                                                        your Ledger hardware wallet.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="projects__carousel__slide">
                                                    <div className="row">
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://www.argent.xyz/"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--argent"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Argent</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Easily earn interest &amp; invest; securely
                                                                        store &amp; send. No seed phrase. No gas.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://www.okex.com/earn"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--okex"></span>
                                                                <div className="project-card-header">
                                                                    <h4>OKEx</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Earn interest and borrow assets on one of the
                                                                        most popular crypto exchanges.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://www.pooltogether.us"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--pool-together"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Pool Together</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        A no-loss lottery utilizing the interest earned
                                                                        in Compound as the prize.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://www.binance.com/en/defi-staking"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--binance"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Binance</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Leading crypto exchange, with DeFi staking
                                                                        powered by Compound.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://crypto.com/us/defi-wallet"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--crypto-dot-com"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Crypto.com</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Interact with Compound through a native
                                                                        integration in the Crypto.com DeFi wallet.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://token.im/"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--imToken"></span>
                                                                <div className="project-card-header">
                                                                    <h4>imToken</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Fully-featured crypto wallet mobile app,
                                                                        integrating Compound.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://zapper.fi/save"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--zapper"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Zapper</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        A seamless interface to Compound alongside other
                                                                        DeFi applications.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://www.exodus.io"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--exodus"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Exodus</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Secure, Manage, and Exchange on desktop, mobile
                                                                        and hardware wallets.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://app.barnbridge.com/smart-yield/markets"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--barnbridge"></span>
                                                                <div className="project-card-header">
                                                                    <h4>BarnBridge</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Earn a protected, fixed return, or a volatile
                                                                        high yield with risk tranching.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="projects__carousel__slide">
                                                    <div className="row">
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://app.compound.finance/"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--compound"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Compound Dashboard</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        The original open-source, full-featured
                                                                        dashboard to access the protocol.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://defi.instadapp.io/compound"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--instadapp"></span>
                                                                <div className="project-card-header">
                                                                    <h4>InstaDapp</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Supply, borrow, and migrate MakerDAO CDPs into
                                                                        Compound.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://comp.vote/"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--comp-vote"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Comp.Vote</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Gas-free delegation and voting for COMP
                                                                        token-holders.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://defisaver.com/compound/manage"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--defi-saver"></span>
                                                                <div className="project-card-header">
                                                                    <h4>DeFi Saver</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        An alternative Compound dashboard with automated
                                                                        portfolio management.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://zerion.io/en"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--zerion"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Zerion</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Save, borrow, and monitor Compound &amp;
                                                                        Ethereum positions.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://app.ankr.com/apps/info?name=compound&amp;repository=stable&amp;type=chart&amp;version=1.0.2"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--ankr"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Ankr</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>Easily integrate Compound with a RESTful API.</p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://enzyme.finance/"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--enzyme"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Enzyme</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        A fast &amp; cost-effective way to build, scale
                                                                        and monetize investment strategies.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://www.bprotocol.org/?from=compound"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--bprotocl"></span>
                                                                <div className="project-card-header">
                                                                    <h4>B.Protocol</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Import your Compound position for improved
                                                                        liquidation economics.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://eidoo.io/"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--eidoo"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Eidoo</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Buy, sell, trade and earn in-app, or pay with
                                                                        Eidoo Card worldwide.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="projects__carousel__slide">
                                                    <div className="row">
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://www.lumina.app/"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--lumina"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Lumina</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Institutional-grade portfolio management and tax
                                                                        accounting, including Compound.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://tokentax.co"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--tokentax"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Tokentax</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Tax software and cryptocurrency accounting firm,
                                                                        to help with your Compound activity.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="col-sm-4 col-xs-12"
                                                            target="_blank"
                                                            rel="external noreferrer"
                                                            href="https://www.cointracker.io"
                                                        >
                                                            <div className="legacy-panel">
                                                                <span className="icon icon--cointracker"></span>
                                                                <div className="project-card-header">
                                                                    <h4>Cointracker</h4>
                                                                </div>
                                                                <div className="project-card-description">
                                                                    <p>
                                                                        Portfolio tracker and tax calculator tool,
                                                                        import your Compound activity.
                                                                    </p>
                                                                </div>
                                                                <div className="project-card-try">
                                                                    <p className="small">Try</p>
                                                                    <span id="arrow" className="arrow"></span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <img
                                                src="https://package.elm-lang.org/assets/favicon.ico"
                                                style={{ display: 'none' }}
                                                alt="favicon.ico"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 text-left compound-data">
                                <div>
                                    <video
                                        className={styles.video}
                                        crossOrigin="anonymous"
                                        preload="auto"
                                        autoPlay
                                        // eslint-disable-next-line react/no-unknown-property
                                        controls
                                        onPlay={e =>
                                            tracker('/click/video/play', { duration: (e.target as any).duration })
                                        }
                                        onPause={e =>
                                            tracker('/click/video/pause', { duration: (e.target as any).duration })
                                        }
                                    >
                                        <source src="/trailer.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </div>
                        <div id="dot-grid-left"></div>
                        <div id="dot-grid-right"></div>
                    </div>
                </section>
                <section id="security-home">
                    <div className="container-large">
                        <div className="row">
                            <div className="col-sm-12 text-left">
                                <label className="label big">Audited and Verified</label>
                                <h2 className="summary">The most secure protocol for money</h2>
                                <div className="call-to-action">
                                    <a target="_blank" href="/docs/security">
                                        Protocol Security
                                    </a>
                                    <span id="arrow" className="arrow"></span>
                                </div>
                            </div>
                        </div>
                        <div className="audits">
                            <div className="row">
                                <a className="col-sm-4 col-xs-12" target="_blank" href="/docs/security#audits">
                                    <div className="security-panel">
                                        <div className="security-panel__background">
                                            <div className="security-panel__content security-panel__content--">
                                                <div className="security-panel__image security-panel__image--oz"></div>
                                                Security Audit
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="col-sm-4 col-xs-12" target="_blank" href="/docs/security#audits">
                                    <div className="security-panel">
                                        <div className="security-panel__background">
                                            <div className="security-panel__content security-panel__content--">
                                                <div className="security-panel__image security-panel__image--tob"></div>
                                                Security Audit
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="col-sm-4 col-xs-12"
                                    target="_blank"
                                    href="/docs/security#formal-verification"
                                >
                                    <div className="security-panel">
                                        <div className="security-panel__background">
                                            <div className="security-panel__content security-panel__content--">
                                                <div className="security-panel__image security-panel__image--certora"></div>
                                                Formal Verification
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="row">
                                <a
                                    className="col-sm-4 col-xs-12"
                                    target="_blank"
                                    href="/docs/security#economic-security"
                                >
                                    <div className="security-panel">
                                        <div className="security-panel__background">
                                            <div className="security-panel__content security-panel__content--">
                                                <div className="security-panel__image security-panel__image--gauntlet"></div>
                                                Market Risk Assessment
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="col-sm-8 col-xs-12" target="_blank" href="/docs/security#bug-bounty">
                                    <div className="security-panel">
                                        <div className="security-panel__background">
                                            <div className="security-panel__content security-panel__content--bug-bounty">
                                                <div className="audits__bug-bounty">
                                                    <div className="audits__bug-bounty__image-section">
                                                        <div className="security-panel__image security-panel__image--bug-bounty"></div>
                                                    </div>
                                                    <div className="audits__bug-bounty__text-section">
                                                        <div className="audits__bug-bounty__text-section__bounty">
                                                            <p>$</p>
                                                            <h2 className="audits__bug-bounty__text-section__bounty__value">
                                                                150,000
                                                            </h2>
                                                            <p>00</p>
                                                        </div>
                                                        Bug Bounty
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <footer id="footer" className="landing">
                <div className="container-large">
                    <div className="row top">
                        <div className="col-sm-2 logo mobile-hide">
                            <a href="/" className="mark"></a>
                        </div>
                        <div className="col-xs-12 logo mobile-only">
                            <a href="/" className="brand"></a>
                        </div>
                        <div className="col-sm-8 col-xs-12 row links-holder">
                            <div className="col-sm-4 col-xs-6 links">
                                <p>Compound II</p>
                                <a rel="external" href="https://app.compound.finance">
                                    App
                                </a>
                                <a href="/markets">Markets</a>
                                <a rel="external" href="https://docs.compound.finance/v2">
                                    Documentation
                                </a>
                                <a rel="external" href="https://docs.compound.finance/v2/security">
                                    Security
                                </a>
                            </div>
                            <div className="col-sm-4 col-xs-6 links">
                                <p>Compound III</p>
                                <a rel="external" href="https://v3-app.compound.finance">
                                    App
                                </a>
                                <a rel="external" href="https://v3-app.compound.finance/markets">
                                    Markets
                                </a>
                                <a rel="external" href="https://docs.compound.finance">
                                    Documentation
                                </a>
                                <a rel="external" href="https://docs.compound.finance/#security">
                                    Security
                                </a>
                            </div>
                            <div className="col-sm-4 col-xs-6 links">
                                <p>Governance</p>
                                <a href="/governance">Dashboard</a>
                                <a href="/governance/proposals">Proposals</a>
                                <a rel="external" href="https://www.comp.xyz/">
                                    Forums
                                </a>
                                <a href="/governance/leaderboard">Leaderboard</a>
                            </div>
                        </div>
                        <div className="mobile-hide col-xs-2 text-right">
                            <a
                                className="dapp button"
                                rel="external"
                                href="https://app.compound.finance/"
                                data-trace="/click/download/app"
                            >
                                App
                            </a>
                        </div>
                    </div>
                    <div className="bottom">
                        <label className="small">© 2022 Compound Labs, Inc.</label>
                        <div className="social">
                            <a
                                className="icn discord"
                                target="_blank"
                                rel="external noreferrer"
                                href="https://compound.finance/discord"
                            ></a>
                            <a
                                className="icn github"
                                target="_blank"
                                rel="external noreferrer"
                                href="https://github.com/compound-finance/compound-protocol"
                            ></a>
                            <a
                                className="icn medium"
                                target="_blank"
                                rel="external noreferrer"
                                href="https://medium.com/compound-finance"
                            ></a>
                            <a
                                className="icn twitter"
                                target="_blank"
                                rel="external noreferrer"
                                href="https://twitter.com/compoundfinance"
                            ></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
