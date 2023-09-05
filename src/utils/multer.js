const multer = require('multer')
const fs = require('fs')
const { userService } = require('../services/Services')

const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        let uploadFolder = ''
        const uploadType = req.body.uploadType
        const userId = req.params.uid

        if (uploadType === 'profile') {
            uploadFolder = 'profiles'
        } else if (uploadType === 'product') {
            uploadFolder = 'products'
        } else if (uploadType === 'document') {
            uploadFolder = 'documents'
        }

        const userFolder = `${__dirname}/../files/${uploadFolder}/${userId}`
        
        // Crear la carpeta del usuario si no existe
        if (!fs.existsSync(userFolder)) {fs.mkdirSync(userFolder)}

        cb(null, userFolder)
    },
    filename: function(req, file, cb) {
        cb(null, `${file.originalname}`)
    }
})

const fileFilter = async function(req, file, cb) {
    const userId = req.params.uid;
    const userDB = await userService.getUserById(userId);

    if (!userDB) {
        cb(new Error('Usuario inexistente'), false);
    }else {
        const validDocumentNames = [
            'Identificacion',
            'Comprobante de domicilio',
            'Comprobante de estado de cuenta'
        ];
        const validExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];

        const uploadType = req.body.uploadType;
        if (uploadType === 'document') {
            const fileName = file.originalname.split('.');
            const fileBaseName = fileName.slice(0, -1).join('.');
            const fileExtension = `.${fileName.pop()}`;

            if (
                validDocumentNames.includes(fileBaseName) &&
                validExtensions.includes(fileExtension)
            ) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file name or extension for document upload'), false);
            }
        } else {
            cb(null, true);
        }
    }
}



const uploader = multer({
    storage,
    fileFilter,
    onError: function(err, next){
        console.log(err)
        next()
    }
})


module.exports = {
    uploader
}

