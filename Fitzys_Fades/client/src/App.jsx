// Bringing in the required import from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Header />
      <div className="mx-3">
        <Outlet />
      </div>
      <Footer/>
    </>
  );
}

export default App;
