const {Router} = require('express')
const ProductManagerMongo= require('../DAO/mongo/product.mongo.js')
const CartManagerMongo= require('../DAO/mongo/cart.mongo.js');
const { productModel } = require('../DAO/models/product.model.js')

const router = Router()

const productsManager = new ProductManagerMongo;
const cartsManager = new CartManagerMongo;

router.get('/', async(req,res)=>{
    try{

        const limit = req.query.limit
        const result = await productsManager.getProducts()
        let products
        limit
        ? products = result.slice(0, limit)
        : products = result

        let user = req.session.user

        res.render('home', {
            title: "Lista de Productos",
            products,
            user
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


router.get('/products', async(req,res)=>{
    try{
        const {limit= 2}= req.query
        const{page=1} = req.query
        const { sort } = req.query;
        let sortOptions={}

        if (sort === 'asc') {
            sortOptions = { price: 1 };
        } else if (sort === 'desc') {
            sortOptions = { price: -1 };
        }
        
        let { 
            docs, 
            totalPages,
            prevPage, 
            nextPage,
            hasPrevPage, 
            hasNextPage 
        } = await productModel.paginate({},{limit: limit , page: page, sort: sortOptions,lean: true})

        !hasPrevPage
        ? prevLink = null
        : prevLink =`/products?page=${prevPage}&limit=${limit}&sort=${sort}`

        !hasNextPage 
        ?nextLink = null
        :nextLink =`/products?page=${nextPage}&limit=${limit}&sort=${sort}`


        res.render('products',{
            status: 'success',
            payload: docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        })
    }catch(err){
        console.log(err)
    }

})

router.get('/carts/:cid', async(req,res)=>{

    try{
        const cid = req.params.cid;
        const cart = await cartsManager.getCartById(cid);
        if(!cart){
            res.status(404).send({ message: `El carrito con ID ${cid} no existe` })
        }else{
            let products= cart.products
            res.status(201).render('cart', {
                products
            })
        }
        
    } catch(err){
        console.log(err)
    }

})


router.get('/chat', (req, res)=>{
    res.render('chat', {})
})

router.get('/api/session/login', (req,res)=>{
    res.render('login',{})
})

router.get('/api/session/register', (req,res)=>{
    res.render('registerForm',{})
})



module.exports = router