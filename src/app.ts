import './env';
import './db';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { logToConsole } from './lib/http-logger';
import arduinoRouter from './routes/arduinoRouter';
import measureRouter from './routes/measureRouter';
import statisticRouter from './routes/statisticRouter';
import RouteNotFoundMiddleware from './middlewares/not-found';
import errorHandlingMiddleware from './middlewares/error-handling';
import userRouter from './routes/userRouter';
import * as cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(logToFile);
app.use(logToConsole);

app.use('/api/arduino', arduinoRouter);
app.use('/api/measure', measureRouter);
app.use('/api/statistic', statisticRouter);
app.use('/api/user', userRouter);

app.use('*', RouteNotFoundMiddleware);
app.use(errorHandlingMiddleware);

export default app;
