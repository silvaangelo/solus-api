import '../db'
import { Router } from 'express'
import { get } from '../actions/statistics'
import ensureAuthenticated from '../middlewares/check-authenticated';

const statisticRouter = Router()

statisticRouter.get('/:arduinoId', ensureAuthenticated, get)

export default statisticRouter