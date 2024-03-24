import { useQuery } from '@apollo/client';
import { GET_ALL_APPOINTMENTS } from '../utils/queries';

const AppointmentsList = () => {
  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : { error.message }</p>;

  return (
    <div>
      <h2>All Customer Appointments</h2>
      <ul>
        {data.appointments.map(({ _id, barber_name, date, time, service }) => (
          <li key={_id}>
            Barber: {barber_name}, Service: {service}, Date: {date}, Time: {time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;
