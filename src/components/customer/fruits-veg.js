import { useState, useEffect } from 'react';
import { db } from '../../firebase-config.js';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

import './customer.css';

import fruits from '../../assets/fruits.jpeg';

const FruitsVeg = () => {
    const [items, setItems] = useState([]);
    const itemsCollectionRef = collection(db, 'item');

    useEffect(() => {
        const getItems = async () => {
            onSnapshot(itemsCollectionRef, async () => {
                const data = await getDocs(itemsCollectionRef);
                setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
        };

        getItems();
    }, []);

    return (
        <div>
            <h3>Fruits and Vegetables</h3>
            <div className="category-flex-container">
                {items.map((item) => {
                    return (
                        <div>
                            <img src={fruits} alt="" />
                            <h3>{item.name}</h3>
                            <p>Price: {item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FruitsVeg;
