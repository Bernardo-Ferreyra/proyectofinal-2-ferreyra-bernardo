const winston = require('winston')
const configServer = require('../config/configServer')


const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http:4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'white',
        debug: 'white' 
    }
}

const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: './errors.log',
                level: 'error',
                format: winston.format.simple()
            })
        ]
    })
    
    const prodLogger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelOptions.colors}),
                    winston.format.simple()
                    )
                }),
                new winston.transports.File({
                    filename: './errors.log',
                    level: 'error',
                    format: winston.format.simple()
                })
            ]
        })
        
        let logger = configServer.mode == 'development' ? devLogger : prodLogger;
/* const createLogger = () => {
    if (configServer.mode === 'development') {
        return winston.createLogger({
            levels: customLevelOptions.levels,
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    format: winston.format.combine(
                        winston.format.colorize({ colors: customLevelOptions.colors }),
                        winston.format.simple()
                    )
                }),
                new winston.transports.File({
                    filename: './errors.log',
                    level: 'error',
                    format: winston.format.simple()
                })
            ]
        });
    } else if (configServer.mode === 'production') {
        return winston.createLogger({
            levels: customLevelOptions.levels,
            transports: [
                new winston.transports.Console({
                    level: 'info',
                    format: winston.format.combine(
                        winston.format.colorize({ colors: customLevelOptions.colors }),
                        winston.format.simple()
                    )
                }),
                new winston.transports.File({
                    filename: './errors.log',
                    level: 'error',
                    format: winston.format.simple()
                })
            ]
        });
    } 
}; */

/* const logger = createLogger() */
// middleware exports
const addLogger = (req, res, next) => {
    /* configServer.mode === 'development'? req.logger = devLogger : req.logger = prodLogger */
    req.logger = logger
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}


module.exports = {
    logger,
    addLogger
}


