import Link from 'next/link';
import { useRouter } from 'next/router';

export default function HomeRedirect() {

    const router = useRouter();

    return (
        <div>
            {/* Link tag for redirection */}
            <div>
                <Link href = '/login'>Login</Link>
            </div>
            {/* useRouter hook */}
            <div>
                <Link href = '/signup'>Signup</Link>
            </div>
            {/* Nested route */}
            <div>
                <Link href= 'settings/profile'>Profile page</Link>
            </div>
            {/* Dynamic routing */}
            <div>
                <button onClick={() => router.push('/dashboard')}>Dashboard</button>
            </div>
            {/* getServerSideProps */}
            <div>
                <button onClick={() => router.push('/user')}>User List</button>
            </div>
            {/* Code splitting */}
            <div>
                <button onClick={() => router.push('/environment/document')}>Play video</button>
            </div>
            {/* Image */}
            <div>
            <Link href= 'logo'>View Logo</Link>
            </div>
        </div>
    );
}
