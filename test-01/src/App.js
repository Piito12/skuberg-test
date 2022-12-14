import "./App.css";
import React, { useState } from "react";

function App() {
  const todoList = JSON.parse(localStorage.getItem("todos"));
  console.log(todoList);
  const [todos, setTodos] = useState([...(todoList || [])]);
  const [input, setInput] = useState("");
  const [edit, setedit] = useState("");
  const [editInput, seteditInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (input === "") return;
    const data = {
      id: Date.now(),
      value: input,
      completed: false,
    };
    localStorage.setItem("todos", JSON.stringify([...todos, data]));
    setTodos([...todos, data]);
    setInput("");
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleComplete = (id) => {
    const newTodos = todos.map((val) => {
      if (val.id === id) {
        val.completed = !val.completed;
      }
        return val;
    }
    );
    

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleEditSubmited = (e) => {
    const newTodos = todos.map((val)=>{
      if(val.id === edit){
        val.value = editInput
      }
      return val
    })
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  console.log(todos);
  return (
    <div className="App">
      
      <div className="todo-container">
        <div className="todo-box bg-slate-100 w-[800px] py-[100px] rounded-3xl flex flex-col items-center justify-start">
          <div className="todo-header text-[45px] font-bold text-gray-500  m-[20px] ">
            TO-DO
          </div>
          <div className="body-container">
            <div className="form-container">
              <form className="todo-form p-3 mb-7 flex flex-row  items-center" onSubmit={onSubmit}>
                <input
                  value={input}
                  onChange={(e) => {
                    e.preventDefault();
                    setInput(e.target.value);
                  }}
                  className="todo-input w-[600px] px-5 py-5  border-gray-500 border-2 rounded-[10px] focus:border-red-200 focus:berder-none font-bold"
                  type="text"
                  placeholder="Add a new task"
                />
                <button
                  className="todo-submit ml-3 font-bold text-[30px] bg-slate-400 rounded-[10px] px-[10px] hover:bg-slate-500 hover:text-slate-100 "
                  type="submit"
                >
                  +
                </button>
              </form>
              <div className="todo-display">
                <div className="todo-list-box ">
                  {!todos
                    ? null
                    : todos.map((items) => {
                        return (
                          <div
                            key={items.id}
                            className="todo-items my-3 bg-slate-50 py-3 text-slate-900 text-[24px] font-blod rounded-xl p-5"
                          >
                            <div className="todo-item flex flex-row justify-between ">
                              <div className="todo-content">
                                <label className="checkbox flex flex-row justify-center items-center ">
                                  <input
                                    className="checkmark"
                                    onChange={() => {
                                      handleComplete(items.id);
                                    }}
                                    type="checkbox"
                                    checked={items.completed}
                                  />
                                  <span className="checkmark ml-3">
                                    {items.id === edit && isEdit ? (
                                      <span>
                                        <form  onSubmit={handleEditSubmited}>
                                        <input onChange={(e)=> seteditInput(e.target.value)} />
                                        </form>
                                      </span>
                                    ) : (
                                      items.value
                                    )}
                                  </span>
                                </label>
                              </div>
                              <div className="todo-action flex flex-row justify-center">
                                <button
                                  className="edit-button mr-3"
                                  onClick={() => {
                                    setIsEdit(!isEdit);
                                    setedit(items.id);
                                  }}
                                >
                                  <img src="https://cdn-icons-png.flaticon.com/512/2356/2356780.png" alt="edit"  width={20} height={20} />
                                </button>
                                <button
                                  className="delete-button "
                                  onClick={() => {
                                    handleDelete(items.id);
                                  }}
                                >
                                  <img src="https://cdn-icons-png.flaticon.com/512/4441/4441955.png" alt="delete"  width={25} height={25} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
