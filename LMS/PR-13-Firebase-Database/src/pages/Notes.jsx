import { useState, useEffect, useCallback } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { FiPlus, FiTrash2, FiFileText } from "react-icons/fi";
import { toast } from "react-toastify";

export const Notes = () => {
    const { user } = useAuth();
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch notes from Firestore
    const fetchNotes = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const snap = await getDocs(collection(db, "users", user.uid, "notes"));
            const notesData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            // Sort by created date
            notesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setNotes(notesData);
        } catch (error) {
            console.error("Error:", error);
        }
        setLoading(false);
    }, [user]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchNotes();
    }, [user, fetchNotes]);

    // Add new note
    const addNote = async (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;

        try {
            await addDoc(collection(db, "users", user.uid, "notes"), {
                text: newNote.trim(),
                createdAt: new Date().toISOString()
            });
            setNewNote("");
            fetchNotes();
            toast.success("Note added!");
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to add note");
        }
    };

    // Delete note
    const deleteNote = async (id) => {
        try {
            await deleteDoc(doc(db, "users", user.uid, "notes", id));
            fetchNotes();
            toast.info("Note deleted");
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to delete");
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Add Note Form */}
            <form onSubmit={addNote} className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write your note here..."
                    className="w-full border-0 outline-none resize-none text-gray-700 placeholder-gray-400"
                    rows={3}
                />
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium transition"
                    >
                        <FiPlus />
                        Add Note
                    </button>
                </div>
            </form>

            {/* Notes List */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto" />
                </div>
            ) : notes.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl">
                    <FiFileText className="text-5xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No notes yet. Add your first note!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="bg-white p-5 rounded-2xl shadow-sm group relative"
                        >
                            <p className="text-gray-700 whitespace-pre-wrap">{note.text}</p>
                            <p className="text-xs text-gray-400 mt-3">{formatDate(note.createdAt)}</p>
                            <button
                                onClick={() => deleteNote(note.id)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
