import bcrypt from 'bcrypt';
import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db/connect';
import User from '../../../lib/models/User';

// Define the validation schema using Zod
const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z
        .string()
        .regex(
            /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
            { message: 'Email must be a valid Gmail address (e.g., user@gmail.com).' }
        )
        .trim(),
    password: z
        .string()
        .regex(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
            { message: 'Password must be at least 8 characters, including a letter, number, and special character.' }
        )
        .trim(),
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();

    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        try {
            // Validate the incoming request data using Zod schema
            const parsedData = SignupFormSchema.parse({
                name,
                email,
                password,
            });

            // Check if the email is already registered
            const existingUser = await User.findOne({ email: parsedData.email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(parsedData.password, 10);

            // Create the new user
            const user = new User({
                name: parsedData.name,
                email: parsedData.email,
                password: hashedPassword,
            });

            await user.save();

            return res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Format validation errors for better readability
                const formattedErrors = error.errors.reduce((acc: Record<string, string[]>, { path, message }) => {
                    const field = path[0] as string; // Assuming `path` is an array with the field name at index 0
                    acc[field] = acc[field] ? [...acc[field], message] : [message];
                    return acc;
                }, {});
        
                return res.status(400).json({
                    status: 'error',
                    message: 'Validation failed',
                    errors: formattedErrors,
                });
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
