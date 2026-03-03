import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItem = useSelector((state) => state.cart.cart);
  const wishlistItem = useSelector((state) => state.wishlist.wishlist);

  const linkClass =
    "px-3 py-2 rounded-md text-sm font-medium transition duration-200";

  const activeClass = "bg-white text-indigo-600";
  const defaultClass = "text-white hover:bg-indigo-500";

  return (
    <>
      {/* Navbar */}
      <nav className="bg-indigo-600 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <div className="text-2xl font-bold text-white tracking-wide">
            MyStore
          </div>

          {/* Links */}
          <div className="flex items-center space-x-4">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : defaultClass}`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `${linkClass} flex items-center gap-1 ${isActive ? activeClass : defaultClass
                }`
              }
            >
              Wishlist
              {wishlistItem.length > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {wishlistItem.length}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${linkClass} flex items-center gap-1 ${isActive ? activeClass : defaultClass
                }`
              }
            >
              Cart
              {cartItem.length > 0 && (
                <span className="ml-1 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
                  {cartItem.length}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : defaultClass}`
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : defaultClass}`
              }
            >
              Register
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;