import Image from 'next/image';
import logo from '../public/logo.png';

export default function Home() {
    return (
        <div>
            <h1>Logo for the company</h1>
            <Image
                src={logo}
                alt="My Logo"
                width={500}
                height={500}
            />
        </div>
    );
}
