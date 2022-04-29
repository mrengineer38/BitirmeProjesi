const { db } = require('../configs/db/postgre-connection');
const {logger} = require('../configs/winstonLogger/winstonLogger');

async function tryToLogin(body) {
    let sql = "SELECT id, email, first_name, last_name, last_login FROM user_account WHERE email= $1 and pass=crypt( $2, pass);";
    let values = [body.email, body.password];
    let result;
    try {
        result = await db.oneOrNone(sql, values);
    } catch (error) {
        logger.error(`tryToLogin failed.`,{"file":__filename,message:error.message});
    }
    return result;
}



module.exports = {
    tryToLogin
}