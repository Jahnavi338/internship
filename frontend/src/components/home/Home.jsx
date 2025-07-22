import React from "react";
import "./home.css";
{
  /* importing home.css in home.jsx*/
  /* similarly all jsx need to imported in app.js*/
}
const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container text-center">
        <h1>
          Organise your <br />
          work and life properly
        </h1>
        <p>
          Stay on top of your day <br />— plan, prioritize, and conquer with the
          ultimate task manager built for you
          {/* p-2 indicates padding*/}
        </p>
        <button class="home-btn  p-2">Make Todo List</button>
      </div>
    </div>
  );
};

export default Home;
