import { prisma } from '@/config';

async function findTicketTypes() {
  const types = await prisma.ticketType.findMany();
  return types;
}

async function getTicketByEnrollmentId(userId: number) {
  const user = await prisma.ticket.findFirst({
    where: { Enrollment: { userId } },
  });
  return user;
}

async function getTicketById(ticketId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: { id: ticketId },
    include: { TicketType: true },
  });
  return ticket;
}

async function postTickets(ticketTypeId: number, enrollmentId: number) {
  return await prisma.ticket.create({
    data: {
      status: 'RESERVED',
      ticketTypeId,
      enrollmentId,
    },
    include: { TicketType: true },
  });
}

const ticketRepository = {
  findTicketTypes,
  getTicketByEnrollmentId,
  getTicketById,
  postTickets,
};

export default ticketRepository;
