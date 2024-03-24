import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_APPOINTMENTS } from '../utils/queries';

const AppointmentsList = () => {
    const { loading, error, data } = useQuery(GET_ALL_APPOINTMENTS);
    const [orderBy, setOrderBy] = useState('date'); //a default state for sorting

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
        <div className="container mx-auto px-16 h-screen overflow-y-auto">
    <h2 className="text-2xl font-bold mb-4 text-center text-white">All Customer Appointments</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <label htmlFor="orderBy" className="block text-sm font-medium text-white 500">Order By:</label>
        <select id="orderBy" name="orderBy" className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onChange={handleOrderByChange}>
            <option value="date">Date</option>
            {/* <option value="username">Customer Name</option> */} {/*uncomment this after clearing GraphQL otherwise it will throw errors*/}
            <option value="barber">Barber</option>
        </select>
    </div>

    {sortedAppointments.map(({ _id, barber_name, date, time, service, user }) => (
        <div key={_id} className="bg-white shadow-md rounded p-4">
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

export default AppointmentsList;