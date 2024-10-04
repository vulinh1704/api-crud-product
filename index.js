const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const products = [
    {
        id: 1,
        name: 'Bánh mì',
        description: 'Xốp, giòn và ngon lắm',
        img: "https://i.ex-cdn.com/vntravellive.com/files/news/2023/05/15/luu-ngay-5-quan-banh-mi-ngon-nen-thu-tai-sai-gon-151953.jpg",
        price: 100,
        stock: 50
    },
    {
        id: 2,
        name: 'Mì tôm',
        description: 'Rẻ ngon and Vip pro',
        img: "https://satrafoods.com.vn/uploads/Images/san-pham/thuc-pham-kho/8934563138165-5.jpg",
        price: 150,
        stock: 30
    },
    {
        id: 3,
        name: 'Kẹo bông gòn',
        img: "https://vannghedanang.org.vn/app/upload/post/2019-09-06/20190906083615_keo_bong_gon.jpg",
        description: 'Mềm mà hơi dai',
        price: 200,
        stock: 20
    }
];

// Get all products
app.get("/products", (req, res) => {
    res.json(products);
});

// Get a product by ID
app.get("/products/:id", (req, res) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if (index !== -1) {
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

// Add a new product
app.post("/products", (req, res) => {
    const product = {
        id: (new Date()).getTime(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        img: req.body.img
    };
    products.push(product);
    res.json(product);
});

// Delete a product
app.delete("/products/:id", (req, res) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: 'Product deleted', id: id });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

// Update a product
app.put("/products/:id", (req, res) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if (index !== -1) {
        const product = products[index];
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.stock = req.body.stock;
        product.img = req.body.img;
        res.json(product);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

// Helper function to find a product by ID
function findProductIndex(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            return i;
        }
    }
    return -1;
}
