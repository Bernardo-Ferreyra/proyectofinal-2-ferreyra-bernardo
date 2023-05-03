const { cartModel } = require('../models/cart.model.js')


class CartManagerMongo{

    async getCarts(){
        try{
            return await cartModel.find({})
        }catch(err){
            return new Error(err)
        }
    }

    async createCart(newCart){
        try{
            return await cartModel.create(newCart)
        }catch(err){
            return new Error(err)
        }
    }

    async getCartById(id){
        try{
            return await cartModel.findOne({_id: id});
        }catch(err){
            return new Error(err)
        }
    }

    async addToCart(cid, pid){
        try{
            const cart = await cartModel.findOne({_id: cid})
            const product = cart.products.find(producto => producto.idProduct === pid);
            if(!product){
                return await cartModel.updateOne(
                    {_id: cid},
                    { $push: { products: { idProduct: pid, cantidad: 15 } } }
                )
            }else{
                return await cartModel.updateOne(
                    {_id: cid, "products.idProduct": pid },
                    { $inc: { "products.$.cantidad": 2 } }
                )
            }
        }catch(err){
            return new Error(err)
        }
    }

}



module.exports = CartManagerMongo ;