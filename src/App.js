import './App.css';
import Navbar from './components/customer/navbar.js';
import CustomerHomepage from './components/customer/customerHomepage.js';
import ManagerConsole from './components/Manager/managerConsole.js';
import {
    BrowserRouter,
    Route,
    Routes,
    Outlet,
} from 'react-router-dom';

const NavLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);
// test

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavLayout />}>
                        <Route index element={<CustomerHomepage />} />
                        <Route path="/fruits-veg" />
                        <Route path="/stationery" />
                        <Route path="/books" />
                    </Route>
                    <Route path="/manager" element={<ManagerConsole />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
