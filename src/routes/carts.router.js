const {Router} = require('express')
const cartController = require('../controllers/cart.controller.js');
const router = Router()

router.post('/', cartController.createCart);

router.get('/', cartController.getCarts);

router.get('/:cid', cartController.getCartById);

router.delete('/:cid', cartController.emptyCart)

router.put('/:cid', cartController.modifyCart)

router.delete('/:cid/products/:pid', cartController.deleteProductFromCart)

router.put('/:cid/products/:pid', cartController.modifyProductFromCart)

router.post('/:cid/products/:pid', cartController.addToCart);

router.get('/:cid/purchase', cartController.generateTicket );



module.exports= router;

