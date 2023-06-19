const CartManagerMongo = require("../DAO/mongo/cart.mongo");
const ChatManagerMongo = require("../DAO/mongo/chat.mongo");
const ProductManagerMongo = require("../DAO/mongo/product.mongo");
const UserManagerMongo = require("../DAO/mongo/user.mongo");

const cartService = new CartManagerMongo()
const productService = new ProductManagerMongo()
const userService = new UserManagerMongo()
const chatService = new ChatManagerMongo()

module.exports = {
    cartService,
    productService,
    userService,
    chatService
    
}