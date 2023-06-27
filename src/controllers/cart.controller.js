const { cartService } = require("../services/Services")

class CartController{

    createCart = async(req, res)=>{
        try{
            const newCart = {products:[]}
            await cartService.createCart(newCart)
            res.status(201).send({ message: 'Carrito creado correctamente'})
        }catch(err){
            console.log(err)
        }
    }

    getCarts = async (req, res) => {
        try{
            const limit = req.query.limit
            const carts = await cartService.getCarts();
            limit 
            ? res.status(201).send(carts.slice(0, limit)) 
            : res.status(201).send(carts);  
        } catch(err){
            console.log(err)
        }
    }

    getCartById = async(req, res)=>{
        try{
            const cid = req.params.cid;
            const cart = await cartService.getCartById(cid);
            if(!cart){
                res.status(404).send({ message: `El carrito con ID ${cid} no existe` })
            }
            res.status(201).send(cart)
        } catch(err){
            console.log(err)
        }
    }

    deleteCart = async(req, res)=>{
        try{
            const cid = req.params.cid
            let respuesta= await cartService.emptyCart(cid)
            if(!respuesta){
                return res.status(400).send({message:'no se pudo vaciar el carrito'})
            }
            res.status(200).send({message: 'Se ha vaciado el carrito'})
        }catch(err){
            console.log(err)
        }
    }

    deleteProductFromCart = async(req, res)=>{
        try{
            const cid = req.params.cid
            const pid = req.params.pid
            let respuesta = await cartService.deleteProductFromCart(cid,pid)
            if(!respuesta){
               return res.status(400).send({message:'no se pudo eliminar el producto del carrito'})
            }
            res.status(200).send({ status:`El producto ID:${pid} se ha eliminado del carrito`});
        }catch(err){
            console.log(err)
        }
    }

    modifyCart = async(req, res)=>{
        try{
            const cid = req.params.cid
            const newCart= req.body
            let respuesta= await cartService.modifyCart(cid, newCart)
            if(!respuesta){
                return res.status(400).send({message:'No se pudo modificar el carrito'})
            }
            res.status(200).send({message: 'Se ha modificado el carrito'})
        }catch(err){
            console.log(err)
        }
    }

    modifyProductFromCart = async(req, res)=>{
        try{
            const cid = req.params.cid
            const pid = req.params.pid
            const {cantidad}= req.body
            let respuesta = await cartService.modifyProductFromCart(cid, pid, cantidad)
            if(!respuesta){
               return res.status(400).send({message:'no se pudo modificar el producto del carrito'})
            }
            res.status(200).send({status:`El producto ID:${pid} se ha modificado`});
        }catch(err){
            console.log(err)
        }
    }

    addToCart = async(req, res)=>{
        try{
            const cid = req.params.cid
            const pid = req.params.pid
            const {cantidad}= req.body
            
            const addProduct= await cartService.addToCart(cid, pid, cantidad)
            if(!addProduct){
                res.status(400).send({message:'no se pudo agregar el producto'})
            }
    
            res.status(201).send({message:'producto agregado con exito'})
        }catch(err){
            console.log(err)
        }
    }

}


module.exports= new CartController()