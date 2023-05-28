const passport = require('passport')
const { userModel } = require('../DAO/models/user.model')
const GithubStrategy = require('passport-github2')
require('dotenv').config()


//GITHUB
const initPassportGithub = ()=>{
    passport.use('github', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID ,
        clientSecret:process.env.GITHUB_CLIENT_SECRET ,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
           let user= await userModel.findOne({email: profile._json.email})
           if(!user){
            
            let newUser= {
                first_name: profile.username,
                last_name: profile.username,
                email: profile._json.email,
                date_of_birth: profile._json.created_at,
                username: profile._json.name,
                password: ' '
            }
            let result= await userModel.create(newUser)
            return done(null, result)
           }
           return done(null, user)
        } catch (error) {
            console.log(error)
        }
    }))
    
    passport.serializeUser((user, done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let user= await userModel.findOne({_id:id})
        done(null, user)
    })
}




module.exports = {
    initPassportGithub
}
