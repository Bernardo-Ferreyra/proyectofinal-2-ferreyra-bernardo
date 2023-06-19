const mongoose = require('mongoose')

class MongoSingleton{
    static #instance
    constructor(){
        mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    static getInstance(){
        if(this.#instance){
            console.log('base de datos ya esta creada')
            return this.#instance
        }
        this.#instance =  new MongoSingleton()
        console.log('base de datos conectada')
        return this.#instance
    }
}

module.exports= {
    MongoSingleton
}