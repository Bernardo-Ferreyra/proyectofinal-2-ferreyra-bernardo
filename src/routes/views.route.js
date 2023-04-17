const {Router} = require('express')
const ProductManager = require('../DAO/productManager.js')

const router = Router()
const productsManager = new ProductManager('./products.json');

router.get('/', async(req,res)=>{
    try{
        const products = await productsManager.getProducts();
        res.render('home', {
            title: "Lista de Productos",
            products
        })
    }catch(err){
        console.log(err)
    }
})

router.get('/realTimeProducts', async(req, res)=>{
    const products = await productsManager.getProducts();
    res.render('realTimeProducts', {
        title: "Lista de productos en tiempo real",
        products
    } )
})




module.exports = router