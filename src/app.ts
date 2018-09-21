import './db';
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { logToFile } from './lib/http-logger'
import { logToConsole } from './lib/http-logger'
import arduinoRouter from './routes/arduinoRouter'
import measureRouter from './routes/measureRouter'
import RouteNotFoundMiddleware from './middlewares/not-found';
import errorHandlingMiddleware from './middlewares/error-handling'

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(logToFile)
app.use(logToConsole)

app.use('/api/arduino', arduinoRouter)
app.use('/api/measure', measureRouter)

app.use('*', RouteNotFoundMiddleware)
app.use(errorHandlingMiddleware)

export default app
