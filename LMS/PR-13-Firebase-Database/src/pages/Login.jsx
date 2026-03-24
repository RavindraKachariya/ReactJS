import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";

export const Login = () => {
    const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return;

        setLoading(true);
        if (isLogin) {
            await loginWithEmail(email, password);
        } else {
            await registerWithEmail(email, password);
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        await loginWithGoogle();
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <FiLogIn className="text-2xl text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {isLogin ? "Sign in to access your notes" : "Sign up to get started"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-xl transition-all disabled:opacity-50"
                    >
                        {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">or continue with</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all disabled:opacity-50"
                >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    Google
                </button>

                <p className="text-center mt-6 text-gray-600">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-indigo-500 font-medium hover:underline"
                    >
                        {isLogin ? "Sign Up" : "Sign In"}
                    </button>
                </p>
            </div>
        </div>
    );
};
