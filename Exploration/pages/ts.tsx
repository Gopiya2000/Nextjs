import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Button from "./components/Button";

const Home: NextPage = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch the API when the component mounts
        fetch("/api/example")
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    return (
        <div>
            <h1>Next.js with TypeScript</h1>
            <p>{message}</p>
            <Button text="Click Me" onClick={() => alert("Button clicked!")} />
        </div>
    );
};

export default Home;
