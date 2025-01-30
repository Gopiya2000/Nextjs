import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db/connect';
import Task from '../../lib/models/Task';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Establish database connection before handling requests
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const { taskName, description, dueDate, priority } = req.body;

            if (!taskName || !description || !dueDate || !priority) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const newTask = new Task({ taskName, description, dueDate, priority });
            await newTask.save();

            // Respond with a 201 status and the newly created task
            return res.status(201).json({ message: 'Task created successfully', task: newTask });
        } catch (error) {
            // Handle any errors that occur during task creation
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        // Handle unsupported request methods
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}