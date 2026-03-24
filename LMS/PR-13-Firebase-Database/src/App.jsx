import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { Notes } from "./pages/Notes";
import { Login } from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContent = () => {
  const { user } = useAuth();
  const [page, setPage] = useState("notes");

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar page={page} setPage={setPage} />
      <div className="flex-1 ml-64">
        <Navbar title={page === "notes" ? "My Notes" : "Dashboard"} />
        <main className="p-6">
          {page === "notes" && <Notes />}
        </main>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
