const { Router }= require('express')
const productsRouter= require('./products.route.js')
const cartRouter = require('./carts.route.js')
const viewsRouter = require('./views.route.js')
const sessionRouter= require('./session.router.js')
const router= Router()

router.use('/api/products', productsRouter)

router.use('/', viewsRouter)

router.use('/api/carts', cartRouter)

router.use('/api/session', sessionRouter)

module.exports= router