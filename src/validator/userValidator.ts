import { body, check } from 'express-validator/check'

const nameRule = body('name').exists().isString();
const emailRule = body('email').exists().isString().isEmail();
const passwordRule = body('password').isString().isLength({
  max: 16,
  min: 8
});
const idRule = check('id').exists().isMongoId();

export const createRules = [
  nameRule,
  emailRule,
  passwordRule.exists()
];

export const updateRules = [
  nameRule,
  emailRule,
  passwordRule.optional()
];

export const getRules = [
  idRule
];

export const loginRules = [
  emailRule,
  passwordRule.exists()
];
