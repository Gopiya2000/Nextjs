import { useState } from 'react';
import styles from '../styles/auth.module.css';
import { useRouter } from 'next/router';

export default function AuthForm() {
    const router = useRouter();

    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        name: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = isSignup ? '/api/auth/signup' : '/api/auth/login';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    // Set specific field errors
                    setErrors(data.errors);
                } else {
                    // Handle any other type of error (like a generic message)
                    alert(data.message || 'An error occurred');
                }
                return;
            }

            if (isSignup) {
                alert('User registered successfully!');
                setIsSignup(false);
            } else {
                alert('Login successful!');
                router.push('/dashboard');
            }
        } catch (error) {
            alert('Something went wrong, please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        // Reset the error message for the field when user starts typing
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    return (
        <div className={styles.authForm}>
            <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                {isSignup && (
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
                    </div>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                {errors.password && <p className={styles.error}>{errors.password}</p>}

                <button  className={styles.submitButton} type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
            </form>
            <p className={styles.toggleContainer}>
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <button className={styles.toggleButton} type="button" onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? 'Login' : 'Sign Up'}
                </button>
            </p>
        </div>
    );
}
