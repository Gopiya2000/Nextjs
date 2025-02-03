import { NextApiRequest, NextApiResponse } from 'next';
import Task from '../../lib/models/Task';
import dbConnect from '../../lib/db/connect';

export default async function taskHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await dbConnect();

        const { userId, taskName, description, dueDate, priority } = req.body;

        if (!userId || !taskName || !description || !dueDate || !priority) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const newTask = new Task({
                userId,
                taskName,
                description,
                dueDate,
                priority,
            });

            // Save the new task to the database
            await newTask.save();

            return res.status(201).json({ task: newTask });
        } catch (error) {
            return res.status(500).json({ message: 'Error creating task' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
