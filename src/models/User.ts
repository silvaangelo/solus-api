import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

export interface IUserModel extends IUser, Document {
  
}

export var UserSchema: Schema = new Schema({
  email: String,
  name: String,
  password: String,
  createdAt: Date,
  updatedAt: Date
});

UserSchema.virtual('id').get(function(this: IUserModel) {
  return this._id;
});

UserSchema.pre<IUserModel>('save', function(next) {
  const now = new Date();

  if(!this.createdAt) {
    this.createdAt = now;
  }

  this.updatedAt = now;

  next();
})

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
