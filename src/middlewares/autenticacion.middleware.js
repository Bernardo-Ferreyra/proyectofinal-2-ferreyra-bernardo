function auth(req,res,next){
    if(req.session?.user?.first_name !== 'berni' || !req.session?.user?.admin === 'admin'){
        return res.status(401).send('error de autenticacion')
    }
    next()
}

module.exports= {auth}