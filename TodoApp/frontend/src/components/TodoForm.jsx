import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ setTodos, fetchData }) => {
  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setNewTodo((prev) => ({
      ...prev,
      body: e.target.value,
    }));
  };

  const postTodo = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/todo/", newTodo);
      setNewTodo({ body: "" });
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-5xl text-black text-center pb-12">Daily Agenda</h1>
      
      <img
        className="mx-auto h-52"
        src="https://img.freepik.com/free-vector/tiny-man-woman-standing-near-list-couple-ticking-off-items-check-list-flat-vector-illustration-daily-routine-busy-lifestyle-concept-banner-website-design-landing-web-page_74855-22067.jpg?w=900&t=st=1706782982~exp=1706783582~hmac=52ae9654f8b27108d6a292156ec34b73107579fc926f4cd0fbb940fe1d6376bd"
        alt="Sunset in the mountains"
      />

      <div className="mx-auto p-6 rounded-lg flex align-middle justify-center items-center">
        <input
          type="text"
          placeholder="Write something here...."
          className="w-[40%] py-2 px-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-blue-300"
          onChange={handleChange}
          value={newTodo.body}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              postTodo();
            }
          }}
        />

        <button
          className="ml-2 px-4 py-2 bg-red-300 text-white rounded-full hover:bg-red-400 focus:outline-none"
          onClick={postTodo}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
