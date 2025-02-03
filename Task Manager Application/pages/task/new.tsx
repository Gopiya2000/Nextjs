import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addTask } from '../../store/taskSlice';
import styles from '../../styles/newTask.module.css';

const NewTaskPage = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.tasks);
    const userId = useSelector((state: RootState) => state.auth.user?.userId);

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [priority, setPriority] = useState('Low');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskName || !description || !dueDate || !priority) {
            alert('All fields are required.');
            return;
        }

        try {            
            await dispatch(
                addTask({
                    userId,
                    taskName,
                    description,
                    dueDate: new Date(dueDate).toISOString(), // Convert to string
                    priority,
                })
            );
            alert('Task added successfully!');
            router.push('/dashboard');
        } catch (err) {
            alert(err || 'Something went wrong. Please try again.');
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
                        dateFormat="yyyy-MM-dd"
                        className={styles.input}
                        placeholderText="Select due date"
                        minDate={new Date()}
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

                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Task'}
                </button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default NewTaskPage;
