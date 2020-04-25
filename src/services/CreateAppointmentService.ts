import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.finByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentService;
