import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-around bg-blue-500 p-4 items-center">
        <div className="text-4xl font-black">Navbar</div>
        <ul className="">
          <li className="space-x-4">
            <NavLink to="/">Product</NavLink>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
