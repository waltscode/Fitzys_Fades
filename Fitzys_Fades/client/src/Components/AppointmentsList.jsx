import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_APPOINTMENTS } from '../utils/queries';

const AppointmentsList = () => {
  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.appointments || data.appointments.length === 0) {
    return <p>No appointments found.</p>;
  }

  return (
    <div>
       <h2 className="text-2xl font-bold mb-4 text-center text-white">All Customer Appointments</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.appointments.map(({ _id, barber_name, date, time, service, user }) => (
          <div key={_id} className="bg-white shadow-md rounded p-4">
            <h3 className="text-lg font-semibold">{barber_name}</h3>
            <p>Service: {service}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            {user && (
              <div className="mt-4 border-t pt-4">
                <p className="font-semibold">User Name: {user.user_name}</p>
                <p>Email: {user.email}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;