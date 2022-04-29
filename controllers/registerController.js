const jwt = require('jsonwebtoken');
const path = require('path');
const {logger} = require('../configs/winstonLogger/winstonLogger');

const yaml_config = require("node-yaml-config");
const config = yaml_config.load(path.resolve("configs")+"/config.yml");

function registerController(req,res){
//   const token = jwt.sign({name:"mehmethakan"}, config.jwt.secret, {expiresIn: config.jwt.expire, algorithm: 'HS256' });
  res.send("succesfully registred");
}

module.exports = {registerController}