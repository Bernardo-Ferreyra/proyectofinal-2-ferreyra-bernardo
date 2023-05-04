const { chatModel } = require('../models/chat.model.js')

class ChatManagerMongo{
    async saveMessages(data){
        try{
            return await chatModel.create(data)
        }catch(err){
            throw new Error(err);
        }
    }

    async getMessages(){
        try{
            return await chatModel.find({})
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = ChatManagerMongo ;