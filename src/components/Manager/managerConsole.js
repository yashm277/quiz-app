import { useState, useEffect } from "react";
import "./manager.css";
import { db } from "../../firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const ManagerConsole = () => {
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newCategory, setNewCategory] = useState("fruitsveg");
  const [newQuantity, setNewQuantity] = useState(0);

  const dropdownItems = [
    { label: "Fruits And Vegetables", value: "fruitsveg" },
    { label: "Stationery", value: "stationery" },
    { label: "Books", value: "books" },
  ];

  const [items, setItems] = useState([]);
  const itemsCollectionRef = collection(db, "item");

  const createItem = async () => {
    await addDoc(itemsCollectionRef, {
      name: newName,
      price: Number(newPrice),
      category: newCategory,
      quantity: Number(newQuantity),
    });
  };

  const updateItem = async (id, price) => {
    const itemDoc = doc(db, "item", id);
    const newFields = { price: price + 5 };
    await updateDoc(itemDoc, newFields);
  };

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "item", id);
    await deleteDoc(itemDoc);
  };

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
    <div className="ManagerConsole">
      <input
        placeholder="Name"
        onChange={(e) => { setNewName(e.target.value); }}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={(e) => { setNewPrice(e.target.value); }}
      />
      <select value={newCategory} onChange={(e) => { setNewCategory(e.target.value); }}>
        {dropdownItems.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) => { setNewQuantity(e.target.value); }}
      />
      <button onClick={createItem}> Create Item</button>

      <div className="ManagerData">
        {items.map((item) => {
          return (
            <div>
              {" "}
              <h1>Name: {item.name}</h1>
              <h1>Price: {item.price}</h1>
              <h1>Quantity: {item.quantity}</h1>
              <h1>Category: {item.category}</h1>
              <button onClick={() => { updateItem(item.id, item.price); }}>
                {" "}
                Increase Price
              </button>
              <button onClick={() => { deleteItem(item.id); }}>
                {" "}
                Delete Item
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManagerConsole;
