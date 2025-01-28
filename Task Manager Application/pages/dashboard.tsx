import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/dashboard.module.css'

const DashboardPage = () => {
    const router = useRouter();

    const addNewTask = () => {
        router.push('/task/new');
    };

    return (
        <div>
            <h2 className={styles.title}>Task Manager Dashboard</h2>
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
