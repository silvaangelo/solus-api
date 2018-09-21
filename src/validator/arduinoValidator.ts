import { body, check } from 'express-validator/check'

const nameRule = body('name').exists().isString()
const locationRule = body('location').exists().isString()
const idRule = check('id').exists().isMongoId()

export const createRules = [
  nameRule,
  locationRule
]

export const updateRules = [
  nameRule,
  locationRule,
  idRule
]

export const getRules = [
  idRule
]
