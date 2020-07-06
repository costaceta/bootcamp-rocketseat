import { Router, response } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService"

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

/**
 * Responsabilidade da Rota:
 *
 * Receber a requisição, chamar outro arquivo, devolver uma resposta
 */

/**
 * List
 */
appointmentsRouter.get("/", ( request, response ) => {
  const appointments = appointmentsRepository.all();

  return response.json( appointments )
})

/**
 * Create
 */
appointmentsRouter.post("/", ( request, response ) => {

  try {

    const { provider, date } = request.body;

    const parsedDate = parseISO( date ) // Transformação de dados

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate
    })

    return response.json( appointment );

  } catch (err) {
    return response.status(400).json({ error: err.message })
  }

});

export default appointmentsRouter;
