const mongoose = require('mongoose');
const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/fruitShop')
.then(()=> {
    console.log('Successfully Connection');
})
.catch((err) => {
    console.error(err)
})

const products = [
    { name: 'Apple', price: 1.99, category: 'fruit' },
    { name: 'Banana', price: 0.99, category: 'fruit' },
    { name: 'Carrot', price: 0.49, category: 'vegetable' },
    { name: 'Milk', price: 2.49, category: 'dairy' },
    // Add more items as needed
];

Product.insertMany(products)
.then(data => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})