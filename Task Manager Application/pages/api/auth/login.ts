import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nookies from 'nookies';
import dbConnect from '../../../lib/db/connect';
import User from '../../../lib/models/User';

export default async function loginHandler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    // Check if the request method is POST
    if (req.method === 'POST') {
        // Destructure email and password from the request body
        const { email, password } = req.body;
        
        try {
            await dbConnect(); // Ensure the database is connected

            // Find the user by email in the database
            const user = await User.findOne({ email });
            if (!user) {
                // If user not found, respond with an error message
                return res.status(400).json({ message: 'Invalid email' });
            }

            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                // If passwords do not match, respond with an error message
                return res.status(400).json({ message: 'Invalid password' });
            }

            // Create a JWT token with user ID and email, and set expiration
            const token = jwt.sign(
                { 
                    userId: user._id,
                    email: user.email
                },
                process.env.SECRET_KEY,
                { expiresIn: '2h' } // Set the token to expire in 2 hours
            );

            // Set the generated token as a cookie using nookies
            nookies.set({ res }, 'token', token, {
                httpOnly: true, // Cookie is accessible only through HTTP(S) requests
                secure: true,   // Cookie is only sent over HTTPS
                maxAge: 2 * 60 * 60, // Set expiration to 2 hours (in seconds)
                path: '/', // Cookie accessible across the entire site
            });

            // Respond with a success message
            return res.status(200).json({
                message: 'Login successful',
                userId: user._id.toString(),
            });
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong, please try again.' });
        }
    } else {
        // If the request method is not POST, respond with a method not allowed error
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}