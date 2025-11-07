import React, { useState } from "react";
import { Moon, Sun, Edit2, Trash2 } from "lucide-react";
import qdruv from '../components/img/qdruv.png'

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (!inputText.trim()) return;

    if (editingId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: inputText } : todo
        )
      );
      setEditingId(null);
    } else {
      setTodos([{ id: Date.now(), text: inputText, completed: false }, ...todos]);
    }
    setInputText("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setInputText(todo.text);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-2xl mx-auto">

        <h1 className={`text-3xl font-bold text-center mb-6 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}>
          TODO LIST
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search note...."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            className={`flex-1 px-4 py-2 rounded-lg border outline-none ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
            }`}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg"
          >
            {editingId ? "UPDATE" : "ALL"}
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-indigo-600 text-white"
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full cursor-pointer border transition-colors ${
                filter === f
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
        

        {filteredTodos.length === 0 ? (
          <p className={`text-center py-10 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>loading...</p>
        ) : (
          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="w-5 h-5 cursor-pointer"
                />
                <span className={`flex-1 ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : isDarkMode
                    ? "text-gray-200"
                    : "text-gray-800"
                }`}>{todo.text}</span>

                <button onClick={() => startEdit(todo)} className="text-indigo-500 cursor-pointer">
                  <Edit2 size={18} />
                </button>

                <button onClick={() => deleteTodo(todo.id)} className="text-red-500 cursor-pointer">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
       <div className="flex justify-center"><img src={qdruv} alt="" /></div>
      </div>
    </div>
  );
};

export default TodoList;
 