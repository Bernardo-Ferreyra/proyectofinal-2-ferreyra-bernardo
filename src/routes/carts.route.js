const {Router} = require('express')
/* const CartManager = require('../DAO/fileSystem/cartsManager.js') */ //fileSystem
/* const ProductManager = require('../DAO/fileSystem/productManager.js') */  //fileSystem
const CartManagerMongo= require('../DAO/mongo/cart.mongo.js');
const ProductManagerMongo = require('../DAO/mongo/product.mongo.js');

const router = Router()

/* const cartsManager = new CartManager('./carts.json'); */  //fileSystem
/* const productManager = new ProductManager('./products.json') */  //fileSystem
const cartsManager = new CartManagerMongo ;


router.post('/', async(req, res)=>{
    try{
        const cart = req.body
        const newCart = await cartsManager.createCart(cart)
        res.status(201).send({ status:'carrito creado correctamente', carrito: newCart })
    }catch(err){
        console.log(err)
    }
});

router.get('/', async (req, res) => {
	try{
		const limit = req.query.limit
		const carts = await cartsManager.getCarts();
		limit 
        ? res.send(carts.slice(0, limit)) 
        : res.send(carts);  
	} catch(err){
	    console.log(err)
	}
});

router.get('/:cid', async(req, res)=>{
    try{
		const id = req.params.cid;
		const cart = await cartsManager.getCartById(id);
		Object.keys(cart).length === 0
		? res.status(404).send({ message: `El carrito con ID ${id} no existe` })
		: res.status(201).send(cart)
    } catch(err){
        console.log(err)
    }
});


router.post('/:cid/products/:pid', async(req, res)=>{
    try{
        const cid = req.params.cid
        const pid = req.params.pid
        const cart = await cartsManager.getCartById(cid)
        if(Object.keys(cart).length === 0){
            return res.status(404).send({ message: `El carrito con ID ${cid} no existe` })
        }
        await cartsManager.addToCart(cid, pid)
        res.status(201).send({status: 'productos agregados correctamente'})
    }catch(err){
        console.log(err)
    }
});

module.exports= router;

