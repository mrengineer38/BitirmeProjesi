const {db} = require('../configs/db/postgre-connection');
const {logger} = require('../configs/winstonLogger/winstonLogger');



async function getAll(){
    let sql = 'SELECT * FROM user_account;'
    let result;
    try {
        result = await db.any(sql);
    } catch (error) {
        logger.error(`getAll failed.`,{"file":__filename,message:error.message});
    }
    return result;
  
}

async function getById(id){
    let sql = 'SELECT * FROM user_account WHERE id = $1;'
    let result;
    try {
        result = await db.oneOrNone(sql,id); 
    } catch (error) {
        logger.error(`getById failed.`,{"file":__filename,message:error.message});
    }
    return  result;
}


async function create(body){
    let sql = "INSERT INTO user_account(email, pass, first_name, last_name) VALUES($1, crypt($2, gen_salt('bf', 12)), $3, $4) RETURNING *";
    let values = [body.email, body.pass, body.first_name, body.last_name];
    let result;
    try {
        result = await db.oneOrNone(sql, values);
    } catch (error) {
        logger.error(`create failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function updateById(body){
    let sql = 'UPDATE user_account SET email = $1, first_name = $2, last_name = $3 WHERE id = $4 RETURNING *';
    let values = [body.email, body.first_name, body.last_name, body.id];
    let result;
    try {
        result = await db.oneOrNone(sql,values);
    } catch (error) {
        logger.error(`updateById failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function deleteById(body){
    let sql = 'DELETE FROM user_account WHERE id = $1 RETURNING *';
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