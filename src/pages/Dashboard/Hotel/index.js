import HotelComponent from '../../../components/Hotel';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const { ticket } = useTicket();
  const { token } = useToken();

  return (
    <>
      <HotelComponent ticket={ticket} token={token} />
    </>
  );
};
