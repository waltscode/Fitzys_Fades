
import { useQuery } from '@apollo/client';
import { GET_ALL_APPOINTMENTS } from '../utils/queries';
import { useAuth } from '../utils/uthContext';

const AppointmentsListUser = () => {
  const { userProfile } = useAuth();

  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.appointments || data.appointments.length === 0) {
    return <p>No appointments found.</p>;
  }

  return (
    <div className="container md:max-h-[408px] px-16 h-screen overflow-y-auto mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
        {userProfile.role === 'admin' ? 'All Appointments' : 'Your Appointments'}
      </h2>
      <p className="text-center">Logged in as: {userProfile.user_name} ({userProfile.email})</p>
      {data.appointments.map(({ _id, barber_name, date, time, service, user }) => (
        <div key={_id} className="bg-blue-100 shadow-md rounded p-4">
          <p className="font-semibold">Barber: {barber_name}</p>
          <p>Service: {service}</p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
          {user && (
            <div className="mt-4 border-t pt-2">
              <h3 className="text-lg font-semibold">Customer: {user.user_name}</h3>
              <p>Email: {user.email}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppointmentsListUser;
