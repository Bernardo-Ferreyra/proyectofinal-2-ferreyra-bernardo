const { Router }= require('express')
const productsRouter= require('./products.route.js')
const cartRouter = require('./carts.route.js')
const viewsRouter = require('./views.route.js')
const router= Router()

router.use('/api/products', productsRouter)

router.use('/', viewsRouter)

router.use('/api/carts', cartRouter)



module.exports= router