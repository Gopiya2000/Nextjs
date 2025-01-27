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
