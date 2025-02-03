import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AppDispatch } from '../store/store';
import styles from '../styles/dashboard.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';

const DashboardPage = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // Handle logout
    const handleLogout = async () => {
        await dispatch(logoutUser());
        router.push('/');
    };

    const addNewTask = () => {
        router.push('/task/new');
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <Image
                        src="/images/task-manager-logo.png"
                        alt="Task Manager Logo"
                        width={40}
                        height={40}
                        className={styles.logo}
                    />
                    <h2 className={styles.title}>Task Manager</h2>
                </div>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <button
                onClick={addNewTask}
                className={styles.addTaskButton}
            >
                Add New Task
            </button>
        </div>
    );
};

export default DashboardPage;
