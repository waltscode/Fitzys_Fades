import React, { useEffect } from 'react';
import { useAuth } from '../src/utils/authContext';
import AppointmentsList from '../src/Components/AppointmentsList';
import fitzysExterior from "./assets/images/fitzys_fades_exterior.jpg";
import leftImage from '../dist/images/121.gif'; 
import rightImage from '../dist/images/121.gif'; 

import "./test-delete-before-pushing.css";

function LandingPage() {
  const { userProfile } = useAuth();
  const userRole = userProfile ? userProfile.role : null;

  useEffect(() => {
    console.log('User profile:', userProfile);
    console.log('User role:', userRole);
  }, [userProfile, userRole]);

if (!userProfile) {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={leftImage} alt="Left Decorative" className="w-66 mr-10" /> 
      
      <div className="flex flex-col items-center text-white"> 
        <p className="text-4xl mb-8">Welcome to Fitzy's</p> 
        <p className="text-3xl">Check out our Services!</p> 
      </div>

      <img src={rightImage} alt="Right Decorative" className="w-66 ml-10" style={{ transform: 'rotate(180deg)' }} /> 
    </div>
  );
}


  return (
    <>
      <section className="contact-container flex flex-col items-center justify-center pt-8">
        <h2 className="text-7xl font-bold mb-4 text-white" style={{ textShadow: '0 0 3px #000, 0 0 5px #000' }}>
          Welcome To Fitzy's!
        </h2>
      </section>

      {/* conditional rendering for non-admin greeting and image */}
      {(userRole !== 'admin') && (
        <section className="flex flex-col items-center justify-center">
          <p className="text-center text-white pt-20">Greetings Customer #189123198 -- You're now logged in!</p>
          <section className="locationimg-card max-w-md pt-10">
            <img className="location-image" src={fitzysExterior} alt="Fitzys Exterior" />
          </section>
          {/* placeholder for user stuff, possibly a user dashboard to display appointment */}
        </section>
      )}

      {/* conditional rendering for appointment list */}
      {(userRole === 'admin') && (
        <section>
          <AppointmentsList />
        </section>
      )}
    </>
  );
}

export default LandingPage;
