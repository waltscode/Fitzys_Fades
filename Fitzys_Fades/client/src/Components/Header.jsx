//import { useState } from 'react'
//import { Link } from "react-router-dom";

function Header() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <header className="flex flex-col items-center justify-center bg-gray-400">
        <div className="mb-2">
          <h1 className="text-6xl font-bold text-center">Fitzy Fade</h1>
        </div>

        <nav className="w-full px-5 md:px-0 md:w-90 mb-4">
          <ul className="flex justify-between px-5">
            <li className="">
              <a className="text-blue-500 hover:text-blue-700" href="/about">
                About us
              </a>
            </li>
            <li className="">
              <a className="text-blue-500 hover:text-blue-700" href="/services">
                Services
              </a>
            </li>
            <li className="">
              <a className="text-blue-500 hover:text-blue-700" href="/contact">
                Contact
              </a>
            </li>
            <li className="">
              <a className="text-blue-500 hover:text-blue-700" href="/signup">
                Sign Up
              </a>
            </li>
            <li>
              <a className="text-blue-500 hover:text-blue-700" href="/signin">
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
