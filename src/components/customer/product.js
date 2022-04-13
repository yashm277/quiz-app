import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../../firebase-config.js';
import { collection, setDoc, doc, getDoc, onSnapshot, updateDoc, deleteField } from 'firebase/firestore';
import categoryTranslate from '../common/categoryTranslate.js';
import getItems from '../common/getItems.js';

import './customer.css';

const Product = ({ category }) => {
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([{}]);
    const [cart, setCart] = useState([]);
    const [cartCollectionRef, setCartCollectionRef] = useState(null);
    const itemsCollectionRef = collection(db, 'item');
    // To prevent infinite loop when calling data from firestore.
    const [ignoreCheck, setIgnoreCheck] = useState(false);

    useEffect(() => {
        getItems(itemsCollectionRef, setItems);
    }, []);


    useEffect(() => {
        if (cartCollectionRef) {
            onSnapshot(cartCollectionRef, async () => {
                const data = await getDoc(cartCollectionRef);

                let temp = [];

                if (data.data()) {
                    for (let i = 0; i < Object.keys(data.data()).length; i++) {
                        temp.push({ id: Object.keys(data.data())[i], quantity: Object.values(data.data())[i] })
                    }
                }

                setIgnoreCheck(true);
                setCart(temp);
            });
        }
    }, [cartCollectionRef])

    useEffect(async () => {
        if (ignoreCheck) setIgnoreCheck(false);
        else if (user) {
            setCartCollectionRef(await doc(db, 'cart', user.email));

            for (let i = 0; i < cart.length; i++) {
                if (!cart[i].quantity) {
                    await updateDoc(cartCollectionRef, {
                        [cart[i].id]: deleteField()
                    });
                }
                else setDoc(cartCollectionRef, { [cart[i].id]: cart[i].quantity }, { merge: true });
            }
        }
    }, [user, cart]);

    const navigate = useNavigate();
    const auth = getAuth();
    const [display, setDisplay] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if (!user) navigate("/customer-login");
        else {
            setUser(user);
            setDisplay(true);
        }
    });

    const addToCart = (id) => {
        let temp = [...cart];
        let item = temp.filter((item) => item.id === id);
        temp = temp.filter((item) => item.id !== id);
        if (item[0]) temp.push({ id: id, quantity: item[0].quantity + 1 });
        else temp.push({ id: id, quantity: 1 });
        setCart(temp);
    }

    const removeFromCart = (id) => {
        let temp = [...cart];
        let item = temp.filter((item) => item.id === id);
        temp = temp.filter((item) => item.id !== id);
        if (item[0].quantity <= 0) throw ((error) => alert(error));
        temp.push({ id: id, quantity: item[0].quantity - 1 })
        setCart(temp);
    }

    const showQuantity = (id) => {
        let temp = cart.findIndex(i => i.id === id);
        if (temp !== -1) return cart[temp].quantity;
        else return 0;
    }

    const removeButtonDisable = (item) => {
        let temp = cart.findIndex(i => i.id === item.id);
        if (temp === -1 || !cart[temp].quantity) return true;
        return false;
    }

    const addButtonDisable = (item) => {
        if (!item.quantity) return true;

        let temp = cart.findIndex(i => i.id === item.id);
        if (temp === -1) return false;
        if (item.quantity > cart[temp].quantity) return false;
        return true;
    }

    if (!display) return <></>;

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
                            <button
                                onClick={() => { removeFromCart(item.id); }}
                                disabled={removeButtonDisable(item)}
                            >
                                Remove from Cart
                            </button>
                            <button
                                onClick={() => { addToCart(item.id); }}
                                disabled={addButtonDisable(item)}>
                                Add to Cart
                            </button>
                            Cart: {showQuantity(item.id)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Product;