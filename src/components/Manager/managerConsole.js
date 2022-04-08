import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './manager.css';
import { db } from '../../firebase-config.js';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import ManagerConsolePresentData from './managerConsolePresentData';
import getItems from '../common/getItems';

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
        getItems(itemsCollectionRef, setItems);
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
                    <option key={option.value} value={option.value}>{option.label}</option>
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

            <h1>Fruits and Vegetables</h1>
            <div className="ManagerData">
                <ManagerConsolePresentData
                    items={items}
                    category="fruitsveg"
                    setModalData={setModalData}
                    setModalOpen={setModalOpen}
                    deleteItem={deleteItem}
                />
            </div>

            <h1>Stationery</h1>
            <div className='ManagerData'>
                <ManagerConsolePresentData
                    items={items}
                    category="stationery"
                    setModalData={setModalData}
                    setModalOpen={setModalOpen}
                    deleteItem={deleteItem}
                />
            </div>

            <h1>Books</h1>
            <div className='ManagerData'>
                <ManagerConsolePresentData
                    items={items}
                    category="books"
                    setModalData={setModalData}
                    setModalOpen={setModalOpen}
                    deleteItem={deleteItem}
                />
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
                            <option key={option.value} value={option.value}>{option.label}</option>
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
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default ManagerConsole;
