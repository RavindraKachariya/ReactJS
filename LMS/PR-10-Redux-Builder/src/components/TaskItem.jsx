import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    deleteTask,
    toggleTask,
    editTask,
} from "../features/tasks/taskSlice";

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [newText, setNewText] = useState(task.text);

    const handleEdit = () => {
        if (!newText.trim()) return;
        dispatch(editTask({ id: task.id, text: newText }));
        setEditMode(false);
    };

    return (
        <div className="flex justify-between items-center bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">

            {/* Left Side */}
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(toggleTask(task.id))}
                    className="w-5 h-5"
                />

                {editMode ? (
                    <input
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="border p-1 rounded"
                    />
                ) : (
                    <span
                        className={`text-lg ${task.completed
                                ? "line-through text-gray-400"
                                : "text-gray-800"
                            }`}
                    >
                        {task.text}
                    </span>
                )}
            </div>

            {/* Right Side Buttons */}
            <div className="flex gap-2">
                {editMode ? (
                    <button
                        onClick={handleEdit}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setEditMode(true)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded-lg"
                    >
                        Edit
                    </button>
                )}

                <button
                    onClick={() => dispatch(deleteTask(task.id))}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;