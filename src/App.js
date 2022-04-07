import './App.css';
import Navbar from './components/customer/navbar.js';
import CustomerHomepage from './components/customer/customerHomepage.js';
import ManagerConsole from './components/Manager/managerConsole.js';
import FruitsVeg from './components/customer/fruits-veg.js';
import Error from './components/Error/Error.js';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

const NavLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavLayout />}>
                        <Route index element={<CustomerHomepage />} />
                        <Route path="/fruits-veg" element={<FruitsVeg />} />
                        <Route path="/stationery" />
                        <Route path="/books" />
                    </Route>
                    <Route path="/manager" element={<ManagerConsole />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
