import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SignupRedirectToHome() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/home');
    }, [router]);

    return null;
}
