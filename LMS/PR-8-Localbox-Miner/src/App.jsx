import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const data = localStorage.getItem("students");
    if (data) {
      setStudents(JSON.parse(data));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Add or Update Student
  const handleSave = (studentData) => {
    if (editStudent) {
      const updated = students.map((student) =>
        student.id === editStudent.id ? studentData : student
      );
      setStudents(updated);
      setEditStudent(null);
    } else {
      setStudents([...students, { ...studentData, id: Date.now() }]);
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
  };

  const handleDelete = (id) => {
    const filtered = students.filter((student) => student.id !== id);
    setStudents(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-[500px]">
        <h1 className="text-2xl font-bold text-center mb-4">
          Student Management System
        </h1>

        <StudentForm
          handleSave={handleSave}
          editStudent={editStudent}
        />

        <StudentList
          students={students}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;