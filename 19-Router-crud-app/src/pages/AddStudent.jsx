import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStudent() {
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        const students = JSON.parse(localStorage.getItem("students")) || [];

        const newStudent = {
            id: Date.now(),
            name,
            course,
        };

        localStorage.setItem(
            "students",
            JSON.stringify([...students, newStudent])
        );

        navigate("/");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Add Student</h2>
            <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Course"
                onChange={(e) => setCourse(e.target.value)}
            />
            <button onClick={handleSubmit}>Save</button>
        </div>
    );
}

export default AddStudent;
