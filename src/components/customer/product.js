import { useState, useEffect } from 'react';
import { db } from '../../firebase-config.js';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

import './customer.css';

import fruits from '../../assets/fruits.jpeg';

const Product = ({category}) => {
    const [items, setItems] = useState([]);
    const itemsCollectionRef = collection(db, 'item');

    const categoryTranslate = (category) => {
        if (category === 'fruitsveg') return 'Fruits & Vegetables'
        else return category.charAt(0).toUpperCase() + category.slice(1);
    }

    useEffect(() => {
        const getItems = async () => {
            onSnapshot(itemsCollectionRef, async () => {
                const data = await getDocs(itemsCollectionRef);
                setItems(
                    data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            });
        };

        getItems();
    }, []);

    return (
        <div>
            <h3>{categoryTranslate(category)}</h3>
            <div className="category-flex-container">
                {items.filter(item => item.category === category).map((item) => {
                    return (
                        <div key={item.id}>
                            <img src={fruits} alt="" />
                            <h3>{item.name}</h3>
                            <p>Price: {item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button>Add to Cart</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Product;