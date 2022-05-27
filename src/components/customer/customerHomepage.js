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

    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (user) => {
        if (!user) navigate("/customer-login");
        else {
            setDisplay(true);
            setUser(user);
        }
    });

    if (!display) return <></>;

    return (
        <div className="home">
            <h1>Welcome to the Quiz App!</h1>
            <h3>Quizzes</h3>
            <div className="dash">
                <a href="/customer/fruits-veg" className="dashEl">
                    <img src={fruits} alt="Histogram" />
                    <p>Quiz 1</p>
                </a>
            </div>
        </div>
    );
};

export default Homepage;
