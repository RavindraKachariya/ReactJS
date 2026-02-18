import React from "react";
import { useParams } from "react-router-dom";

function StudentDetails() {
    const { id } = useParams();
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students.find((s) => s.id === Number(id));

    if (!student) return <h3>Student Not Found</h3>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Student Details</h2>
            <p>Name: {student.name}</p>
            <p>Course: {student.course}</p>
        </div>
    );
}

export default StudentDetails;
