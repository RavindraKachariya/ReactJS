import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../store/authSlice';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isLogin) {
                const result = await signInWithEmailAndPassword(auth, email, password);
                dispatch(setUser({ uid: result.user.uid, email: result.user.email, displayName: result.user.displayName }));
            } else {
                const result = await createUserWithEmailAndPassword(auth, email, password);
                dispatch(setUser({ uid: result.user.uid, email: result.user.email, displayName: result.user.displayName }));
            }
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setError('');
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            dispatch(setUser({ uid: result.user.uid, email: result.user.email, displayName: result.user.displayName, photoURL: result.user.photoURL }));
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button type="submit" disabled={loading} className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 disabled:opacity-50">
                        {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button onClick={() => setIsLogin(!isLogin)} className="text-orange-600 hover:underline">
                        {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <button onClick={handleGoogle} disabled={loading} className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900">
                        Sign in with Google
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <Link to="/" className="text-gray-600 hover:underline">Back to Recipes</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
