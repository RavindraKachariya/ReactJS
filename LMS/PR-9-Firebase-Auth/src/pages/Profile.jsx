import { useAuth } from "../context/AuthContext";
import { FiUser, FiMail, FiShield, FiEdit2, FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="relative z-10 text-center">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiUser className="text-4xl text-white/70" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Access Restricted</h2>
                        <p className="text-white/70 mb-6">Please login first to view your profile</p>
                        <Link
                            to="/"
                            className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden py-12">
            {/* Animated background shapes */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>

            <div className="relative z-10 w-full max-w-2xl px-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-8 relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex flex-col items-center relative">
                            <div className="w-32 h-32 bg-white rounded-full p-1 shadow-2xl mb-4">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <FiUser className="text-5xl text-white" />
                                    </div>
                                )}
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-1">
                                {user.displayName || "User"}
                            </h2>
                            <p className="text-white/70 flex items-center gap-2">
                                <FiShield className="text-green-400" />
                                Verified Account
                            </p>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8">
                        <div className="grid gap-6">
                            {/* Email */}
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <FiMail className="text-xl text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white/50 text-sm mb-1">Email Address</p>
                                        <p className="text-white font-medium">{user.email}</p>
                                    </div>
                                    <div className="text-green-400">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* User ID */}
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <FiShield className="text-xl text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white/50 text-sm mb-1">User ID</p>
                                        <p className="text-white font-medium text-sm truncate">{user.uid}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex gap-4">
                            <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-purple-900 transition-all duration-300 flex items-center justify-center gap-2">
                                <FiEdit2 />
                                Edit Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 bg-white/10 border border-white/20 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <FiLogOut />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;