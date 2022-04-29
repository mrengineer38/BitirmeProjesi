const jwt = require('jsonwebtoken');
const path = require('path');
const {logger} = require('../configs/winstonLogger/winstonLogger');

const yaml_config = require("node-yaml-config");
const config = yaml_config.load(path.resolve("configs")+"/config.yml");

const loginDal = require('../dataAccess/15.loginDal');

async function loginController(req,res){
  const result = await loginDal.tryToLogin(req.body);
  if(result){
    const token = jwt.sign({name:"mehmethakan"}, config.jwt.secret, {expiresIn: config.jwt.expire, algorithm: 'HS256' });
    return res.status(200).json({...result, "token": token});
  }
  return res.status(404).json({response:"something went wrong!"})
  
  
}

module.exports = {loginController}