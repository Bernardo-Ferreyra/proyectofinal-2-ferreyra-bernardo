const { ProductModel } = require('../models/product.model.js')


class ProductManagerMongo{
    constructor(){
        this.productModel = ProductModel
    }

    async getProducts(){
        try {
            return await this.productModel.find({}).lean()
        } catch (err) {
            return new Error(err)
        }
    }

    async getProductsPaginate(limit ,page ,sortOptions){
        try{
            return await this.productModel.paginate({},{limit: limit , page: page, sort: sortOptions, lean:true})
        }catch(err){
            return new Error(err)
        }
    }

    async addProduct(newProduct){
        try{
            return await this.productModel.create(newProduct)
        }catch(err){
            throw new Error(err);
        }
    }

    async getProductById(pid){
        try{
            return await this.productModel.findOne({_id: pid});
        }catch(err){
            return new Error(err)
        }
    }

    async deleteProduct(pid){
        try{
            return await this.productModel.deleteOne({_id: pid});
        }catch(err){
            return new Error(err)
        }
    }

    async updateProduct(pid, obj){
        try{
            return await this.productModel.updateOne({_id: pid}, obj);
        }catch(err){
            return new Error(err)
        }
    }
}


module.exports = ProductManagerMongo ;