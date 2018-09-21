import * as morgan from 'morgan'
import * as fs from 'fs'
import * as path from 'path'

const logPath = __dirname + '/../../storage/log/'

if(!fs.existsSync(logPath)) {
    fs.mkdirSync(path.dirname(logPath))
    fs.writeFileSync(logPath, {flags: 'wx'})
}

const accessLogStream = fs.createWriteStream(path.join(logPath, 'access.log'), {flags: 'a'})

export const logToConsole = morgan('dev')

export const logToFile = morgan('common', {
    stream: accessLogStream
})

