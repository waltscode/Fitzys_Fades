import { useState } from "react";
import { validateEmail } from "./utils/validateEmail";
import emailIcon from "./assets/logos/email-svgrepo-com.svg";
import instagramIcon from "./assets/logos/instagram-svgrepo-com.svg";
import locationIcon from "./assets/logos/location-pin-svgrepo-com.svg";
import phoneIcon from "./assets/logos/phone-svgrepo-com.svg";
import fitzysExterior from "./assets/images/fitzys_fades_exterior.jpg";
import "./test-delete-before-pushing.css";
import { CREATE_MESSAGE } from "./utils/mutations";
import { useMutation } from "@apollo/client";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [createMessage] = useMutation(CREATE_MESSAGE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "message":
        setMessage(value);
        break;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        setErrorMessage("Please enter your name.");
        return;
      } else if (!validateEmail(email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      } else if (!message) {
        setErrorMessage("Please don't leave the message blank.");
        return;
      }
      await createMessage({
        variables: { name: name, email: email, message: message },
      });
      setErrorMessage("");
      alert("Thank you for reaching out!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while sending the message");
    }
  };

  return (
    <section className="contact-container">
      <h2>Contact Us</h2>
      <section className="contact-upper">
        <section className="locationimg-card">
          <img className="location-image" src={fitzysExterior} alt="" />
        </section>
        <section className="contactinfo-card">
          <ul className="contact-list">
            <li className="contact-item">
              <img className="icon" src={locationIcon} alt="Location Icon" />
              <a
                className="contact-link"
                href={
                  "https://www.google.com/maps/place/182+Ontario+St,+Stratford,+ON+N5A+3H4/@43.3715034,-80.9798419,17.58z/data=!4m6!3m5!1s0x882eadf175fb668b:0x37ead94f0029ff3c!8m2!3d43.3716315!4d-80.9787975!16s%2Fg%2F11c27fj4k2?entry=ttu"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                182 Ontario St., Stratford, ON, Canada, Ontario
              </a>
            </li>
            <li className="contact-item">
              <img className="icon" src={phoneIcon} alt="Phone Icon" />
              <p className="contact-info"> (519) 272-1419</p>
            </li>
            <li className="contact-item">
              <img className="icon" src={emailIcon} alt="Instagram Icon" />
              <p className="contact-info"> Fitzysfadesbarbershop@gmail.com</p>
            </li>
            <li className="contact-item">
              <img className="icon" src={instagramIcon} alt="Email Icon" />
              <a
                className="contact-link"
                href={"https://www.instagram.com/fitzysfadesbarbershop/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                fitzysfadesbarbershop
              </a>
            </li>
          </ul>
        </section>
      </section>
      <section className="contact-lower">
        <section>
          <h2>Send us a message</h2>
          <h3>
            If you have a question about your appointment, please provide you
            appointment detail as well.
          </h3>
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <section className="form-container">
              <section className="contact-information">
                <input
                  className="contact-input"
                  value={name}
                  name="name"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Name"
                />
                <input
                  className="contact-input"
                  value={email}
                  name="email"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Email"
                />
              </section>
              <section className="message-container">
                <textarea
                  className="message-input"
                  value={message}
                  name="message"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Message"
                />
              </section>
            </section>
            {errorMessage && (
              <section>
                <p className="contact-warning">{errorMessage}</p>
              </section>
            )}
            <section className="button-container">
              <button type="submit">Submit</button>
            </section>
          </form>
        </section>
      </section>
    </section>
  );
}

export default Contact;
