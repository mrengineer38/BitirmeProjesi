const path = require('path');
const pgp = require('pg-promise')();

const yaml_config = require('node-yaml-config');
const config = yaml_config.load(path.resolve("configs")+"/config.yml");
const {logger} = require('../winstonLogger/winstonLogger.js');

const cn = {
    host: config.database.host,
    port: config.database.port,
    database: config.database.db,
    user: config.database.user,
    password: config.database.pass,
    max: config.database.max
};

var db = pgp(cn);


db.connect().then(res=>{
    logger.info(`Connected to the postgresql database: ${config.database.db}`);
}).catch(err=>{
    logger.error(`Couldn't connect to postgresql database: ${config.database.db}.`,{message:err.message});
})

module.exports = {db};