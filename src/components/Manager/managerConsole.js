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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ManagerConsolePresentData from './managerConsolePresentData';
import getItems from '../common/getItems';

const ManagerConsole = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('fruitsveg');
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

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
        image: null,
        imageUrl: '',
    });

    // TODO: Needs to be rewritten to be not terrible
    // TODO??: should deleteItem() delete the image in the database? Probably not

    // Code beyond this point is forsaken by god
    const storage = getStorage();

    const [createItemVar, setCreateItemVar] = useState(false);
    const [updateItemVar, setUpdateItemVar] = useState(false);

    const createItem = async () => {
        const storageRef = ref(storage, image.name);
        await uploadBytes(storageRef, image);
        setImageUrl(await getDownloadURL(storageRef));
        setCreateItemVar(true);
    };

    const updateItem = async (data) => {
        if (data.image) {
            const storageRef = ref(storage, data.image.name);
            await uploadBytes(storageRef, data.image);
            setModalData({ ...modalData, imageUrl: await getDownloadURL(storageRef) })
        }
        setUpdateItemVar(true);
    }

    useEffect(async () => {
        if (createItemVar) {
            await addDoc(itemsCollectionRef, {
                name: name,
                price: Number(price),
                category: category,
                quantity: Number(quantity),
                imageUrl: imageUrl,
            });
            setCreateItemVar(false);
        }
        if (updateItemVar) {
            const itemDoc = doc(db, 'item', modalData.id);
            const newFields = {
                name: modalData.name,
                price: Number(modalData.price),
                category: modalData.category,
                quantity: Number(modalData.quantity),
                imageUrl: modalData.imageUrl
            };
            await updateDoc(itemDoc, newFields);
            setUpdateItemVar(false);
        }
    }, [createItemVar, updateItemVar])
    // End of hellspawn code

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
                    setName(e.target.value);
                }}
            />
            <input
                type="number"
                placeholder="Price"
                onChange={(e) => {
                    setPrice(e.target.value);
                }}
            />
            <select
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
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
                    setQuantity(e.target.value);
                }}
            />
            <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
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
                    <input type="file" onChange={(e) => {
                        setModalData({
                            ...modalData,
                            image: e.target.files[0]
                        })
                    }} />
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
