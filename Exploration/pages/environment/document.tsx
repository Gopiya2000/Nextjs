import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the DocumentContent component with a loading state and no server-side rendering (SSR).
const DocumentContent = dynamic(() => import('./content'), {
    loading: () => <p>Loading...</p>, // Show this message while loading the component.
    ssr: false, // Disable server-side rendering for this component.
});

/**
 * DocumentPage component that renders a button to show content.
 * When the button is clicked, the content is displayed.
 * 
 * @returns {JSX.Element} - The rendered document page with a button and optionally the content.
 */
export default function DocumentPage() {
    // State to manage the visibility of the DocumentContent.
    const [showContent, setShowContent] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowContent(true)} // Update state to show content when button is clicked.
            >
                Show content
            </button>
            {showContent && <DocumentContent />} {/* Render DocumentContent only if showContent is true. */}
        </>
    );
}