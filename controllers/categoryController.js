const products = [
    { id: 1, name: "laptop", price: 3000, qty: 3 },
    { id: 2, name: "mouse", price: 2000, qty: 12 },
    { id: 3, name: "pc", price: 4500, qty: 10 }
];

// گرفتن همه محصولات
const getAllProducts = (req, res) => {
    res.json(products);
};

// گرفتن محصول بر اساس id
const getProductById = (req, res) => {
    const pId = req.params.id;

    const foundProduct = products.find(p => p.id == pId);

    if (!foundProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(foundProduct);
};

module.exports = {
    getAllProducts,
    getProductById
};
