const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

const SECRET_KEY = "MY_TOKEN"; // Store this securely in an environment variable in a real app

let users = [];
let products = [
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

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
}

// Register user
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find(u => u.username === username);

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), username, password: hashedPassword };
    users.push(newUser);
    res.json({ message: "User registered successfully" });
});

// Login user
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});

// Get all products (protected)
app.get("/products", authenticateToken, (req, res) => {
    res.json(products);
});

// Get a product by ID (protected)
app.get("/products/:id", authenticateToken, (req, res) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if (index !== -1) {
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

// Add a new product (protected)
app.post("/products", authenticateToken, (req, res) => {
    const product = {
        id: Date.now(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        img: req.body.img
    };
    products.push(product);
    res.json(product);
});

// Delete a product (protected)
app.delete("/products/:id", authenticateToken, (req, res) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: 'Product deleted', id: id });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

// Update a product (protected)
app.put("/products/:id", authenticateToken, (req, res) => {
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
    return products.findIndex(product => product.id === id);
}

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// Get user info (protected)
app.get("/get-info", authenticateToken, (req, res) => {
    
    const userId = req.user.id;
    
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
        id: user.id,
        username: user.username,
        age: user.age,
        image: user.image,
        description: user.description
    });
});



// Update user info (protected)
app.put("/update-profile", authenticateToken, (req, res) => {
    const userId = req.user.id;
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update allowed fields
    const { age, image, description } = req.body;
    
    if (age) user.age = age;
    if (image) user.image = image;
    if (description) user.description = description;

    res.json({
        message: "User profile updated successfully",
        user: {
            id: user.id,
            username: user.username,
            age: user.age,
            image: user.image,
            description: user.description
        }
    });
});
