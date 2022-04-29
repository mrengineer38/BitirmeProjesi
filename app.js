const express = require('express');
const expressJWT = require('express-jwt');
const fileUpload = require('express-fileupload');
const yaml_config = require('node-yaml-config');
const config = yaml_config.load(__dirname + '/configs/config.yml');
const routes = require('./routes/routes');
const cors = require('cors');

const {logger} = require('./configs/winstonLogger/winstonLogger');


const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({createParentPath:true}));
app.use(expressJWT({
    secret: config.jwt.secret,
    algorithms: config.jwt.algorithms
}).unless({path:[
    "/", "/api/login","/api/register",
    /^\/api\/.*/ /* full access */
]})
)

app.use("/api",routes)

app.listen(config.server.port,()=>{
    logger.info(`Server listening at port: http://localhost:${config.server.port}`)
})