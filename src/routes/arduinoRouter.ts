import '../db'
import { Router } from 'express'
import { create, list, get, update, remove } from '../actions/arduino'
import { createRules, updateRules, getRules } from '../validator/arduinoValidator';

const arduinoRouter = Router()

arduinoRouter.post('/', createRules, create);
arduinoRouter.get('/', list)
arduinoRouter.get('/:id', getRules, get)
arduinoRouter.post('/:id', updateRules, update)
arduinoRouter.delete('/:id', getRules, remove)

export default arduinoRouter
