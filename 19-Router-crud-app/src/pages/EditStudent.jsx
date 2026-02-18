import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");

    useEffect(() => {
        const students = JSON.parse(localStorage.getItem("students")) || [];
        const student = students.find((s) => s.id === Number(id));
        if (student) {
            setName(student.name);
            setCourse(student.course);
        }
    }, [id]);

    const updateStudent = () => {
        const students = JSON.parse(localStorage.getItem("students")) || [];
        const updated = students.map((s) =>
            s.id === Number(id) ? { ...s, name, course } : s
        );

        localStorage.setItem("students", JSON.stringify(updated));
        navigate("/");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Edit Student</h2>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <input value={course} onChange={(e) => setCourse(e.target.value)} />
            <button onClick={updateStudent}>Update</button>
        </div>
    );
}

export default EditStudent;
