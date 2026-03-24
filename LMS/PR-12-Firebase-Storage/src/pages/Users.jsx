import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTrash } from "react-icons/fa";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "male",
        address: "",
        age: "",
        course: ""
    });

    const fetchUsers = async () => {
        setLoading(true);
        const snap = await getDocs(collection(db, "users"));
        setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await addDoc(collection(db, "users"), {
            ...form,
            createdAt: new Date().toISOString()
        });

        setForm({ name: "", email: "", phone: "", gender: "male", address: "", age: "", course: "" });
        fetchUsers();
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (confirm("Delete this user?")) {
            await deleteDoc(doc(db, "users", id));
            fetchUsers();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                <p className="text-gray-500">Manage and track all users</p>
            </div>

            {/* FORM CARD */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New User</h2>

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">

                    <input
                        placeholder="Full Name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="input"
                    />

                    <input
                        placeholder="Email Address"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="input"
                    />

                    <input
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="input"
                    />

                    <input
                        placeholder="Age"
                        value={form.age}
                        onChange={e => setForm({ ...form, age: e.target.value })}
                        className="input"
                    />

                    <input
                        placeholder="Course / Department"
                        value={form.course}
                        onChange={e => setForm({ ...form, course: e.target.value })}
                        className="input"
                    />

                    <textarea
                        placeholder="Address"
                        value={form.address}
                        onChange={e => setForm({ ...form, address: e.target.value })}
                        className="input col-span-2"
                    />

                    <button className="col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition">
                        {loading ? "Adding..." : "Add User"}
                    </button>
                </form>
            </div>

            {/* USERS GRID */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">All Users ({users.length})</h2>

                {users.length === 0 ? (
                    <div className="text-center text-gray-400 py-10">No users found</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map(user => (
                            <div key={user.id}
                                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">

                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-lg text-gray-800">{user.name}</h3>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-400 hover:text-red-600">
                                        <FaTrash />
                                    </button>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>📧 {user.email}</p>
                                    <p>📱 {user.phone}</p>
                                    {user.age && <p>🎂 Age: {user.age}</p>}
                                    {user.course && <p>🎓 {user.course}</p>}
                                    {user.address && <p>📍 {user.address}</p>}
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};