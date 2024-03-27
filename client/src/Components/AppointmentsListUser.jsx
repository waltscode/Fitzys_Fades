import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_MOST_RECENT_APPOINTMENT } from '../utils/queries';
import { useAuth } from '../utils/authContext';

const AppointmentsListUser = () => {
  const { userProfile } = useAuth();
  // const stripeBtnRef = useRef(null); // ref for the Stripe Buy Button NOT USED

  const { loading, error, data } = useQuery(GET_USER_MOST_RECENT_APPOINTMENT, {
    variables: { userId: userProfile._id }
  });

  useEffect(() => {
    // loads the Stripe script dynamically
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
if (error || !data || !data.userMostRecentAppointment) {
    console.log(error)
    return <p className="text-1xl mb-4 text-center text-white" style={{ textShadow: '4px 4px 4px rgba(0, 0, 0, 0.8)' }}>No appointment yet doc.</p>;

  }

  const appointment = data.userMostRecentAppointment;

  return (
    <div className="container md:max-h-[408px] px-16 h-screen overflow-y-auto mx-auto relative">
      <h2 className="text-2xl font-bold mb-4 text-center text-white" style={{ textShadow: '4px 4px 4px rgba(0, 0, 0, 0.8)' }}>
        Your Appointment
      </h2>
      <div className="bg-blue-100 shadow-md rounded p-4 relative">
        <p className="font-semibold">Barber: {appointment.barber_name}</p>
        <p>Service: {appointment.service}</p>
        <p>Date: {appointment.date}</p>
        <p>Time: {appointment.time}</p>
        
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1 scale-50 ml-24">
          <stripe-buy-button
            buy-button-id="buy_btn_1OyjwXG8J5fghEqMWiSaoNs0"
            publishable-key="pk_live_51OyjnUG8J5fghEqMQqYtLKR4oLliLMZ9kpV9Vdmur7KSwEMHGrhVo7cKyuplqWszwS28mNLqDFGsrxO8V51F4g4M0070Vf3Ta1"
          >
          </stripe-buy-button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsListUser;
