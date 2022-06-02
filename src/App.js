import './App.css';
import LoginPage from './components/common/loginPage';
import Navbar from './components/customer/navbar.js';
import CustomerHomepage from './components/customer/customerHomepage.js';
import ManagerLogin from './components/Manager/managerLogin.js';
import ManagerConsole from './components/Manager/managerConsole.js';
import Product from './components/customer/product.js';
import Histogram from './components/customer/histogram';
import Cart from './components/customer/cart';
import ThankYou from './components/customer/thankYou';
import Error from './components/Error/Error.js';
import QuizMaker from './components/Manager/quizMaker';
import QuizTaker from './components/customer/quizTaker';
import Profile from './components/customer/profile.js';
import {
    BrowserRouter,
    Route,
    Routes,
    Outlet,
    Navigate,
} from 'react-router-dom';

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
                    <Route path="/" element={<Navigate to="/login" />} />
                    {/* <Route path="/customer-login" element={<CustomerLogin />} /> */}
                    <Route
                        path="/akshay_directory"
                        element={<Navigate to="/login" />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/customer" element={<NavLayout />}>
                        <Route index element={<CustomerHomepage />} />
                        <Route
                            path="/customer/books"
                            element={<Product category="books" />}
                        />
                        <Route path="/customer/stats" element={<Histogram />} />
                        <Route path="/customer/cart" element={<Cart />} />
                        <Route path="/customer/profile" element={<Profile />} />
                        <Route
                            path="/customer/thank-you"
                            element={<ThankYou />}
                        />
                    </Route>
                    <Route path="/manager-login" element={<ManagerLogin />} />
                    <Route path="/manager" element={<ManagerConsole />} />
                    <Route path="/quiz-taker" element={<QuizTaker />} />
                    <Route path="/quiz-maker/:id" element={<QuizMaker />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
