import '../db'
import { Router } from 'express'
import { create, list, get, update, remove, login } from '../actions/user'
import { createRules, updateRules, getRules, loginRules } from '../validator/userValidator';
import ensureAuthenticated from '../middlewares/check-authenticated';

const userRouter = Router()

userRouter.post('/login', loginRules, login);
userRouter.get('/:id', ensureAuthenticated, getRules, get);
userRouter.post('/:id', ensureAuthenticated, updateRules, update);
userRouter.delete('/:id', ensureAuthenticated, getRules, remove);
userRouter.post('/', ensureAuthenticated, createRules, create);
userRouter.get('/', ensureAuthenticated, list);

export default userRouter
