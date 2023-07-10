import { prisma } from '@/config';

async function getTicketPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function getTicketPaymentId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });
}

async function getEnrollmentPayment(userId: number) {
  return prisma.enrollment.findFirst({
    where: { id: userId },
  });
}

const paymentRepository = {
  getTicketPayment,
  getTicketPaymentId,
  getEnrollmentPayment,
};

export default paymentRepository;
