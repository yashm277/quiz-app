const ManagerConsolePresentData = ({ items, category, setModalData, setModalOpen, deleteItem }) => {
    return (
        items.filter(item => item.category === category).map((item) => {
            return (
                <div>
                    {' '}
                    <h5>Name: {item.name}</h5>
                    <h5>Price: {item.price}</h5>
                    <h5>Quantity: {item.quantity}</h5>
                    <h5>Category: {item.category}</h5>
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
                        {' '}
                        Delete Item
                    </button>
                </div>
            );
        }))
}

export default ManagerConsolePresentData;