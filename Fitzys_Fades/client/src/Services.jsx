import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {useMutation} from '@apollo/client';
import { CREATE_APPOINTMENT } from './utils/mutations';
import { useNavigate } from "react-router-dom";
import {useAuth} from './utils/authContext';
function Services() {
  const barbers = ['JOHN_DOE', 'JANE_DAWN', 'WILLIAM_WILLIAMS'];
  const [barberSelected, setBarber] = useState("JOHN_DOE");
  const [dateSelected, setDate] = useState(new Date());
  const [timeSelected, setTime] = useState("12:00");
  const [dateModalOpened, setModalOpened] = useState(false);
  const [dateTimePanel, switchDateTimePanel] = useState("BARBER"); 
  const [serviceSelected, setService] = useState("");
  const navigate = useNavigate();

  const [createAppointment] = useMutation(CREATE_APPOINTMENT);

  const {isLoggedIn} = useAuth();

  function getDateTimePanel(panel) {
    if (panel === "BARBER") {
      //const barbers = ['JOHN_DOE', 'JANE_DAWN', 'WILLIAM_WILLIAMS'];
      //const [barberSelected, setBarber] = useState("JOHN_DOE");
      return (
        <div>
          <h3>Select a Barber</h3>
          <button onClick={()=>{ setBarber("JOHN_DOE") }}>JOHN DOE</button><br/>
          <button onClick={()=>{ setBarber("JANE_DAWN") }}>JANE DAWN</button><br/>
          <button onClick={()=>{ setBarber("WILLIAM_WILLIAMS") }}>WILLIAM WILLIAMS</button><br/>
        </div>
      );
    } else if (panel === "DATE") {
      return (
        <div>
          <Calendar
            onChange={setDate}
            value={dateSelected}
            />
        </div>
      );
    } else if(panel === "TIME") {
      return (
        <div>
          <select
            value={timeSelected}
            onChange={(e) => setTime(e.target.value)}
            >
            <option value="12:00">12:00 PM</option>
            <option value="1:00">1:00 PM</option>
            <option value="2:00">2:00 PM</option>
            <option value="3:00">3:00 PM</option>
            <option value="4:00">4:00 PM</option>
            <option value="5:00">5:00 PM</option>
            <option value="6:00">6:00 PM</option>
            <option value="7:00">7:00 PM</option>
            <option value="8:00">8:00 PM</option>
          </select>
        </div>
      );
    }
  }
  
  function getDateTimeButtons(panel) {
    if(panel === "BARBER") {
      return (
        <div>
          <button
            className="px-4 py-2 mr-6  text-white rounded hover:text-blue-400 focus:outline-none focus:bg-blue-600"
            onClick={() => {
              setModalOpened(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={() => {
              switchDateTimePanel("DATE");
            }}
          >
            Next
          </button>
        </div>
      )
    } else if(panel === "DATE") {
      return (
        <div>
          <button
            className="px-4 py-2 mr-6 text-white rounded hover:text-blue-400 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={() => {
              switchDateTimePanel("BARBER");
            }}
          >
            Back
          </button>
          <button
            className="px-4 py-2 mr-6  text-white rounded hover:text-blue-400 focus:outline-none focus:bg-blue-600"
            onClick={() => {
              setModalOpened(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={() => {
              switchDateTimePanel("TIME");
            }}
          >
            Next
          </button>
        </div> 
      )
    } else if(panel === "TIME") {
      return (
        <div>
          <button
            className="px-4 py-2 mr-6 text-white rounded hover:text-blue-400 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={() => {
              switchDateTimePanel("DATE");
            }}
          >
            Back
          </button>
          <button
            className="px-4 py-2 mr-6  text-white rounded hover:text-blue-400 focus:outline-none focus:bg-blue-600"
            onClick={() => {
              setModalOpened(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={() => {
              submitAppointment();
              switchDateTimePanel("BARBER");
            }}
          >
            Submit
          </button>
        </div>
      )
    } // else if

  } // get buttons


  useEffect(() => {
    console.log("CHANGED DATE: " + dateSelected);
  }, [dateSelected]);

  useEffect(() => {
    console.log("CHANGED SERVICE: " + serviceSelected);
  }, [serviceSelected]);

  useEffect(() => {
 
    console.log("TIME CHANGED: " + timeSelected);
  }, [timeSelected]);

  const handleServiceSelection = (service) => { 
    if (!isLoggedIn)  {
    return navigate ('/signin');
  }
  setService(service);
  setModalOpened(true);
};


  function submitAppointment() {
    const hrDate = dateSelected.toLocaleDateString();
    const hrTime = timeSelected;
    alert("Appointment scheduled for " + hrDate + " at " + hrTime + " for " + serviceSelected + " with " + barberSelected + ".");
    const appointment = {
      barberName: barberSelected,
      date: dateSelected,
      time: timeSelected,
      service: serviceSelected
    }
    createAppointment({variables: appointment});
  
    setModalOpened(false);
  }

  return (
    <>
      <div
        className={
          "fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75" +
          (dateModalOpened ? "" : " hidden")
        }
      >
        <div className="bg-blue-200 rounded-lg shadow-lg p-6">
          <p className="text-gray-700 mb-10">
            <strong>Service:</strong> {serviceSelected}
            <br></br>
            { 
              getDateTimePanel(dateTimePanel)
            }
          </p>
          <div className="flex justify-end">
            { 
              getDateTimeButtons(dateTimePanel)
            }
          </div>
        </div>
      </div>

      <main>
        <h2 className="text-center text-4xl font-semibold">Our Services</h2>
        <h3 className="text-center text-4xl font-semibold">Click on the desired service to set up your appointment</h3>
        <div className="flex flex-wrap justify-center">
          <div
            className="flex flex-col bg-cyan-600 rounded-lg shadow-md p-2 mr-4 mb-14"
            
          >
            <div className="relative">
              <div className="relative">
                <img
                  src="images/traditional.jpg"
                  alt="Placeholder"
                  className="rounded-md z-1"
                ></img>
                <div className="absolute top-0 right-0 p-2 z-2">
                  <h2 className="text-xl text-amber-400 font-semibold mb-2">
                    Traditional<br></br>Mens Cut
                  </h2>
                  <p className="text-teal-200 mb-2 text-right">$45</p>
                </div>
                <button className="btn btn-large btn-primary text-lg p-4 text-center w-full border-4 mt-2 border-solid border-black" onClick={() => {
              handleServiceSelection('Traditional')
            }}>Book Now</button>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col bg-cyan-600 rounded-lg shadow-md p-2 mr-8 mb-14"
            onClick={() => {
              handleServiceSelection("Straight Razor");
            }}
          >
            <div className="relative">
              <div className="relative">
                <img
                  src="images/straight_razor1.jpg"
                  alt="Placeholder"
                  className="rounded-md z-1"
                ></img>
                <div className="absolute top-0 right-0 p-2 z-2">
                  <h2 className="text-xl text-amber-400 font-semibold mb-2">
                    Straight Razor
                  </h2>
                  <p className="text-teal-200 mb-2 text-right">$45</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-cyan-600 rounded-lg shadow-md p-2 mr-4 mb-14"  onClick={() => {
             handleServiceSelection("Kidz Kutz");
            }}>
            <div className="relative">
              <div className="relative">
                <img
                  src="images/Kidz_Kutz2.jpg"
                  alt="Picture of a child with a fade and design in the left hand side of his head"
                  className=" object-contain rounded-md z-1"
                ></img>
                <div className="absolute top-0 right-0 p-2 z-2">
                  <h2 className="text-xl text-amber-400 font-semibold mb-2">
                    Kidz Kutz
                  </h2>
                  <p className="text-teal-200 mb-2 text-right">$30</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-cyan-600 rounded-lg shadow-md p-2 mr-4 mb-14"  onClick={() => {
             handleServiceSelection("Braid-UP")
            }}>
            <div className="relative">
              <div className="relative">
                <img
                  src="images/braid_up1.jpg"
                  alt="this is a X style braid up"
                  className="rounded-md z-1"
                ></img>
                <div className="absolute top-0 right-0 p-2 z-2">
                  <h2 className="text-xl text-amber-400 font-semibold mb-2">
                    Braid-UP
                  </h2>
                  <p className="text-teal-200 mb-2 text-right">$50</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-cyan-600 rounded-lg shadow-md p-2 mr-4 mb-14"  onClick={() => {
              handleServiceSelection("Fitzys Fade")
            }}>
            <div className="relative">
              <div className="relative">
                <img
                  src="images/fitzy_fades1.jpg"
                  alt="someone getting a straight razor shave"
                  className="rounded-md z-1"
                ></img>
                <div className="absolute top-0 right-0 p-2 z-2">
                  <h2 className="text-xl text-amber-400 font-semibold mb-2">
                    Fitzys Fade
                  </h2>
                  <p className="text-teal-200 mb-2 text-right">$60</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-cyan-600 rounded-lg shadow-md p-2 mr-4 mb-14"  onClick={() => {
             handleServiceSelection("Custom Design")
            }}>
            <div className="relative">
              <div className="relative">
                <img
                  src="images/custom_design1.jpg"
                  alt="Placeholder"
                  className="rounded-md z-1"
                ></img>
                <div className="absolute top-0 right-0 p-2 z-2">
                  <h2 className="text-xl text-amber-400 font-semibold mb-2">
                    Custom Designs
                  </h2>
                  <p className="text-teal-200 mb-2 text-right">$65</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <br />
      <br />
      <br />
    </>
  );
}

export default Services;
