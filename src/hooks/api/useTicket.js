import useAsync from '../useAsync';
import useToken from '../useToken';

import { getTickets } from '../../services/ticketApi';

export default function useTicket() {
  const token = useToken();
  
  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicket
  } = useAsync(() => getTickets(token));

  return { ticket, ticketLoading, ticketError, getTicket };
}
