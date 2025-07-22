import React from "react";
import "./about.css";
const About = () => {
  return (
    <div className="about d-flex justify-content-center align-items-center">
      <div className="container">
        <h1 style={{ fontWeight: 400 }}>About</h1>
        <p>
          Welcome to TODO, your smart and simple task manager. Designed to help
          you stay organized and focused, TODO lets you create, manage, and
          track your daily tasks with ease. Whether it’s work, studies, or
          personal goals, this app helps you prioritize tasks, set deadlines,
          and stay on top of your day. With a clean interface and user-friendly
          features, TODO is built for everyone who wants to boost their
          productivity and manage time effectively. <br />
          Life gets busy — and that’s exactly why we built TODO. It’s a simple
          yet powerful task management application designed to help you stay
          organized in both your personal and professional life. With TODO, you
          can effortlessly add, edit, and manage tasks, set deadlines, and mark
          tasks as complete once you achieve them.
          <br />
          Our goal is to help you break down big goals into manageable tasks, so
          you can stay focused and productive every single day. Whether you’re
          planning daily routines, organizing work projects, or simply making a
          grocery list — TODO keeps you on track.
          <br />
          This application features a clean, responsive design and is accessible
          from any device, making it your go-to tool for managing tasks on the
          go.
          <br />
          TODO was developed by Jahnavi Medagam as a part of a learning project
          in web development, aiming to create meaningful solutions that solve
          everyday problems. This project reflects a deep interest in building
          user-friendly applications that contribute to better productivity and
          time management. We believe productivity starts with the right tools —
          and TODO is here to be that tool for you.
        </p>
      </div>
    </div>
  );
};

export default About;
