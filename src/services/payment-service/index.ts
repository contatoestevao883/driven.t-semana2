import { badRequestError, notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';

async function getPayment(ticketId: number, userId: number) {
  if (!ticketId) {
    throw badRequestError();
  }

  const ticket = await paymentRepository.getTicketPaymentId(Number(ticketId));

  if (!ticket) {
    throw notFoundError();
  }

  const user = await paymentRepository.getEnrollmentPayment(ticket.enrollmentId);

  if (user.userId !== userId) {
    throw unauthorizedError();
  }

  const payment = await paymentRepository.getTicketPayment(ticketId);

  return payment;
}

const paymentService = {
  getPayment,
};

export default paymentService;
