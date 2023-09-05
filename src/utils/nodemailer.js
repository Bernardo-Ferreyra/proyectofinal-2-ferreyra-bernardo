const nodemailer = require('nodemailer')
const configServer = require('../config/configServer')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port:587,
    auth:{
        user: configServer.gmail_user_app,
        pass: configServer.gmail_pass_app
    }
})

exports.sendMail = async (body)=>{
    return await transport.sendMail({
        from: 'COMPRA REALIZADA<bernii.ferreyra@gmail.com>',
        to: `${body.purchaser}`,
        subject:'Gracias por realizar la compra',
        html:`<div>
        <h1>Tu compra ha sido completada con exito</h1>
        <p>Codigo: ${body.code} </p>
        <p>Total: ${body.amount}$ </p>
        </div>`
    })
}

exports.sendResetPassMail = async (user,resetLink)=>{
    return await transport.sendMail({
        from: 'RESET PASSWORD<bernii.ferreyra@gmail.com>',
        to: user.email,
        subject:'reset password',
        html:`<div>
        <h1>Hola ${user.first_name},</h1>
        <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
        <p>Para continuar con el proceso, haz clic en el siguiente enlace:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>El enlace expirará después de 1 hora.</p>
        </div>`
    })
}

exports.sendMailDeletedUser = async (user)=>{
    return await transport.sendMail({
        from: 'USUARIO ELMINADO POR INACTIVIDAD<bernii.ferreyra@gmail.com>',
        to: user.email ,
        subject:'usuario eliminado por inactividad',
        html:`<div>
        <h1>Tu usuario ha sido eliminado debido al periodo de inactividad!</h1>
        <p>Estimado ${user.first_name} su cuenta ha sido eliminada debido al periodo de inactividad</p>
        </div>`
    })
}

exports.sendMailDeletedProduct = async (product, user)=>{
    return await transport.sendMail({
        from: 'PRODUCTO ELIMINADO<bernii.ferreyra@gmail.com>',
        to: 'bernii.ferreyra@gmail.com'/* product.owner */,
        subject:'se ha eliminado un producto',
        html:`<div>
        <h1>Se ha eliminado un producto de tu propiedad!</h1>
        <p>estimado ${product.owner} El producto "${product.title}" se ha elminado de la base de datos</p>
        </div>`
    })
}