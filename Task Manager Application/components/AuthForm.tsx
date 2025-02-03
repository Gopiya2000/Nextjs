import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../store/authSlice';
import { AppDispatch, RootState } from '../store/store';
import styles from '../styles/auth.module.css';

export default function AuthForm() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

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

    const { loading } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const action = isSignup ? signupUser : loginUser;

        try {
            const resultAction = await dispatch(action(formData));

            // Check if the action was rejected
            if (resultAction.type.endsWith('rejected')) {
                const errorResponse = resultAction.payload;

                if (typeof errorResponse === 'string') {
                    // If the server returns a simple error message
                    alert(errorResponse);
                } else if (errorResponse && typeof errorResponse === 'object') {
                    if (errorResponse) {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            ...Object.keys(errorResponse).reduce((acc, field) => {
                                acc[field] = errorResponse[field].join(' ');
                                return acc;
                            }, {} as Record<string, string>),
                        }));
                    }

                    alert('Validation failed. Please check your inputs.');
                } else {
                    alert('Something went wrong. Please try again.');
                }
            } else {
                if (isSignup) {
                    alert('User registered successfully!');
                    setIsSignup(false);
                } else {
                    alert('Login successful!');
                    router.push('/dashboard');
                }
            }
        } catch (error) {
            alert("An unexpected error occurred. Please try again.");
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

                <button className={styles.submitButton} type="submit" disabled={loading}>
                    {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
                </button>
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