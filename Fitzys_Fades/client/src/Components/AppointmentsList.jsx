import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_APPOINTMENTS } from '../utils/queries';

const AppointmentsList = () => {
  console.log('Inside AppointmentsList component');

  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENTS);

  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Data:', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.appointments || data.appointments.length === 0) {
    console.log('Data is empty');
    return <p>No appointments found.</p>;
  }

  return (
    <div>
      <h2>All Customer Appointments</h2>
      <ul>
                {data.appointments.map(({ _id, barber_name, date, time, service, user }) => (
                <li key={_id}>
                    Barber: {barber_name}, Service: {service}, Date: {date}, Time: {time}
                    {user && (
                    <>
                        , User Name: {user.user_name}, Email: {user.email}
                    </>
                    )}
                </li>
                ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;
