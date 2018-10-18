import '../db'
import { Router } from 'express'
import { create, list, get, update, remove } from '../actions/arduino'
import { createRules, updateRules, getRules } from '../validator/arduinoValidator';
import ensureAuthenticated from '../middlewares/check-authenticated'

const arduinoRouter = Router()

arduinoRouter.post('/', ensureAuthenticated, createRules, create);
arduinoRouter.get('/', ensureAuthenticated, list)
arduinoRouter.get('/:id', ensureAuthenticated, getRules, get)
arduinoRouter.post('/:id', ensureAuthenticated, updateRules, update)
arduinoRouter.delete('/:id', ensureAuthenticated, getRules, remove)

export default arduinoRouter
