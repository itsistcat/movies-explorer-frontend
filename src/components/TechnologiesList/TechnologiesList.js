import React from "react";

export default function TechnologiesList() {
  const technologies = ["HTML", "CSS", "JS", "React", "Git", "Express.js", "mongoDB"];
  return (
    <ul className="list technologies-list">
      {technologies.map((tech) => (
        <li className="technologies-list__item" key={tech}>
          {tech}
        </li>
      ))}
    </ul>
  );
}
