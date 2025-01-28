import { useState } from "react";
import dynamic from "next/dynamic";

const DocumentContent = dynamic(() => import('./content'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

export default function DocumentPage() {
    const [showContent, setShowContent] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowContent(true)}
            >
                Show content
            </button>
            {showContent && <DocumentContent />}
        </>
    )
};