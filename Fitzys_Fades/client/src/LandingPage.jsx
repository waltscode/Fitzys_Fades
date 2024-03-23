// import { useState } from "react";
import fitzysExterior from "./assets/images/fitzys_fades_exterior.jpg"
import "./test-delete-before-pushing.css";

function LandingPage() {


  return (
    <section className="contact-container">
      <h2>Contact Us</h2>
      {/* <section className="contact-upper"> */}
        <section className="locationimg-card">
          <img className="location-image" src={fitzysExterior} alt="" />
        </section>
    </section>
  );

  // return (

  //   <>
  //     <main>
  //       <h2>Contact Us</h2>
  //     </main>
  //   </>
  // )
}

export default LandingPage;