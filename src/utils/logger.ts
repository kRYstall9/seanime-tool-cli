import chalk from 'chalk';
import winston from 'winston';
import path from 'path';
import fs from 'fs-extra';
import dayjs from 'dayjs';
import { LOG_DIR } from '@config/constants';
import { getHyperLink } from './cli-utils';


fs.ensureDirSync(LOG_DIR);
const logFilePath = path.join(LOG_DIR, `${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.log`)

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({level, message, timestamp}):string => `[${timestamp}] [${level.toUpperCase()}] ${message}`)
    ),
    transports: [
        new winston.transports.File({filename: logFilePath, level: 'error'}),
        new winston.transports.Console({
            format: winston.format.printf(({level, message}):string =>{
                if (level === 'info') return chalk.blue('ℹ') + ' ' + message;
                if (level === 'error') return chalk.red('✖') + ' ' + `An error occured. Check the logs at ${chalk.cyan.underline(getHyperLink(logFilePath))} for more information`;
                if (level === 'warn') return chalk.yellow('⚠') + ' ' + message;
                return chalk.green('✔') + ' ' + message;
            })
        })
    ]
});