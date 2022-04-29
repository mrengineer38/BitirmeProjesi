const {db} = require('../configs/db/postgre-connection');
const {logger} = require('../configs/winstonLogger/winstonLogger');



async function getAll(){
    let sql = 'SELECT * FROM sepet'
    let result;
    try {
        result = await db.any(sql);
    } catch (error) {
        logger.error(`getAll failed.`,{"file":__filename,message:error.message});
    }
    return result;
  
}

async function getById(body){
    let sql = 'SELECT * FROM sepet WHERE card_owner = $1'
    let result;
    try {
        result = await db.any(sql,body.card_owner); 
    } catch (error) {
        logger.error(`getById failed.`,{"file":__filename,message:error.message});
    }
    return  result;
}

async function create(body){
    let cardItem = await isExists(body.product_id,body.card_owner);
    if(cardItem){
        return await updateCount(body);
    }
    let sql = "INSERT INTO sepet ( card_owner, product_id, quantity, title, descript,  price, discount_id  ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    let values = [body.card_owner, body.product_id, body.quantity, body.title, body.descript, body.price, body.discount_id ];
    let result;
    try {
        result = await db.oneOrNone(sql,values);
    } catch (error) {
        logger.error(`create failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function updateCount(body){
    let updateSql;
    if(body.quantity <0){
        return null;
    } 
    if(body.quantity ==1){
        updateSql = 'UPDATE sepet SET quantity= quantity + $1, price=$2 WHERE product_id = $3 AND card_owner = $4 RETURNING *';
    }
    if(body.quantity >1){
        updateSql = 'UPDATE sepet SET quantity= $1, price=$2 WHERE product_id = $3 AND card_owner = $4 RETURNING *';
    }
    let updateValues = [body.quantity, body.price, body.product_id, body.card_owner];
    let updateResult;
    try {
        updateResult = await db.oneOrNone(updateSql,updateValues);
    } catch (error) {
        logger.error(`updateCount failed.`,{"file":__filename,message:error.message});
    }
    return updateResult;
}



async function isExists(product_id, card_owner){
    let sql = "SELECT * FROM sepet WHERE product_id = $1 and card_owner = $2";
    let values = [product_id, card_owner];
    let result;
    try {
        result = await db.oneOrNone(sql,values)
    } catch (error) {
        logger.error(`isExists failed.`,{"file":__filename,message:error.message});
    }
    return result;
}



async function deleteById(body){
    let sql = 'DELETE FROM sepet WHERE product_id = $1 AND card_owner = $2 RETURNING *';
    let values = [body.product_id,body.card_owner]
    let result;
    try {
        result = await db.oneOrNone(sql,values);
    } catch (error) {
        logger.error(`deleteById failed.`,{"file":__filename,message:error.message});
    }
    return result;
}


module.exports = {
    create,
    getAll,
    getById,
    deleteById
}