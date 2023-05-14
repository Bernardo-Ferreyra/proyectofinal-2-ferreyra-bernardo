const {Router} = require('express')
/* const CartManager = require('../DAO/fileSystem/cartsManager.js') */ //fileSystem
/* const ProductManager = require('../DAO/fileSystem/productManager.js') */  //fileSystem
const CartManagerMongo= require('../DAO/mongo/cart.mongo.js');

const router = Router()

/* const cartsManager = new CartManager('./carts.json'); */  //fileSystem
/* const productManager = new ProductManager('./products.json') */  //fileSystem
const cartsManager = new CartManagerMongo ;


router.post('/', async(req, res)=>{
    try{
        const newCart = {products:[]}
        await cartsManager.createCart(newCart)
        res.status(201).send({ message: 'Carrito creado correctamente'})
    }catch(err){
        console.log(err)
    }
});

router.get('/', async (req, res) => {
	try{
		const limit = req.query.limit
		const carts = await cartsManager.getCarts();
		limit 
        ? res.status(201).send(carts.slice(0, limit)) 
        : res.status(201).send(carts);  
	} catch(err){
	    console.log(err)
	}
});



router.get('/:cid', async(req, res)=>{
    try{
		const cid = req.params.cid;
		const cart = await cartsManager.getCartById(cid);
        if(!cart){
            res.status(404).send({ message: `El carrito con ID ${cid} no existe` })
        }
        res.status(201).send(cart)
    } catch(err){
        console.log(err)
    }
});

router.delete('/:cid', async(req, res)=>{
    try{
        const cid = req.params.cid
        let respuesta= await cartsManager.emptyCart(cid)
        if(!respuesta){
            return res.status(400).send({message:'no se pudo vaciar el carrito'})
        }
        res.status(200).send({message: 'Se ha vaciado el carrito'})
    }catch(err){
        console.log(err)
    }
})


router.put('/:cid', async(req, res)=>{
    try{
        const cid = req.params.cid
        const newCart= req.body
        let respuesta= await cartsManager.modifyCart(cid, newCart)
        if(!respuesta){
            return res.status(400).send({message:'No se pudo modificar el carrito'})
        }
        res.status(200).send({message: 'Se ha modificado el carrito'})
    }catch(err){
        console.log(err)
    }
})


router.post('/:cid/products/:pid', async(req, res)=>{
    try{
        const cid = req.params.cid
        const pid = req.params.pid
        const {cantidad}= req.body
        
        const addProduct= await cartsManager.addToCart(cid, pid, cantidad)
        if(!addProduct){
            res.status(400).send({message:'no se pudo agregar el producto'})
        }

        res.status(201).send({message:'producto agregado con exito'})
    }catch(err){
        console.log(err)
    }
});

router.delete('/:cid/products/:pid', async(req, res)=>{
    try{
        const cid = req.params.cid
        const pid = req.params.pid
        let respuesta = await cartsManager.deleteProductFromCart(cid,pid)
        if(!respuesta){
           return res.status(400).send({message:'no se pudo eliminar el producto del carrito'})
        }
        res.status(200).send({ status:`El producto ID:${pid} se ha eliminado del carrito`});
    }catch(err){
        console.log(err)
    }
})

router.put('/:cid/products/:pid', async(req, res)=>{
    try{
        const cid = req.params.cid
        const pid = req.params.pid
        const {cantidad}= req.body
        let respuesta = await cartsManager.modifyProductFromCart(cid, pid, cantidad)
        if(!respuesta){
           return res.status(400).send({message:'no se pudo modificar el producto del carrito'})
        }
        res.status(200).send({status:`El producto ID:${pid} se ha modificado`});
    }catch(err){
        console.log(err)
    }
})

module.exports= router;

