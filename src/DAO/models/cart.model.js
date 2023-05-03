const { Schema, model }= require('mongoose')

const collection= 'carts'

const cartSchema = new Schema({
    products: [{
        idProduct: { type: String, required: true },
        cantidad: { type: Number, required: true },
        _id: false
    }]
})


const cartModel= model(collection, cartSchema)

module.exports = { cartModel }

