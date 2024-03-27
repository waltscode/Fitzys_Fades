import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_APPOINTMENTS } from '../utils/queries';
import { DELETE_APPOINTMENT, UPDATE_APPOINTMENT } from '../utils/mutations';

const AppointmentsList = () => {
    const { loading, error, data } = useQuery(GET_ALL_APPOINTMENTS);
    const [orderBy, setOrderBy] = useState('date');
    const [currentAppointment, setCurrentAppointment] = useState(null);

    const [deleteAppointment, { loading: deleting, error: deleteError }] = useMutation(DELETE_APPOINTMENT, {
        refetchQueries: [
            { query: GET_ALL_APPOINTMENTS },
        ],
    });
    const [updateAppointment, { loading: updating, error: updateError }] = useMutation(UPDATE_APPOINTMENT, {
        refetchQueries: [
            { query: GET_ALL_APPOINTMENTS },
        ],
    });

    const handleDelete = async (id) => {
        try {
            await deleteAppointment({
                variables: { id },
            });

        } catch (error) {
            console.error("Error deleting appointment:", error);

        }
    };

    const handleUpdate = async (id) => {
        try {
            const appointmentToUpdate = sortedAppointments.find(appointment => appointment._id === id);
            setCurrentAppointment(appointmentToUpdate);
            // insert modal here

            const updatedAppointmentData = {
                barberName: '',
                date: '',
                time: '',
                service: '',
            };


            await updateAppointment({
                variables: {
                    id: appointmentToUpdate._id,
                    barberName: updatedAppointmentData.barberName,
                    date: updatedAppointmentData.date,
                    time: updatedAppointmentData.time,
                    service: updatedAppointmentData.service,
                },
            });



        } catch (error) {
            console.error("Error updating appointment:", error);

        }
    };

    const submitUpdatedAppointment = async (e) => { // not working yet and most likely needs to be refactored
        e.preventDefault();
        await updateAppointment({
            variables: {
                id: currentAppointment._id,
                barberName: currentAppointment.barberName,
                date: currentAppointment.date,
                time: currentAppointment.time,
                service: currentAppointment.service,
            },
        });
        setCurrentAppointment(null);
    };




    const handleOrderByChange = (event) => {
        setOrderBy(event.target.value);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.appointments || data.appointments.length === 0) {
        return <p>No appointments found.</p>;
    }

    const sortedAppointments = data.appointments.slice().sort((a, b) => {
        switch (orderBy) {
            case 'date':
                return new Date(a.date) - new Date(b.date);
            // case 'username':
            //     return a.user.user_name.localeCompare(b.user.user_name); //uncomment this after clearing GraphQL otherwise it will throw errors
            case 'barber':
                return a.barber_name.localeCompare(b.barber_name);
            default:
                return 0;
        }
    }
    );

    return (
        <div className="container custom-scrollbar md:max-h-[408px] px-16 h-screen overflow-y-auto mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>All Customer Appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <label htmlFor="orderBy" className="block text-sm font-medium text-white 500" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>Order By:</label>
                <select id="orderBy" name="orderBy" className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onChange={handleOrderByChange}>
                    <option value="date">Date</option>
                    {/* <option value="username">Customer Name</option> */} {/*uncomment this after clearing GraphQL otherwise it will throw errors*/}
                    <option value="barber">Barber</option>
                </select>
            </div>

            {sortedAppointments.map(({ _id, barber_name, date, time, service, user }) => (
                <div key={_id} className="bg-blue-100 shadow-md rounded p-4 flex items-center mr-44 ml-44 border border-black border-4">
                    <div>
                        <p className="font-bold ml-12">Barber: {barber_name}</p>
                        <p className="font-semibold ml-12">Service: {service}</p>
                        <p className="font-semibold ml-12">Date: {date}</p>
                        <p className="font-semibold ml-12">Time: {time}</p>
                        {user && (
                            <div className="mt-4 border-t pt-2">
                                <h3 className="text-center font-semibold">Customer: {user.user_name}</h3>
                                <p className=" font-semibold ml-12">Email: {user.email}</p>
                                {/* <p className=" ml-12">Phone: {user.phone}</p> */}
                            </div>
                        )}
                    </div>
                    <div className="ml-auto">
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-900 transition duration-300 mr-24"
                            onClick={() => handleUpdate(_id)}
                            disabled={updating}
                        >
                            Modify
                        </button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-900 transition duration-300 mr-24"
                            onClick={() => handleDelete(_id)}
                            disabled={deleting}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {deleteError && <p>Error deleting appointment. Please try again.</p>}
        </div>
    );
};

export default AppointmentsList;