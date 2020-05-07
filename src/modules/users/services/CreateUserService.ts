import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository'

interface Request {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  constructor(private usersRepository: IUsersRepository) { }
  public async execute({ name, email, password }: Request): Promise<User> {

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
