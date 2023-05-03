const {Router} = require('express')
/* const ProductManager = require('../DAO/fileSystem/productManager.js') */ //fileSystem
const ProductManagerMongo= require('../DAO/mongo/product.mongo.js')

const router = Router()
/* const productsManager = new ProductManager('./products.json'); */  //fileSystem
const productsManager = new ProductManagerMongo;

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
    try{
        const products = await productsManager.getProducts();
        res.render('realTimeProducts', {
            title: "Lista de productos en tiempo real",
            products
        })
    }catch(err){
        console.log(err)
    }
})

router.get('/chat', (req, res)=>{
    res.render('chat', {})
})




module.exports = router