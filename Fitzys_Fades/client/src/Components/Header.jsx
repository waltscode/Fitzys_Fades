//import { useState } from 'react'
//import { Link } from "react-router-dom";
import '../styles/Header.css';

function Header() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <header className="flex items-center justify-between bg-black bg-opacity-90 px-4 py-2 border-b-4 border-red-500">
      <div className="flex items-center">
        <img
          src="/images/fitz.jpg"
          alt="fitzy's fades logo"
          className="w-20 h-20 mr-4 rounded-full"
        />
        <div className="flex flex-col items-start">
          {/* <h1 className="text-2xl font-bold">1551</h1> */}
          {/* Add more header content as needed */}
        </div>
      </div>

      <nav className="flex items-center">
      <ul className="flex space-x-4 text-white">
  {/* Navigation links */}
  <li>
    <a className="hover:text-gray-300" href="/about">
      About us
    </a>
  </li>
  <li>
    <a className="hover:text-gray-300" href="/services">
      Services
    </a>
  </li>
  <li>
    <a className="hover:text-gray-300" href="/contact">
      Contact
    </a>
  </li>
  <li>
    <a className="hover:text-gray-300" href="/signup">
      Sign Up
    </a>
  </li>
  <li>
    <a className="hover:text-gray-300" href="/signin">
      Sign In
    </a>
  </li>
</ul>
      </nav>
    </header>
  </>
  );
}

export default Header;
