const categoryTranslate = (category) => {
    if (category === 'fruitsveg') return 'Fruits & Vegetables';
    else return category.charAt(0).toUpperCase() + category.slice(1);
}

export default categoryTranslate;