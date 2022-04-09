import { useState, useEffect } from 'react';
import { db } from '../../firebase-config.js';
import { collection } from 'firebase/firestore';
import categoryTranslate from '../common/categoryTranslate.js';
import getItems from '../common/getItems.js';

import './customer.css';

const Product = ({ category }) => {
    const [items, setItems] = useState([]);
    const itemsCollectionRef = collection(db, 'item');

    useEffect(() => {
        getItems(itemsCollectionRef, setItems);
    }, []);

    return (
        <div>
            <h3>{categoryTranslate(category)}</h3>
            <div className="category-flex-container">
                {items.filter(item => item.category === category).map((item) => {
                    return (
                        <div key={item.id}>
                            <img src={item.imageUrl} alt="" height={100} width={100} />
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