import './App.css';
import LoginPage from './components/common/loginPage';
import Navbar from './components/customer/navbar.js';
import CustomerHomepage from './components/customer/customerHomepage.js';
import ManagerLogin from './components/Manager/managerLogin.js';
import ManagerConsole from './components/Manager/managerConsole.js';
import Product from './components/customer/product.js';
import Cart from './components/customer/cart';
import ThankYou from './components/customer/thankYou';
import Error from './components/Error/Error.js';
import Profile from './components/customer/profile.js';
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
                    <Route path="/" element={<LoginPage />} />
                    {/* <Route path="/customer-login" element={<CustomerLogin />} /> */}
                    <Route path="/customer" element={<NavLayout />}>
                        <Route index element={<CustomerHomepage />} />
                        <Route
                            path="/customer/fruits-veg"
                            element={<Product category="fruitsveg" />}
                        />
                        <Route
                            path="/customer/stationery"
                            element={<Product category="stationery" />}
                        />
                        <Route
                            path="/customer/books"
                            element={<Product category="books" />}
                        />
                        <Route path="/customer/cart" element={<Cart />} />
                        <Route path="/customer/profile" element={<Profile />} />
                        <Route
                            path="/customer/thank-you"
                            element={<ThankYou />}
                        />
                    </Route>
                    <Route path="/manager-login" element={<ManagerLogin />} />
                    <Route path="/manager" element={<ManagerConsole />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
