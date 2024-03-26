//import { useState } from 'react'
//import { Link } from "react-router-dom";
// import React from 'react';
import '../styles/Header.css';
import headerImage from '/images/textstripe.jpg';
import { useAuth } from '../utils/LinkuthContext';
import {Link} from 'react-router-dom';

function Header() {
  //const [count, setCount] = useState(0)
  const { isLoggedIn, logout } = useAuth();


  return (
    <>
      <header className="flex items-center justify-between bg-black bg-opacity-90 px-4 py-2 border-b-4 border-red-500 border-image border-image-slice border-image-source" style={{borderImageSource: `url(${headerImage})`, borderImageSlice: 2}}>
        <div className="flex items-center">
          <img src="/images/fitz.jpg" alt="fitzy's fades logo" className="w-20 h-20 mr-4 rounded-full" />
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-bold text-white">Fitzys Fades</h1>
            <p className="text-xs text-white">Barber Shop</p>
          </div>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-4 text-white">
            <li><Link className="hover:text-gray-300" to="/">Home</Link></li>
            <li><Link className="hover:text-gray-300" to="/Linkbout">About us</Link></li>
            <li><Link className="hover:text-gray-300" to="/services">Services</Link></li>
            <li><Link className="hover:text-gray-300" to="/contact">Contact</Link></li>
            {isLoggedIn ? (
              <li><button className="hover:text-gray-300" onClick={logout}>Sign Out</button></li>
            ) : (
              <>
                <li><Link className="hover:text-gray-300" to="/signup">Sign Up</Link></li>
                <li><Link className="hover:text-gray-300" to="/signin">Sign In</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
export default Header;
