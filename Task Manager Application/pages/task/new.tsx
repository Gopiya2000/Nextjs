import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from '../../styles/newTask.module.css';

const NewTaskPage = () => {
    const router = useRouter();
    
    const [taskName, setTaskName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [priority, setPriority] = useState<string>('Low');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/task', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    taskName,
                    description,
                    dueDate,
                    priority,
                }),
            });

            if (!response.ok) {
                alert('Failed to add task. Please try again.');
                return;
            }
            
            alert('Task added successfully!');
            router.push('/dashboard');
        } catch (error) {
            alert('Something went wrong, please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Create New Task</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="taskName" className={styles.label}>Task Name:</label>
                    <input
                        type="text"
                        id="taskName"
                        className={styles.input}
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>Description:</label>
                    <textarea
                        id="description"
                        className={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="dueDate" className={styles.label}>Due Date:</label>
                    <DatePicker
                        selected={dueDate}
                        onChange={(date: Date) => setDueDate(date)}
                        dateFormat="yyyy-MM-dd" // Format for displaying the date
                        className={styles.input}
                        placeholderText="Select due date"
                        minDate={new Date()} // Prevent selection of past dates
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="priority" className={styles.label}>Priority:</label>
                    <select
                        id="priority"
                        className={styles.select}
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <button type="submit" className={styles.submitButton}>Add Task</button>
            </form>
        </div>
    );
};

export default NewTaskPage;