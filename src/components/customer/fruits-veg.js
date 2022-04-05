import { useState, useEffect } from "react";
import { db } from "../../firebase-config.js";
import {
    collection,
    getDocs,
    onSnapshot,
} from "firebase/firestore";

const FruitsVeg = () => {
    const [items, setItems] = useState([]);
    const itemsCollectionRef = collection(db, "item");

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
            {items.map((item) => {
                return (
                    <div>
                        {" "}
                        <h1>Name: {item.name}</h1>
                        <h1>Price: {item.price}</h1>
                        <h1>Quantity: {item.quantity}</h1>
                        <h1>Category: {item.category}</h1>
                    </div>
                );
            })}
        </div>
    )
}

export default FruitsVeg;