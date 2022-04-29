const {createLogger, transports, format} = require('winston');
const {json,timestamp,combine,colorize,align,printf} = format


const logger = createLogger({
    format:combine(
        colorize(),
        timestamp(),
        align(),
        json(),
        printf((info)=>{
            const {timestamp, level, message , ...args}  = info;
            const ts = timestamp.slice(0, 19).replace('T', ' ');
            return `${ts} [${level}]: ${message} ${Object.keys(args).length ? "\t\t details:"+JSON.stringify(args, null, 0) : ''}`;
        })
    ),
    transports:[
        new transports.File({filename: 'system.log'}),
        new transports.Console(),
    ]
})

module.exports = {logger}