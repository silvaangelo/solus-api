import { User, IUserModel } from '../models/User'
import { ResourceNotFoundError } from '../exceptions/ResourceNotFoundError'

export const update = async (id: string, user: IUserModel) => {
  const userFromDatabase = await get({
    _id: id
  });

  let data: any = {
    name: user.name,
    email: user.email
  };

  if(user.password) {
    if(user.password.length > 0) {
      data.password = user.password;
    }
  }

  userFromDatabase.set(data);

  return save(userFromDatabase);
}

export const save = async (user: IUserModel, id: string = null) => {
  if(id) {
    return await update(id, user);
  }

  await user.save();

  return user
}

export const list = async () => await User.find({}).exec()

export const get = async (params: object) => {
  let user = await User.findOne(params).exec()

  if(!user) {
    throw new ResourceNotFoundError(`Cannot found register '${JSON.stringify(params)}' for User.`);
  }

  return user
}

export const remove = async (id) => {
  const user = await get({
    _id: id
  });

  if(!user) {
    throw new ResourceNotFoundError(`Cannot found register '${id}' for User.`);
  }

  return await user.remove()  
}