const {db} = require('../configs/db/postgre-connection');
const {logger} = require('../configs/winstonLogger/winstonLogger');

/* admin_type table crud */

async function getAll(){
    let sql = 'SELECT * FROM admin_type;'
    let result;
    try {
        result = await db.any(sql);
    } catch (error) {
        logger.error(`getAll failed.`,{"file":__filename,message:error.message});
    }
    return result;
  
}
// getAllAdminTypes();

async function getById(id){
    let sql = 'SELECT * FROM admin_type WHERE id = $1;'
    let result;
    try {
        result = await db.oneOrNone(sql,id); 
    } catch (error) {
        logger.error(`getById failed.`,{"file":__filename,message:error.message});
    }
    return  result;
}


async function create(body){
    let sql = 'INSERT INTO admin_type(admin_type, permission) VALUES($1, $2) RETURNING *';
    let values = [body.admin_type, body.permission];
    let result;
    try {
        result = await db.oneOrNone(sql, values);
    } catch (error) {
        logger.error(`create failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function updateById(body){
    let sql = 'UPDATE admin_type SET admin_type = $1, permission = $2 WHERE id = $3 RETURNING *';
    let values = [body.admin_type, body.permission, body.id];
    let result;
    try {
        result = await db.oneOrNone(sql,values);
    } catch (error) {
        logger.error(`updateById failed.`,{"file":__filename,message:error.message});
    }

    return result;
}

async function deleteById(body){
    let sql = 'DELETE FROM admin_type WHERE id = $1 RETURNING *';
    let result;
    try {
        result = await db.oneOrNone(sql,body.id);
    } catch (error) {
        logger.error(`deleteById failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

// updateAdminTypeById('7a4103bb-e4a6-4ad4-a85f-3aba0ecd3ac5')
// createAdminType({admin_type:"beta-tester",permission:"crud"});


module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
}