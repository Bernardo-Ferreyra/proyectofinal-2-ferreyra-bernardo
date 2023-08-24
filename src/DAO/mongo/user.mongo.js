const { logger } = require("../../utils/logger");
const { UserModel } = require("./models/user.model");

class UserManagerMongo{
    constructor(){
        this.userModel= UserModel
    }

    async getUser(email){
        try{
            return await this.userModel.findOne(email)
        }catch(err){
            return new Error(err)
        }
    }   
    
    async createUser(newUser){
        try{
            return await this.userModel.create(newUser)
        }catch(err){
            return new Error(err)
        }
    }

    async getUserById(uid){
        try {
            return await this.userModel.findOne({_id: uid})
        } catch (error) {
            logger.error(error)
        }
    }

    async updateUser(uid, updateData){
        try {
            return await this.userModel.updateOne({ _id: uid }, { $set: updateData })
        } catch (error) {
            logger.error(error)
        }
    }

    async getAllUsers(){
        try{
            return await this.userModel.find({}).lean()
        }catch(err){
            return new Error(err)
        }
    }

}

module.exports= UserManagerMongo