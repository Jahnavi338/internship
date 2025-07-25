/*import React from "react";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
const TodoCards = ({ title, body, id, delid, display, toBeUpdate }) => {
  return (
    <div className="p-3 todo-card">
      <div>
        <h5>{title}</h5>
        <p className="todo-card-p">{body.split("", 77)}...</p>
        <div className="d-flex justify-content-around">
          <div
            className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
            onClick={() => {
              display("block");
              toBeUpdate({ title, body, id });
            }}
          >
            <GrDocumentUpdate className="card-icons" />
            Update
          </div>
          <div
            className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
            onClick={() => {
              delid(id);
            }}
          >
            <MdDelete className="card-icons del" />
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCards;*/

import React from "react";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, id, delid, display, toBeUpdate }) => {
  return (
    <div className="p-3 todo-card">
      <div>
        <h5>{title}</h5>
        <p className="todo-card-p">{body.split("", 77)}...</p>
        <div className="d-flex justify-content-around">
          <div
            className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
            onClick={() => {
              display("block");
              // Fixed: Pass _id as id property to match Update component expectations
              toBeUpdate({ title, body, id: id }); // id here is actually _id from MongoDB
            }}
          >
            <GrDocumentUpdate className="card-icons" />
            Update
          </div>
          <div
            className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
            onClick={() => {
              delid(id);
            }}
          >
            <MdDelete className="card-icons del" />
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
