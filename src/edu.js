import React from "react";
import "./styles/main.css";
import Eduraw from './customization/Education.json';

export function Edu() {
    return (
        <>
            {Eduraw.schools.map((school) => (
                <div className="edu" key={school.name}>
                    <span className="status">
                        <img src={require(`${school.logo}`)} alt={`${school.name} logo`} />
                    </span>
                    <span className="text">
                        <p className="school">{school.name}</p>
                        <p className="dep">{school.degree}</p>
                        <p className="time">{school.time}</p>
                    </span>
                </div>
            ))}
        </>
    );
}
