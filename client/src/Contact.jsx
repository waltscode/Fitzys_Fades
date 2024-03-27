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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg">
        {/* Contact Us Card */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="flex">
            {/* Location Image Card */}
            <div className="flex-1 mr-4">
              <img className="w-full rounded-lg" src={fitzysExterior} alt="" />
            </div>
            {/* Contact Info Card */}
            <div className="flex-1">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <img className="w-6 h-6 mr-2" src={locationIcon} alt="Location Icon" />
                  <a
                    className="text-blue-600 hover:underline"
                    href="https://www.google.com/maps/place/182+Ontario+St,+Stratford,+ON+N5A+3H4/@43.3715034,-80.9798419,17.58z/data=!4m6!3m5!1s0x882eadf175fb668b:0x37ead94f0029ff3c!8m2!3d43.3716315!4d-80.9787975!16s%2Fg%2F11c27fj4k2?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    182 Ontario St., Stratford, ON, Canada, Ontario
                  </a>
                </li>
                <li className="flex items-center">
                  <img className="w-6 h-6 mr-2" src={phoneIcon} alt="Phone Icon" />
                  <p className="text-gray-700">(519) 272-1419</p>
                </li>
                <li className="flex items-center">
                  <img className="w-6 h-6 mr-2" src={emailIcon} alt="Email Icon" />
                  <p className="text-gray-700">Fitzysfadesbarbershop@gmail.com</p>
                </li>
                <li className="flex items-center">
                  <img className="w-6 h-6 mr-2" src={instagramIcon} alt="Instagram Icon" />
                  <a
                    className="text-blue-600 hover:underline"
                    href="https://www.instagram.com/fitzysfadesbarbershop/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    fitzysfadesbarbershop
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Send Message Card */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
          <h3 className="text-gray-700 mb-4">
            If you have a question about your appointment, please provide your appointment detail as well.
          </h3>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={name}
                name="name"
                onChange={handleInputChange}
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={email}
                name="email"
                onChange={handleInputChange}
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={message}
                name="message"
                onChange={handleInputChange}
                type="text"
                placeholder="Message"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <button
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
