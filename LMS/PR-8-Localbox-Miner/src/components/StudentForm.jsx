import React, { useState, useEffect } from "react";

function StudentForm({ handleSave, editStudent }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (editStudent) {
            setName(editStudent.name);
            setEmail(editStudent.email);
        }
    }, [editStudent]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email) return;

        handleSave({ id: editStudent?.id, name, email });

        setName("");
        setEmail("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 mb-4">
            <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full rounded"
            />

            <input
                type="email"
                placeholder="Student Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full rounded"
            />

            <button className="bg-blue-500 text-white w-full py-2 rounded">
                {editStudent ? "Update Student" : "Add Student"}
            </button>
        </form>
    );
}

export default StudentForm;