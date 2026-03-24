import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        await signOut(auth);
        dispatch(clearUser());
    };

    return (
        <nav className="bg-orange-600 text-white p-3">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-xl font-bold">RecipeBook</Link>

                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:text-orange-200">Recipes</Link>

                    {user ? (
                        <>
                            <Link to="/add" className="bg-white text-orange-600 px-3 py-1 rounded text-sm">Add Recipe</Link>
                            <span className="text-orange-200">{user.email?.split('@')[0]}</span>
                            <button onClick={handleLogout} className="bg-white text-orange-600 px-3 py-1 rounded text-sm">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="bg-white text-orange-600 px-3 py-1 rounded text-sm">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
