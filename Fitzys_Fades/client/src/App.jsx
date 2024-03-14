// Bringing in the required import from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import backgroundImage from '/images/fitzshop.jpg'

function App() {
  return (
    <>
      <Header />
      <div className="" style={{ 
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), linear-gradient(rgba(255, 215, 0, 0.05), rgba(255, 215, 0, 0.1)), url(${backgroundImage})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    height: '100vh' 

}}>
          <Outlet />
      </div>
      <Footer/>
    </>
  );
}

export default App;
