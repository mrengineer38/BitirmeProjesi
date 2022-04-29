const imagesDal = require('../dataAccess/09.imagesDal');
const { logger } = require('../configs/winstonLogger/winstonLogger');

async function getAllImages(req, res) {
    let result = await imagesDal.getAll();
    if (result == null || result == undefined) {
        logger.error(`getAllImages failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({ response: "something went wrong!" })
    }
    res.status(200).json(result);
}

async function getByImageId(req, res) {

    let result = await imagesDal.getById(req.params.id);
    if (result == null || result == undefined) {
        logger.error(`getByImageId failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({ response: "something went wrong!" })
    }
    res.status(200).json(result);
}

async function getByProductId(req, res) {
    let result = await imagesDal.getProductImages(req.params.id);
    if (result == null || result == undefined) {
        logger.error(`getAllImages failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({ response: "something went wrong!" })
    }
    res.status(200).json(result);
}

async function createImage(req, res) {

    const maxuploadsize = 1048576; // 1 mb upload size
    if (!req.files) {
        return res.status(404).json({ response: "image(s) not found" })
    }

    const id =req.body.product_id
    let counter = 0
    req.files.forEach((image) => {
        if (image.size > maxuploadsize) {
            logger.error(`maximum upload size exceeded, max upload size could be <= 1MB`,{"file":__filename,message:error.message});
            counter++;
        }
    });

    if(counter>0){
        return res.status(404).json({ response: "maximum upload size exceeded, max upload size could be <= 1MB" })
    }

    let bool = true
    req.files.forEach(async(image)=>{
        const base64Image = image.buffer.toString('base64');
        const result = await imagesDal.create(id, image.originalname, base64Image)
        if (result == null || result == undefined) {
            logger.error(`createImage failed.`, { "file": __filename, message: "query error" });
            bool = false;
        }
    });
    if(!bool){
        return res.status(404).json({ response: "something went wrong!" })
    }
    return res.status(201).json({ response: "file uploaded succesfull" });

     
}


async function deleteImage(req, res) {

    let result = await imagesDal.deleteById(req.body.image_id);
    if (result == null || result == undefined) {
        logger.error(`deleteImage failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({ response: "something went wrong!" })
    }
    res.status(200).json(result);
}

async function deleteProductImages(req, res) {

    let result = await imagesDal.deleteProductImages(req.body.product_id);
    if (result == null || result == undefined) {
        logger.error(`deleteProductImages failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({ response: "something went wrong!" })
    }
    res.status(200).json(result);
}


module.exports = {
    create: createImage,
    delete: deleteImage,
    getAll: getAllImages,
    getById: getByImageId,
    getByProductId: getByProductId,
    deleteProductImages: deleteProductImages
}