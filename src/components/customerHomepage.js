import fruits from '../assets/fruits.jpeg';
import stationery from '../assets/stationery.jpeg';
import books from '../assets/books.jpg';

const Homepage = () => {
    return (
        <div className="home">
            <h1>Welcome to Akshay!</h1>
            <h3>Categories</h3>
            <div className="dash">
                <a href="/fruits-veg" className="dashEl">
                    <img src={fruits} alt="Fruits and Vegetables" />
                    <p>Fruits and Vegetables</p>
                </a>
                <a href="/stationery" className="dashEl">
                    <img src={stationery} alt="Stationery" />
                    <p>Stationery</p>
                </a>
                <a href="/books" className="dashEl">
                    <img src={books} alt="Books" />
                    <p>Books</p>
                </a>
                <a href="/books" className="dashEl">
                    <img src={books} alt="Books" />
                    <p>Books</p>
                </a>
            </div>
        </div>
    );
};

export default Homepage;
