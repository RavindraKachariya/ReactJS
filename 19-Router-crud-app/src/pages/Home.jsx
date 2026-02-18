import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("students")) || [];
        setStudents(data);
    }, []);

    const deleteStudent = (id) => {
        const updated = students.filter((s) => s.id !== id);
        localStorage.setItem("students", JSON.stringify(updated));
        setStudents(updated);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Student List</h2>
            <button onClick={() => navigate("/add")}>Add Student</button>

            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        {student.name} -
                        <Link to={`/student/${student.id}`}> View </Link>
                        <Link to={`/edit/${student.id}`}> Edit </Link>
                        <button onClick={() => deleteStudent(student.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
