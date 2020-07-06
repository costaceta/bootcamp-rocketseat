import Appointment from "../models/Appointment";
import { isEqual } from 'date-fns'

// DTO: Data transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    // Initial state
    this.appointments = [];
  }

  public all(): Appointment[] {
    const appointementAll = this.appointments;

    return appointementAll;
  }

  public findByDate( date: Date ): Appointment | null {
   const findAppointment = this.appointments.find( appointment =>
      isEqual( date, appointment.date )
    )

    return findAppointment || null
  }

  public create({ provider, date }: CreateAppointmentDTO ): Appointment {

    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
