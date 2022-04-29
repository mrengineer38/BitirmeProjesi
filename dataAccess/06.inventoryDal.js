const {db} = require('../configs/db/postgre-connection');
const {logger} = require('../configs/winstonLogger/winstonLogger');



async function getAll(){
    let sql = 'SELECT * FROM product_inventory'
    let result;
    try {
        result = await db.any(sql);
    } catch (error) {
        logger.error(`getAll failed.`,{"file":__filename,message:error.message});
    }
    return result;
  
}

async function getById(id){
    let sql = 'SELECT * FROM product_inventory WHERE id = $1'
    let result;
    try {
        result = await db.oneOrNone(sql,id); 
    } catch (error) {
        logger.error(`getById failed.`,{"file":__filename,message:error.message});
    }
    return  result;
}


async function create(body){
    let sql = "INSERT INTO product_inventory ( quantity ) VALUES($1) RETURNING *";
    let values = [body.quantity];
    let result;
    try {
        result = await db.oneOrNone(sql,values);
    } catch (error) {
        logger.error(`create failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function updateById(body){
    let sql = 'UPDATE product_inventory SET quantity = quantity + $1 WHERE id = $2 RETURNING *';
    let values = [body.quantity, body.id];
    let result;
    try {
        result = await db.oneOrNone(sql,values);
    } catch (error) {
        logger.error(`updateById failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function deleteById(body){
    let sql = 'DELETE FROM product_inventory WHERE id = $1 RETURNING *';
    let result;
    try {
        result = await db.oneOrNone(sql,body.id);
    } catch (error) {
        logger.error(`deleteById failed.`,{"file":__filename,message:error.message});
    }
    return result;
}


module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
}