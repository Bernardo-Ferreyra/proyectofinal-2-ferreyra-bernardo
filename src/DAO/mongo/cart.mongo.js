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

    async getCartById(cid){
        try{
            return await cartModel.findOne({_id: cid}).lean();
        }catch(err){
            console.log(err)
        }
    }

    async addToCart(cid, pid, cantidad){
        try{
            const respUpdate= await cartModel.findOneAndUpdate(
                {_id: cid,"products.product": pid},
                { $inc: { "products.$.cantidad": cantidad } },
                {new:true}
            )
            if(respUpdate){
                return respUpdate
            }

            return await cartModel.findOneAndUpdate(
                {_id: cid},
                { $push: { products: { product: pid, cantidad} } },
                {new:true, upsert:true}
            )
        }catch(err){
            console.log(err)
        }
    }


    async deleteProductFromCart(cid, pid){
        try{
            return await cartModel.findOneAndUpdate(
                {_id:cid},
                {$pull: {products:{product:pid}}},
                {new:true}
            )
        }catch(err){
            console.log(err)
        }
    }

    async emptyCart(cid){
        try{
            return await cartModel.findOneAndUpdate(
                {_id:cid},
                {$set: {products:[]}},
                {new:true}
            )
        }catch(err){
            console.log(err)
        }
    }

    async modifyProductFromCart(cid, pid, cantidad){
        try{
            return await cartModel.findOneAndUpdate(
                {_id: cid,"products.product": pid},
                { $set: { "products.$.cantidad": cantidad } },
                {new:true}
            )
        }catch(err){
            console.log(err)
        }
    }


    async modifyCart(cid, newCart){
        try{
            return await cartModel.findOneAndUpdate(
                {_id:cid},
                {$set: {products: newCart}},
                {new:true}
            )
        }catch(err){
            console.log(err)
        }
    }
}



module.exports = CartManagerMongo ;