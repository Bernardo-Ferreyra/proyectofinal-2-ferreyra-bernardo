const { productModel } = require('../models/product.model.js')


class ProductManagerMongo{
    async getProducts(){
        try{
            return await productModel.find({}).lean()
        }catch(err){
            return new Error(err)
        }
    }

    async addProduct(newProduct){
        try{
            return await productModel.create(newProduct)
        }catch(err){
            throw new Error(err);
        }
    }

    async getProductById(pid){
        try{
            return await productModel.findOne({_id: pid});
        }catch(err){
            return new Error(err)
        }
    }

    async deleteProduct(pid){
        try{
            return await productModel.deleteOne({_id: pid});
        }catch(err){
            return new Error(err)
        }
    }

    async updateProduct(pid, obj){
        try{
            return await productModel.updateOne({_id: pid}, obj);
        }catch(err){
            return new Error(err)
        }
    }
}


module.exports = ProductManagerMongo ;