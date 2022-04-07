import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './manager.css';
import { db } from '../../firebase-config.js';
import {
    collection,
    getDocs,
    addDoc,
    onSnapshot,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';

const ManagerConsole = () => {
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [newCategory, setNewCategory] = useState('fruitsveg');
    const [newQuantity, setNewQuantity] = useState(0);

    const dropdownItems = [
        { label: 'Fruits And Vegetables', value: 'fruitsveg' },
        { label: 'Stationery', value: 'stationery' },
        { label: 'Books', value: 'books' },
    ];

    const [items, setItems] = useState([]);
    const itemsCollectionRef = collection(db, 'item');

    const [modalOpen, setModalOpen] = useState(false);
    let [modalData, setModalData] = useState({
        name: '',
        price: 0,
        category: '',
        quantity: 0,
    });

    const createItem = async () => {
        await addDoc(itemsCollectionRef, {
            name: newName,
            price: Number(newPrice),
            category: newCategory,
            quantity: Number(newQuantity),
        });
    };

    const updateItem = async (data) => {
        const itemDoc = doc(db, 'item', data.id);
        const newFields = {
            name: data.name,
            price: Number(data.price),
            category: data.category,
            quantity: Number(data.quantity),
        };
        await updateDoc(itemDoc, newFields);
    };

    const deleteItem = async (id) => {
        const itemDoc = doc(db, 'item', id);
        await deleteDoc(itemDoc);
    };

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
        <div className="ManagerConsole">
            <input
                placeholder="Name"
                onChange={(e) => {
                    setNewName(e.target.value);
                }}
            />
            <input
                type="number"
                placeholder="Price"
                onChange={(e) => {
                    setNewPrice(e.target.value);
                }}
            />
            <select
                value={newCategory}
                onChange={(e) => {
                    setNewCategory(e.target.value);
                }}
            >
                {dropdownItems.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Quantity"
                onChange={(e) => {
                    setNewQuantity(e.target.value);
                }}
            />
            <button onClick={createItem}> Create Item</button>

            <div className="ManagerData">
                {items.map((item) => {
                    return (
                        <div>
                            {' '}
                            <h5>Name: {item.name}</h5>
                            <h5>Price: {item.price}</h5>
                            <h5>Quantity: {item.quantity}</h5>
                            <h5>Category: {item.category}</h5>
                            <button
                                onClick={() => {
                                    deleteItem(item.id);
                                }}
                            >
                                {' '}
                                Delete Item
                            </button>
                            <button
                                onClick={() => {
                                    setModalData(item);
                                    setModalOpen(true);
                                }}
                            >
                                Edit Item
                            </button>
                        </div>
                    );
                })}
            </div>

            <Modal
                ariaHideApp={false}
                isOpen={modalOpen}
                onRequestClose={() => {
                    setModalOpen(false);
                }}
                contentLabel="Update"
            >
                <div>
                    <input
                        placeholder="Name"
                        value={modalData.name}
                        onChange={(e) => {
                            setModalData({
                                ...modalData,
                                name: e.target.value,
                            });
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={modalData.price}
                        onChange={(e) => {
                            setModalData({
                                ...modalData,
                                price: e.target.value,
                            });
                        }}
                    />
                    <select
                        value={modalData.category}
                        onChange={(e) => {
                            setModalData({
                                ...modalData,
                                category: e.target.value,
                            });
                        }}
                    >
                        {dropdownItems.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={modalData.quantity}
                        onChange={(e) => {
                            setModalData({
                                ...modalData,
                                quantity: e.target.value,
                            });
                        }}
                    />
                    <button
                        onClick={() => {
                            updateItem(modalData);
                            setModalOpen(false);
                        }}
                    >
                        Update Item
                    </button>
                </div>
                <button
                    onClick={() => {
                        setModalOpen(false);
                    }}
                >
                    close
                </button>
            </Modal>
        </div>
    );
};

export default ManagerConsole;
