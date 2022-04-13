import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../../firebase-config.js';
import getItems from '../common/getItems.js';
import {
    onSnapshot,
    doc,
    collection,
    updateDoc,
    deleteDoc,
    getDoc
} from 'firebase/firestore';
import categoryTranslate from "../common/categoryTranslate";
// import getCart from './getCart.js';

const Cart = () => {
    const [user, setUser] = useState(null);

    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const itemsCollectionRef = collection(db, 'item');
    const [cartCollectionRef, setCartCollectionRef] = useState(null);

    useEffect(() => {
        getItems(itemsCollectionRef, setItems);
    }, []);

    useEffect(async () => {
        if (user) setCartCollectionRef(await doc(db, 'cart', user.email));
    }, [user])

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

                setCart(temp);
            });
        }
    }, [cartCollectionRef])

    useEffect(() => {
        if (cart[0]) {
            let temp = [];

            for (let i = 0; i < cart.length; i++) {
                let temp2 = items.findIndex(j => j.id === cart[i].id);
                if (temp2 !== -1) temp.push(items[temp2]);
            }

            setCartItems(temp);
        }
    }, [cart])

    const navigate = useNavigate();
    const auth = getAuth();
    const [display, setDisplay] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if (!user) navigate("/customer-login");
        else {
            setDisplay(true);
            setUser(user);
        }
    });

    const showQuantity = (id) => {
        let temp = cart.findIndex(i => i.id === id);
        if (temp !== -1) return cart[temp].quantity;
        else return 0;
    }

    const totalPrice = () => {
        let temp = 0;

        cartItems.map((item) => {
            temp += item.price * showQuantity(item.id);
        })

        return temp;
    }

    const checkout = async () => {
        for (let i = 0; i < cartItems.length; i++) {
            let index = items.findIndex(j => j.id === cartItems[i].id);
            let finalQuantity = items[index].quantity - cart[i].quantity;

            const itemDoc = doc(db, 'item', items[index].id);
            const newFields = {
                quantity: Number(finalQuantity),
            };
            await updateDoc(itemDoc, newFields);
        }

        setCart([]);
        setCartItems([]);

        const cartDoc = doc(db, 'cart', user.email)
        await deleteDoc(cartDoc);

        navigate('/customer/thank-you');
    }

    if (!display) return <></>;

    return (
        <div>
            {cartItems.map((item) => {
                return (
                    <div key={item.id}>
                        <img src={item.imageUrl} alt="" height={100} width={100} />
                        <h5>Name: {item.name}</h5>
                        <h5>Price per item: {item.price}</h5>
                        <h5>Quantity: {showQuantity(item.id)}</h5>
                        <h5>Price: {showQuantity(item.id) * item.price}</h5>
                    </div>
                );
            })}
            <div><p>Total Price: {totalPrice()}</p></div>
            <button onClick={checkout}>Checkout</button>
        </div>
    );
}

export default Cart;