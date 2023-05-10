import Ticket from '../../../components/Ticket';
import PaymentComponent from '../../../components/PaymentComponent';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicket from '../../../hooks/api/useTicket';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticket, getTicket } = useTicket();

  console.log('ticket: ', ticket);

  return (
    <>
      {!ticket ? <Ticket enrollment={enrollment} getTicket={getTicket}/> 
        : <PaymentComponent enrollment={enrollment} ticket={ticket} getTicket={getTicket} />         
      }
    </>
  );
};
