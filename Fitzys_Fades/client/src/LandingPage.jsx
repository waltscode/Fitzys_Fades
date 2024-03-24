// import React from 'react';
import { useAuth } from '../src/utils/authContext'; 
import AppointmentsList from '../src/Components/AppointmentsList';
import fitzysExterior from "./assets/images/fitzys_fades_exterior.jpg";
import "./test-delete-before-pushing.css";

function LandingPage() {
  const { userProfile } = useAuth();
  const userRole = userProfile?.role; // Assuming the role is stored in the userProfile object

  return (
    <>
      <section className="contact-container">
        <h2>Contact Us</h2>
        <section className="locationimg-card">
          <img className="location-image" src={fitzysExterior} alt="Fitzys Exterior" />
        </section>
      </section>

      {/* conditional rendering for appointment list */}
      {userRole === 'admin' && (
        <section>
          <h2>All Customer Appointments</h2>
          <AppointmentsList />
        </section>
      )}
    </>
  );
}

export default LandingPage;