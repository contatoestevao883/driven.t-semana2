import ticketRepository from '@/repositories/tickets-repository.ts';
import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.findTicketTypes();

  return ticketTypes;
}

async function getTickets(id: number) {
  const user = await ticketRepository.getTicketByEnrollmentId(id);

  if (!user) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.getTicketById(id);

  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function postTickets(ticketTypeId: number, userId: number) {
  if (!ticketTypeId) {
    throw badRequestError();
  }

  const tickets = await ticketRepository.postTickets(ticketTypeId, userId);
  console.log(tickets);
  return tickets;
}

const ticketService = {
  getTicketTypes,
  getTickets,
  postTickets,
};

export default ticketService;
