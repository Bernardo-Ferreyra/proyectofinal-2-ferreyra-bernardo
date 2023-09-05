const {Router} = require('express')
const cartController = require('../controllers/cart.controller.js')
const { passportCall } = require('../middlewares/passportCall.js')
const { authorization } = require('../middlewares/authorizationjwtRole.js')
const router = Router()


router.get('/', cartController.getCarts)

router.get('/:cid', cartController.getCartById)

router.post('/', cartController.createCart)

router.post('/:cid/products/:pid',passportCall('current', {session: false}), authorization(['user','premium','admin']), cartController.addToCart)

router.post('/:cid/purchase',passportCall('current', {session: false}), authorization(['user','premium','admin']), cartController.generateTicket )

router.put('/:cid', cartController.modifyCart)

router.put('/:cid/products/:pid', cartController.modifyProductFromCart)

router.delete('/:cid', cartController.emptyCart)

router.delete('/:cid/products/:pid', cartController.deleteProductFromCart)


module.exports = router

