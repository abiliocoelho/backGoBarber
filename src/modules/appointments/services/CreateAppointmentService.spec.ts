import AppError from '@shared/errors/AppError'
import FakeAppointsmentRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointsmentRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
    })
    expect(appointment).toHaveProperty('id')
  })
  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointsmentRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)

    const appointmentDate = new Date(2020, 4, 10, 11)
    await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123'
    })
    expect(createAppointment.execute({
      date: new Date(),
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(AppError)
  })
})
