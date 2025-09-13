import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  // creating tasks list
  const [todoList, setTodoList] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  // Ref To input
  const input = useRef();
  // add task
  function addTask() {
    if (input.current.value.trim() !== "") {
      const task = {
        id: Date.now(),
        title: input.current.value,
        completed: false,
      };
      setTodoList((todoList) => [...todoList, task]);
      // localStorage.setItem("tasks", JSON.stringify(todoList)); like that setlocal will use old value before updating (setUsestate is async operation)
      console.log(todoList);
      input.current.value = "";
    }
  }

  // update LocalStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todoList));
  }, [todoList]);

  // delete Task
  function deleteTask(id) {
    setTodoList((todoList) => todoList.filter((task) => task.id !== id));
  }

  // complete task
  function doneTask(id) {
    setTodoList((todoList) => {
      return todoList.map((task) => {
        return task.id === id ? { ...task, completed: !task.completed } : task;
      });
    });
  }

  // Delete All Button

  function deleteAll() {
    setTodoList([]);
    localStorage.removeItem("tasks");
  }
  return (
    <div className="container">
      <h1>Todo-List React App</h1>
      <div className="field">
        <input
          className="input"
          type="text"
          ref={input}
          onKeyDown={(event) => event.key === "Enter" && addTask()}
        />
        <button className="add" onClick={addTask}>
          Add Task
        </button>
      </div>
      <div className="tasks-container">
        <ul className="tasks">
          {todoList.map((task) => {
            return (
              <li
                key={task.id}
                onClick={() => doneTask(task.id)}
                className={task.completed ? "done" : ""}
              >
                {task.title}
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteTask(task.id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
        {todoList.length > 0 && <RemoveAll onClick={deleteAll} />}
      </div>
    </div>
  );
}

function RemoveAll({ onClick }) {
  return (
    <button className="remove-all" onClick={onClick}>
      Remove All
    </button>
  );
}

export default App;

/*
State Update is Asynchronous
setTodoList([...todoList, task]) does not update todoList immediately.
So console.log(todoList) and localStorage.setItem right after it will use the old list, missing the new task.
*/
