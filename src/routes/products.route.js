const {Router} = require('express')
const { passportCall } = require('../middlewares/passportCall.js');
const { authorization } = require('../middlewares/authorizationjwtRole.js')
const productController = require('../controllers/product.controller.js')
const router = Router()

router.get('/mockingproducts', productController.generateProductsMock)

router.get('/', productController.getProducts)

router.get('/:pid', productController.getProductById)

router.post('/' ,passportCall('current', {session: false}), authorization(['admin', 'premium']), productController.createProduct)

router.put('/:pid',passportCall('current', {session: false}), authorization(['admin', 'premium']), productController.updateProduct)

router.delete('/:pid',passportCall('current', {session: false}), authorization(['admin', 'premium']), productController.deleteProduct)


module.exports= router;


