import React, { useEffect } from 'react';
import { useAuth } from '../src/utils/authContext'; 
import AppointmentsList from '../src/Components/AppointmentsList';
import fitzysExterior from "./assets/images/fitzys_fades_exterior.jpg";

import "./test-delete-before-pushing.css";

function LandingPage() {
  const { userProfile } = useAuth();
  //to ensure that the userRole is not null, might need to change the logic here
  //initally set to null to avoid errors in console.log when loading the site before login/signup, but this may not be the best solution... almost certain its not the best solution.
  const userRole = userProfile ? userProfile.role : null;

  // added a ton of console logs to see what was going on
  useEffect(() => {
    console.log('User profile:', userProfile);
    console.log('User role:', userRole);
  }, [userProfile, userRole]); 

  if (!userProfile) {
    return <p>Loading...</p>;
  }

return (
  <>
    <section className="contact-container flex flex-col items-center justify-center pt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Greetings Valued Customer #267189!</h2> {/* placeholder for username */}
      <section className="locationimg-card max-w-md pt-10">
        <img className="location-image" src={fitzysExterior} alt="Fitzys Exterior" />
      </section>
    </section>

    {/* Conditional rendering for appointment list */}
    {(userRole === 'admin') ? (
      <section>
        <AppointmentsList />
      </section>
    ) : (
      <p className="text-center text-white pt-20">You're now logged in!</p>
    )}
  </>
);
}

export default LandingPage;
