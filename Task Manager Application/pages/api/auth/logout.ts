import { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

export default function logoutHandler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    nookies.destroy({ res }, 'token', {
        path: '/',
    });

    res.status(200).json({ message: 'Logout successful' });
}
