import { FiFileText, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export const Sidebar = ({ page, setPage }) => {
    const { user, logout } = useAuth();

    return (
        <aside className="w-64 bg-indigo-600 text-white flex flex-col h-screen fixed left-0 top-0">
            {/* Logo */}
            <div className="p-6 border-b border-indigo-500">
                <h1 className="text-xl font-bold">Notes App</h1>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4">
                <button
                    onClick={() => setPage("notes")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${page === "notes" ? "bg-white/20" : "hover:bg-white/10"
                        }`}
                >
                    <FiFileText />
                    <span>My Notes</span>
                </button>
            </nav>

            {/* User */}
            <div className="p-4 border-t border-indigo-500">
                <div className="flex items-center gap-3 mb-3">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
                    ) : (
                        <div className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user?.displayName || "User"}</p>
                        <p className="text-xs text-indigo-200 truncate">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-500/20 text-red-200 hover:text-red-100 transition"
                >
                    <FiLogOut />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};
