import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import AuthForm from '../components/AuthForm';
import styles from '../styles/login.module.css';

export default function LoginPage() {
    return (
        <div>
            <p className={styles.title}>Task Manager</p>
            <AuthForm />
        </div>
    );
}

/**
 * Server-side function to check for authentication token.
 * If a token is found, the user is redirected to the dashboard.
 * If no token is found, the login page is displayed.
 * 
 * @param {GetServerSidePropsContext} context - The Next.js context object containing request information.
 * @returns {Promise<{ redirect?: { destination: string; permanent: boolean }; props: {} }>} - The redirection or props for the page.
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // Retrieve cookies from the context using nookies.
    const cookies = nookies.get(context);
    const token = cookies.token;

    // If token is found, redirect the user to the dashboard.
    if (token) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false, // Indicates this is not a permanent redirect (HTTP 302)
            },
        };
    }

    // If no token is found, allow the login page to be shown.
    return { props: {} };
};