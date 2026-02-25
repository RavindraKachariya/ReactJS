import React from "react";

function StudentItem({ student, handleEdit, handleDelete }) {
    return (
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm">
            <div>
                <h3 className="font-semibold">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.email}</p>
            </div>

            <div className="space-x-2">
                <button
                    onClick={() => handleEdit(student)}
                    className="bg-yellow-400 px-3 py-1 rounded text-white"
                >
                    Edit
                </button>

                <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 px-3 py-1 rounded text-white"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default StudentItem;