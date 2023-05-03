const { chatModel } = require('../models/chat.model.js')

class ChatManagerMongo{
    async saveMessage(data){
        try{
            return await chatModel.create(data)
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = ChatManagerMongo ;