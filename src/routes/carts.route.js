const {Router} = require('express')
const CartManager = require('../DAO/cartsManager.js')
const ProductManager = require('../DAO/productManager.js')

const router = Router()
const cartsManager = new CartManager('./carts.json');
const productManager = new ProductManager('./products.json')


router.post('/', async(req, res)=>{
    try{
        const cart = req.body
        const newCart = await cartsManager.createCart(cart)
        res.status(201).send({ status:'carrito creado correctamente', carrito: newCart })
    }catch(err){
        console.log(err)
    }
});


router.get('/:cid', async(req, res)=>{
    try{
		const id = parseInt(req.params.cid);
		const cart = await cartsManager.getCartById(id);
		cart
		? res.send(cart)
		: res.status(404).send({ message: `El carrito con ID ${id} no existe` });
    } catch(err){
        console.log(err)
    }
});


router.post('/:cid/products/:pid', async(req, res)=>{
    try{
        const cid = parseInt(req.params.cid)
        const pid = parseInt(req.params.pid)
        const product = await productManager.getProductById(pid)
        if (!product) {
           return res.status(404).send({ message:`El producto con ID ${pid} no existe` })
        } else {
            const cart = await cartsManager.addToCart(cid, pid)
            cart 
            ? res.status(200).send({message:'propducto agregado correctamente', cart})
            : res.status(404).send({message: `El carrito con el ID ${cid} no existe`}) 
        }
    }catch(err){
        console.log(err)
    }
});

module.exports= router;