import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.tasks);

    return (
        <div className="max-w-4xl mx-auto mt-6 px-4 space-y-3">
            {tasks.length === 0 ? (
                <p className="text-center text-gray-500">
                    No tasks yet. Add one
                </p>
            ) : (
                tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))
            )}
        </div>
    );
};

export default TaskList;