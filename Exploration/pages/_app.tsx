import { AppProps } from 'next/app';
import styles from '../styles/app.module.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <title>Next.js</title>
            <header className={styles.header}>
                <p>Header - Exploration</p>
            </header>

            <main>
                <Component {...pageProps} />
            </main>

            <footer className={styles.footer}>
                <p>The website footer is the section of content at the very bottom of a web page. It typically contains a copyright notice, link to a privacy policy, sitemap, logo, contact information, social media icons, and an email sign-up form.</p>
            </footer>
        </div>
    );
}

export default MyApp;
