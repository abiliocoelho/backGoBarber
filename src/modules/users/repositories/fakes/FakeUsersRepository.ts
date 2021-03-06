import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []
  public async findById(id: string): Promise<User | undefined> {
    const finduser = this.users.find(user => user.id === id)
    return finduser
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const finduser = this.users.find(user => user.email === email)
    return finduser
  }
  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: uuid() }, userData)
    this.users.push(user)
    return user
  }
  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(findUser => findUser.id === user.id)
    this.users[index] = user
    return user
  }
}
export default FakeUsersRepository;
