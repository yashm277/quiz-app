import {
    getDocs,
    onSnapshot,
} from 'firebase/firestore';

const getItems = async (itemsCollectionRef, setItems) => {
    onSnapshot(itemsCollectionRef, async () => {
        const data = await getDocs(itemsCollectionRef);
        setItems(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    });
};

export default getItems;