import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import CreateSessionService from './CreateSessionService'
import AppError from '@shared/errors/AppError'

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticateUser = new CreateSessionService(fakeUsersRepository, fakeHashProvider)
    const user = await createUser.execute({
      name: 'Abilio Coelho',
      email: 'abiliocoelho@gmail.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'abiliocoelho@gmail.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticateUser = new CreateSessionService(fakeUsersRepository, fakeHashProvider)
    await createUser.execute({
      name: 'Abilio Coelho',
      email: 'abiliocoelho@gmail.com',
      password: '123456'
    })

    expect(authenticateUser.execute({
      email: 'abiliocoelho@gmail.com',
      password: 'sssss'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authenticateUser = new CreateSessionService(fakeUsersRepository, fakeHashProvider)

    expect(authenticateUser.execute({
      email: 'mateuscoelho@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

})
