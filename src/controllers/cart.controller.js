const { cartService, productService } = require("../services/Services")
const { v4: uuidv4 } = require('uuid');
class CartController{

    createCart = async(req, res)=>{
        try{
            const newCart = {products:[]}
            const result = await cartService.createCart(newCart)
            res.status(201).send({ status: 'success', payload: result})
        }catch(err){
            console.log(err)
        }
    }

    getCarts = async (req, res) => {
        try{
            const carts = await cartService.getCarts()
            res.status(201).send({status:'success', payload: carts});  
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
            res.status(201).send({status: 'success', payload: cart})
        } catch(err){
            console.log(err)
        }
    }

    emptyCart = async(req, res)=>{
        try{
            const cid = req.params.cid
            let respuesta= await cartService.emptyCart(cid)
            if(!respuesta){
                return res.status(400).send({message:'no se pudo vaciar el carrito'})
            }
            res.status(200).send({status: 'success', payload: respuesta})
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
            res.status(200).send({ status:`El producto ID:${pid} se ha eliminado del carrito`, payload: respuesta});
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
            res.status(200).send({message: 'Se ha modificado el carrito', payload: respuesta})
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
            res.status(200).send({status:`El producto ID:${pid} se ha modificado`, payload: respuesta});
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
    
            res.status(201).send({message:'success', payload: addProduct})
        }catch(err){
            console.log(err)
        }
    }

    generateTicket = async (req, res)=>{
        try {
            const cid = req.params.cid
            const cart = await cartService.getCartById(cid)
            const productsWithoutStock = [];

            for (const item of cart.products) {
                let stock = item.product.stock;
                let pid = item.product._id
                if (stock >= item.cantidad) {
                    item.product.stock -= item.cantidad;
                    await productService.updateProduct(pid, item.product)
                } else {
                    productsWithoutStock.push(item);
                }
                
            }

            const purchasedProducts = cart.products.filter(item =>
                !productsWithoutStock.some(p => p.product._id === item.product._id));

            if (purchasedProducts.length > 0) {
                const ticket = {
                    code: uuidv4(),
                    purchase_datetime: new Date(),
                    amount: purchasedProducts.reduce((total, item) => total + (item.cantidad * item.product.price), 0),
                    purchaser: 'usuarioasddsd'
                };
        
                const createdTicket = await cartService.generateTicket(ticket);
        
                cart.products = productsWithoutStock;
                await cartService.modifyCart(cid, productsWithoutStock );
        
                res.status(201).send({ message: 'Compra realizada exitosamente', ticket: createdTicket });
            } else {
                const productsWithoutStockIds = productsWithoutStock.map(item => item.product._id);
                res.status(200).send({message: 'La compra no se pudo completar', payload: productsWithoutStockIds});
            }
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports= new CartController()