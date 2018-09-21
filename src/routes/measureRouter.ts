import '../db'
import { Router } from 'express'
import { create } from '../actions/measure'
import { createRules } from '../validator/measureValidator'

const measureRouter = Router()

measureRouter.post('/', createRules, create)

export default measureRouter