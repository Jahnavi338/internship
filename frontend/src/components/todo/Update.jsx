/*import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
const Update = ({ display, update }) => {
  useEffect(() => {
    if (update) {
      setInputs({
        title: update.title,
        body: update.body,
      });
    }
  }, [update]);
  const [Inputs, setInputs] = useState({
    title: "",
    body: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async () => {
    if (!update || !update.id) {
      toast.error("Invalid Task");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/updateTask/${update.id}`,
        Inputs
      );
      toast.success(response.data.message);
      display("none"); // Close the popup after success
    } catch (error) {
      toast.error("Failed to update task");
      console.log(error);
    }
  };
  return (
    <div className="p-5 d-flex justify-content-center align-items-center flex-column update">
      <h3>Update your Task</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        value={Inputs.title}
        name="title"
        onChange={change}
      />
      <textarea
        className="todo-inputs w-100 p-3"
        value={Inputs.body}
        name="body"
        onChange={change}
      />
      <div>
        <button className="btn btn-dark my-4" onClick={submit}>
          Update
        </button>
        <button
          className="btn btn-danger my-4 mx-3"
          onClick={() => {
            display("none");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;*/

import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const Update = ({ display, update }) => {
  useEffect(() => {
    if (update) {
      setInputs({
        title: update.title,
        body: update.body,
      });
    }
  }, [update]);

  const [Inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    // Fixed: Better validation and error handling
    if (!update || !update.id) {
      toast.error("Invalid Task - No task selected for update");
      return;
    }

    // Validate input fields
    if (!Inputs.title.trim() || !Inputs.body.trim()) {
      toast.error("Title and Body cannot be empty");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/updateTask/${update.id}`,
        {
          title: Inputs.title.trim(),
          body: Inputs.body.trim(),
        }
      );

      if (response.data && response.data.message) {
        toast.success(response.data.message);
      } else {
        toast.success("Task updated successfully");
      }

      display("none"); // Close the popup after success
    } catch (error) {
      console.error("Update error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update task");
      }
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-center flex-column update">
      <h3>Update your Task</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        value={Inputs.title}
        name="title"
        onChange={change}
        placeholder="Enter task title"
      />
      <textarea
        className="todo-inputs w-100 p-3"
        value={Inputs.body}
        name="body"
        onChange={change}
        placeholder="Enter task description"
        rows="4"
      />
      <div>
        <button className="btn btn-dark my-4" onClick={submit}>
          Update
        </button>
        <button
          className="btn btn-danger my-4 mx-3"
          onClick={() => {
            display("none");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
