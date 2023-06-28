const { commander } = require('../utils/commander')
const { MongoSingleton } = require('../utils/sinlgeton')
const dotenv = require('dotenv')

const { mode } = commander.opts()
dotenv.config({
    path: mode === 'development' ? './.env.development': './.env.production'
})


module.exports={
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    connectDb: async()=> await MongoSingleton.getInstance()
}