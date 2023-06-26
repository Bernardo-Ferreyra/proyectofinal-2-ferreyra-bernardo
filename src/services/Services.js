const { 
    ProductDao 
} = require("../DAO/factory");
const ProductRepository = require('../repositories/product.repository.js')


const CartManagerMongo = require("../DAO/mongo/cart.mongo");
const ChatManagerMongo = require("../DAO/mongo/chat.mongo");
const UserManagerMongo = require("../DAO/mongo/user.mongo");


const cartService = new CartManagerMongo()
const productService = new ProductRepository(new ProductDao())
const userService = new UserManagerMongo()
const chatService = new ChatManagerMongo()

module.exports = {
    cartService,
    productService,
    userService,
    chatService
    
}