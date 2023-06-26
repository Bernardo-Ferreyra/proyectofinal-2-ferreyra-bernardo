const { ProductModel } = require('./models/product.model.js')

class ProductDaoMongo{
    constructor(){
        this.productModel = ProductModel
    }

/*     async getProducts(){
        try {
            return await this.productModel.find({}).lean()
        } catch (err) {
            return new Error(err)
        }
    } */

    async getProducts(limit ,page ,sortOptions){
        try{
            return await this.productModel.paginate({},{limit: limit , page: page, sort: sortOptions, leanWithId: false})
        }catch(err){
            return new Error(err)
        }
    }

    async createProduct(newProduct){
        try{
            return await this.productModel.create(newProduct)
        }catch(err){
            console.log(err);
        }
    }

    async getProductById(pid){
        try{
            return await this.productModel.findOne({_id: pid});
        }catch(err){
            console.log(err)
        }
    }

    async deleteProduct(pid){
        try{
            return await this.productModel.deleteOne({_id: pid});
        }catch(err){
            console.log(err)
        }
    }

    async updateProduct(pid, obj){
        try{
            return await this.productModel.updateOne({_id: pid}, obj);
        }catch(err){
            console.log(err)
        }
    }
}


module.exports = ProductDaoMongo ;