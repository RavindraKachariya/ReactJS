import React from "react";
import StudentItem from "./StudentItem";

function StudentList({ students, handleEdit, handleDelete }) {
    if (students.length === 0) {
        return <p className="text-center text-gray-500">No Students Found</p>;
    }

    return (
        <div className="space-y-2">
            {students.map((student) => (
                <StudentItem
                    key={student.id}
                    student={student}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
}

export default StudentList;