import { Provider } from 'react-redux'; // Provider is used to make the Redux store available to the rest of the app
import type { AppProps } from 'next/app'; // Import the AppProps type for TypeScript support in Next.js apps
import { store } from '../store/store';

// Define the TaskManagerApp component which acts as the main entry point for the application
function TaskManagerApp({ Component, pageProps }: AppProps) {
    return (
        // Wrap the main application component with the Redux Provider to allow access to the store
        <Provider store={store}>
            {/* Render the specific page component and pass its props */}
            <Component {...pageProps} />
        </Provider>
    );
}

export default TaskManagerApp;