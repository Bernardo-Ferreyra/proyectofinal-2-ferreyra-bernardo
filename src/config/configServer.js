const { connect } = require('mongoose')


module.exports={
    jwt_secret_key: 'palabrasecreta',
    connectDb: ()=>{
        connect('mongodb+srv://berniiferreyra:Felipeyara338@cluster0.d9ot40r.mongodb.net/?retryWrites=true&w=majority')
        console.log('base de datos conectada')
    }
}