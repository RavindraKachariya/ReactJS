import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";

const TaskInput = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (!text.trim()) return;
        dispatch(addTask(text));
        setText("");
    };

    return (
        <div className="max-w-4xl mx-auto mt-6 px-4">
            <div className="flex gap-3 bg-white p-4 rounded-xl shadow">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your task..."
                    className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition"
                >
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default TaskInput;