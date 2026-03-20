import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadTasks = () => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
};

const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState = {
    tasks: loadTasks(),
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: {
            reducer: (state, action) => {
                state.tasks.push(action.payload);
                saveTasks(state.tasks);
            },
            prepare: (text) => ({
                payload: {
                    id: nanoid(),
                    text,
                    completed: false,
                },
            }),
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
            saveTasks(state.tasks);
        },

        toggleTask: (state, action) => {
            const task = state.tasks.find(
                (t) => t.id === action.payload
            );
            if (task) {
                task.completed = !task.completed;
            }
            saveTasks(state.tasks);
        },

        editTask: (state, action) => {
            const { id, text } = action.payload;
            const task = state.tasks.find((t) => t.id === id);
            if (task) {
                task.text = text;
            }
            saveTasks(state.tasks);
        },
    },
});

export const { addTask, deleteTask, toggleTask, editTask } =
    taskSlice.actions;

export default taskSlice.reducer;