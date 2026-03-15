import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const { user } = useAuth();

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <div className="flex justify-between bg-gray-800 text-white p-4">

            <h1 className="text-xl font-bold">Firebase Auth</h1>

            <div>

                {user ? (
                    <>
                        <Link className="mr-4" to="/profile">Profile</Link>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="mr-4" to="/">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

            </div>

        </div>
    );
};

export default Navbar;