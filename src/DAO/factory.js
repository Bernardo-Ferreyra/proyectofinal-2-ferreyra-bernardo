const { connectDb } = require ('../config/configServer.js') 
let ProductDao


switch ('MONGO') {
    case 'MONGO':
        //coneccion
        connectDb()
        const ProductDaoMongo = require ('./mongo/product.mongo.js')
        ProductDao = ProductDaoMongo

        break;
        
    case 'FILE':
        const ProductDaoFile = require ('./fileSystem/product.file.js')
        ProductDao = ProductDaoFile
    
        break;

    case 'MEMORY':
        const ProductDaoMemory = require ('./memory/product.memory.js')
        ProductDao = ProductDaoMemory
    
        break;

    default:
        break;
}

module.exports = {
    ProductDao
}