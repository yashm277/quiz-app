import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import fruits from '../../assets/fruits.jpeg';
import stationery from '../../assets/stationery.jpeg';
import books from '../../assets/books.jpg';
import { useState } from 'react';

const Homepage = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [display, setDisplay] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if (!user) navigate("/customer-login");
        else setDisplay(true);
    });

    if (!display) return <></>;

    return (
        <div className="home">
            <h1>Welcome to Akshay!</h1>
            <h3>Categories</h3>
            <div className="dash">
                <a href="/customer/fruits-veg" className="dashEl">
                    <img src={fruits} alt="Fruits and Vegetables" />
                    <p>Fruits and Vegetables</p>
                </a>
                <a href="/customer/stationery" className="dashEl">
                    <img src={stationery} alt="Stationery" />
                    <p>Stationery</p>
                </a>
                <a href="/customer/books" className="dashEl">
                    <img src={books} alt="Books" />
                    <p>Books</p>
                </a>
                <a href="/customer/books" className="dashEl">
                    <img src={books} alt="Books" />
                    <p>Books</p>
                </a>
            </div>
        </div>
    );
};

export default Homepage;
