import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between">
            <h1 className="text-xl font-bold">Navigator</h1>

            <div className="flex gap-6">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/services">Services</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;