import './App.css';
import Navbar from './components/navbar.js';
import Homepage from './components/customerHomepage.js';
import {
    BrowserRouter,
    BrowserRouter as Router,
    Route,
    Routes,
    Switch,
} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Navbar></Navbar>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
