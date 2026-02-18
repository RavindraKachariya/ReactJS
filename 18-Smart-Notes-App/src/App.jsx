import React, { useState, useEffect } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [inputName, setInputName] = useState("");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // Load username from sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  // Load notes from localStorage
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleLogin = () => {
    if (inputName.trim() === "") return;
    sessionStorage.setItem("username", inputName);
    setUsername(inputName);
    setInputName("");
  };

  const addNote = () => {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    setNote("");
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const logout = () => {
    sessionStorage.removeItem("username");
    setUsername("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        {!username ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Start Session
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                Welcome, {username} 👋
              </h2>
              <button
                onClick={logout}
                className="text-red-500 text-sm"
              >
                Logout
              </button>
            </div>

            <input
              type="text"
              placeholder="Write a note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-3"
            />

            <button
              onClick={addNote}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 mb-4"
            >
              Add Note
            </button>

            <ul className="space-y-2">
              {notes.map((n, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg"
                >
                  {n}
                  <button
                    onClick={() => deleteNote(index)}
                    className="text-red-500"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

      </div>
    </div>
  );
}

export default App;
