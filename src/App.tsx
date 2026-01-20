import { MemoryRouter, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './pages/WelcomeScreen';
import SessionScreen from './pages/SessionScreen';
import DataDesk from './pages/DataDesk';
import './index.css';

function App() {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<WelcomeScreen />} />
                <Route path="/session" element={<SessionScreen />} />
                <Route path="/data" element={<DataDesk />} />
            </Routes>
        </MemoryRouter>
    );
}

export default App;
