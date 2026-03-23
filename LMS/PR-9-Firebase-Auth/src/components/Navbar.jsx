import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {

    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-white text-xl font-bold flex items-center gap-2">
                            <span className="bg-white/20 p-2 rounded-lg">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </span>
                            Firebase Auth
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {user ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium"
                                    >
                                        <FiUser className="text-lg" />
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium border border-white/30"
                                    >
                                        <FiLogOut className="text-lg" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/"
                                        className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-md"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
                        >
                            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/10 backdrop-blur-md">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {user ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="text-white hover:bg-white/20 block px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <FiUser />
                                    Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left text-white hover:bg-white/20 px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
                                >
                                    <FiLogOut />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    className="text-white hover:bg-white/20 block px-4 py-3 rounded-lg transition-all duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-white hover:bg-white/20 block px-4 py-3 rounded-lg transition-all duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;