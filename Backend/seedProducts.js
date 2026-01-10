const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');

dotenv.config();

const products = [
    {
        name: "Classic Cheese Burger",
        description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and our secret sauce.",
        price: 199,
        category: "Burger",
        stock: 50,
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Double Bacon Burger",
        description: "Double beef patty, crispy bacon, caramelized onions, and BBQ sauce.",
        price: 299,
        category: "Burger",
        stock: 40,
        imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Margherita Pizza",
        description: "Classic tomato sauce, fresh mozzarella, and basil leaves.",
        price: 249,
        category: "Pizza",
        stock: 30,
        imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Pepperoni Pizza",
        description: "Spicy pepperoni slices with mozzarella cheese and tomato base.",
        price: 349,
        category: "Pizza",
        stock: 35,
        imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Veggie Supreme Pizza",
        description: "Loaded with bell peppers, onions, mushrooms, olives, and corn.",
        price: 329,
        category: "Pizza",
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Caesar Salad",
        description: "Crisp romaine lettuce, croutons, parmesan cheese, and caesar dressing.",
        price: 179,
        category: "Healthy",
        stock: 20,
        imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Greek Salad",
        description: "Cucumbers, tomatoes, feta cheese, olives, and olive oil dressing.",
        price: 199,
        category: "Healthy",
        stock: 20,
        imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Chocolate Brownie",
        description: "Rich and gooey chocolate brownie topped with walnuts.",
        price: 129,
        category: "Dessert",
        stock: 50,
        imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Strawberry Cheesecake",
        description: "Creamy cheesecake with a sweet strawberry topping.",
        price: 189,
        category: "Dessert",
        stock: 30,
        imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Chicken Biryani",
        description: "Aromatic basmati rice cooked with tender chicken and spices.",
        price: 299,
        category: "Main Course",
        stock: 40,
        imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Paneer Butter Masala",
        description: "Cottage cheese cubes in a rich and creamy tomato gravy.",
        price: 249,
        category: "Main Course",
        stock: 45,
        imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        name: "Ice Cream Sundae",
        description: "Vanilla ice cream topped with chocolate syrup and cherries.",
        price: 149,
        category: "Dessert",
        stock: 40,
        imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Optional: Clear existing products
        const count = await Product.countDocuments();
        if (count > 0) {
            console.log(`Found ${count} existing products. Clearing them...`);
            await Product.deleteMany({});
        }

        await Product.insertMany(products);
        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
