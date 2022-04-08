const ManagerConsolePresentData = ({ items, category, setModalData, setModalOpen, deleteItem }) => {
    const categoryTranslate = (category) => {
        if (category === 'fruitsveg') return 'Fruits & Vegetables'
        else return category.charAt(0).toUpperCase() + category.slice(1);
    }

    return (
        items.filter(item => item.category === category).map((item) => {
            return (
                <div key={item.id}>
                    <h5>Name: {item.name}</h5>
                    <h5>Price: {item.price}</h5>
                    <h5>Quantity: {item.quantity}</h5>
                    <h5>Category: {categoryTranslate(item.category)}</h5>
                    <button
                        onClick={() => {
                            setModalData(item);
                            setModalOpen(true);
                        }}
                    >
                        Edit Item
                    </button>
                    <button
                        onClick={() => {
                            deleteItem(item.id);
                        }}
                    >

                        Delete Item
                    </button>
                </div>
            );
        }))
}

export default ManagerConsolePresentData;