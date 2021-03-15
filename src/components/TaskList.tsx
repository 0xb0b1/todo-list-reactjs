import { useState } from "react";
import { v4 } from "uuid";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
    id: number;
    title: string;
    isComplete: boolean;
}

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    function handleCreateNewTask() {
        const newTask = [
            ...tasks,
            {
                id: Math.floor(Math.random() * 100),
                title: newTaskTitle,
                isComplete: false,
            },
        ];

        if (newTask[newTask.length - 1].title !== "") {
            setTasks(newTask);
            setNewTaskTitle("");
        }
    }

    function handleToggleTaskCompletion(id: number) {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? { ...task, isComplete: !task.isComplete }
                    : task
            )
        );
    }

    function handleRemoveTask(id: number) {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    return (
        <section className="task-list container">
            <header>
                <h2>My tasks</h2>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="New task"
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        value={newTaskTitle}
                    />
                    <button
                        type="submit"
                        data-testid="add-task-button"
                        onClick={handleCreateNewTask}
                    >
                        <FiCheckSquare size={16} color="#fff" />
                    </button>
                </div>
            </header>

            <main>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <div
                                className={task.isComplete ? "completed" : ""}
                                data-testid="task"
                            >
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        readOnly
                                        checked={task.isComplete}
                                        onClick={() =>
                                            handleToggleTaskCompletion(task.id)
                                        }
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <p>{task.title}</p>
                            </div>

                            <button
                                type="button"
                                data-testid="remove-task-button"
                                onClick={() => handleRemoveTask(task.id)}
                            >
                                <FiTrash size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    );
}
