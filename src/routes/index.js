const { Router }= require('express')
const productsRouter= require('./products.route.js')
const cartRouter = require('./carts.router.js')
const viewsRouter = require('./views.route.js')
const usersRouter= require('./users.router.js')
const { generateProducts } = require('../utils/generateProductsFaker.js')
const { logger } = require('../utils/logger.js')
const router= Router()

router.use('/api/products', productsRouter)

router.use('/', viewsRouter)

router.use('/api/carts', cartRouter)

router.use('/api/session', usersRouter)

router.get('/loggerTest', async(req, res) =>{
    // req.logger.fatal('alerta fatal')
    // req.logger.error('alerta error')
     req.logger.warning('alerta warning')
    // req.logger.info('alerta info')
    // req.logger.http('alerta http')
    //logger.debug('alerta debug')
    // req.logger.fatal('fatal error')
    
    res.send({message: 'Prueba de logger'})

})



module.exports= router