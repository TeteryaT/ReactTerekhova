
import React, { useState } from "react";
import "./App.css"; 
function ToDoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите задачу"
        className="input-task"
      />
      <button type="submit" className="btn-add">
        Добавить
      </button>
    </form>
  );
}

// Компонент списка задач
function ToDoItems({ tasks, onToggle }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="checkbox"
            />
            <span className={task.completed ? "completed" : ""}>{task.text}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

// Главный компонент
function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [visibleTasks, setVisibleTasks] = useState([]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const submitFilteredTasks = () => {
    let filtered = tasks;
    if (filter === "completed") {
      filtered = tasks.filter((t) => t.completed);
    } else if (filter === "uncompleted") {
      filtered = tasks.filter((t) => !t.completed);
    }
    setVisibleTasks(filtered);
  };

  return (
    <div className="todo-container">
      <h2 className="title">Список задач</h2>
      <ToDoForm onAdd={addTask} />

      <div className="filter-container">
        <label className="filter-label">Фильтр:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">Все</option>
          <option value="completed">Выполненные</option>
          <option value="uncompleted">Невыполненные</option>
        </select>
        <button
          onClick={submitFilteredTasks}
          className="btn-submit"
        >
          Применить
        </button>
      </div>

      <ToDoItems tasks={visibleTasks.length ? visibleTasks : tasks} onToggle={toggleTask} />
    </div>
  );
}

export default ToDoList;