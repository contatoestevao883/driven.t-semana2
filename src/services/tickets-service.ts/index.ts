import ticketRepository from '@/repositories/tickets-repository.ts';
import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.findTicketTypes();

  return ticketTypes;
}

async function getTickets(id: number) {
  const user = await ticketRepository.getTicketByEnrollmentId(id);

  if (!user) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.getTicketById(user.id);

  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function createTicket(ticketTypeId: number, userId: number) {
  if (!ticketTypeId) {
    throw badRequestError();
  }

  const user = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!user) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.postTickets(ticketTypeId, user.id);

  if (ticket === null) {
    throw notFoundError();
  }

  return ticket;
}

const ticketService = {
  getTicketTypes,
  getTickets,
  createTicket,
};

export default ticketService;
