const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product')
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1:27017/fruitShop')
.then(()=> {
    console.log('Successfully Connection');
})
.catch((err) => {
    console.error(err)
})

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

/* Route */

const categories = ['fruit', 'vegetable', 'dairy']

app.get('/products' , async (req,res) => {
    const {category} = req.query;
    if (category) {
        const products = await Product.find({category});
        res.render('products/index',{products, category})
    }else{
        const products = await Product.find({});
        res.render('products/index',{products, category : 'All'})
    }
    const products = await Product.find({});
    res.render('products/index',{products})
})

app.get('/products/new',(req,res) =>{
    res.render('products/new', {categories})
})

app.get('/products/:id/edit', async (req,res) =>{
    const {id} = req.params
    const products = await Product.findById(id)
    res.render('products/edit', {products, categories})
})

app.post('/products', async (req,res)=> {
    const newProduct = new Product(req.body)
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`products/${newProduct._id}`)
})

app.get('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const findProduct = await Product.findById(id);
    res.render('products/show', {findProduct})
})

app.put('/products/:id', async (req,res)=>{
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true}, {new: true})
    res.redirect(`/products/${product._id}`)

})

app.delete('/products/:id', async (req,res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(1505,()=> {
    console.log('The server is now running under 1505 port');
})