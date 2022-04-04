import './App.css';
import Navbar from './components/customer/navbar.js';
import CustomerHomepage from './components/customer/customerHomepage.js';
import ManagerConsole from './components/Manager/managerConsole.js';
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
                    <Route path="/" element={<CustomerHomepage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
