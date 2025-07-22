import React from "react";
import { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import Update from "./Update";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useSelector } from "react-redux";
import axios from "axios";

const Todo = () => {
  const [toUpdateTask, setToUpdateTask] = useState(null);
  const [id, setId] = useState(sessionStorage.getItem("id"));
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/v2/getTasks/${id}`
      );
      setArray(response.data.list);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setId(sessionStorage.getItem("id"));
  }, [sessionStorage.getItem("id")]);

  useEffect(() => {
    if (id) {
      fetchTasks();
    }
  }, [id]);
  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title or Body should not be empty");
    } else {
      if (id) {
        await axios
          .post("http://localhost:1000/api/v2/addTask", {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          })
          .then((response) => {
            console.log(response);
          });

        setInputs({ title: "", body: "" });
        toast.success("Your task is added");
        fetchTasks();
      } else {
        setArray([...Array, Inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Your task is added");
        toast.error("Your task is not saved!please signup");
      }
    }
  };
  const del = async (Cardid) => {
    if (id) {
      await axios
        .delete(`http://localhost:1000/api/v2/deleteTask/${Cardid}`, {
          data: { id: id },
        })
        .then((response) => {
          toast.success("Task deleted");
          fetchTasks();
        });
    } else {
      toast.error("Please signup first");
    }
  };
  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
    if (value === "none") {
      fetchTasks(); // Refresh tasks when update is closed
    }
  };
  const update = (task) => {
    setToUpdateTask(task);
  };
  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center mt-3 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-50">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              name="body"
              value={Inputs.body}
              placeholder="BODY"
              className="p-2 todo-inputs"
              onChange={change}
            />
          </div>
          <div className="w-50 d-flex justify-content-end my-3">
            <button className="home-btn px-2" onClick={submit}>
              ADD
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {Array &&
                Array.map((item) => (
                  <div className="col-lg-3 col-8 mx-5 mt-2" key={item._id}>
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          {""}
          <Update display={dis} update={toUpdateTask} />
        </div>
      </div>
    </>
  );
};

export default Todo;
