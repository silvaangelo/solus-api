import * as bcrypt from 'bcryptjs';
import { User } from './models/User';
import { save, get } from './repositories/userRepository';

export const createBaseUser = async () => {
    const userFromDatabase = await get({email: 'admin@solus.com.br'});
    
    if (userFromDatabase) {
        return userFromDatabase;
    }
    
    const user = new User({
        name: 'Administrator',
        email: 'admin@solus.com.br',
        password: await bcrypt.hash('4dmin@solu5', 12)
    });

    await save(user);

    return user;
}