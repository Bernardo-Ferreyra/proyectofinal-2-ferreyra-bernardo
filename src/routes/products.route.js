const {Router} = require('express')
const productController = require('../controllers/product.controller.js')
const router = Router()

router.get('/', productController.getProducts);

router.post('/' , productController.createProduct);

router.get('/:pid', productController.getProductById);

router.put('/:pid', productController.updateProduct);

router.delete('/:pid', productController.deleteProduct);



module.exports= router;


