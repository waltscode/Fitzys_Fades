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
      <section className="contact-container">
        <h2>Contact Us</h2>
        <section className="locationimg-card">
          <img className="location-image" src={fitzysExterior} alt="Fitzys Exterior" />
        </section>
      </section>

      {/* Conditional rendering for appointment list */}
      {(userRole === 'admin') ? (
        <section>
          <AppointmentsList />
        </section>
      ) : (
        <p>Welcome To Fitzy's Fades!</p>
      )}
    </>
  );
}

export default LandingPage;
