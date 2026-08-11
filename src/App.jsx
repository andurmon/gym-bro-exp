import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';

function App() {
    const base = import.meta.env?.VITE_BASE_PATH ?? "HELLO";

    return (
        <BrowserRouter basename={base}>
            <AppRouter />
        </BrowserRouter>
    )
}

export default App
