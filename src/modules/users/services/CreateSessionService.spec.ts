import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'
import CreateSessionService from './CreateSessionService'
import AppError from '@shared/errors/AppError'

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsersRepository)
    const authenticateUser = new CreateSessionService(fakeUsersRepository)
    await createUser.execute({
      name: 'Abilio Coelho',
      email: 'abiliocoelho@gmail.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'abiliocoelho@gmail.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
  })

  it('should not be able to authenticate with undefined email', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsersRepository)
    const authenticateUser = new CreateSessionService(fakeUsersRepository)
    await createUser.execute({
      name: 'Abilio Coelho',
      email: 'abiliocoelho@gmail.com',
      password: '123456'
    })

    expect(authenticateUser.execute({
      email: 'mateuscoelho@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

})
