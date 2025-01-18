import React from "react";
import SklRaw from "./customization/Skills.json";
import "./styles/main.css";

export function Skl() {
    const result = SklRaw.skills.map((skill) => (
        <div className="edu" key={skill.name}>
            <span class="status">
                {/* Assuming you have a way to import or handle the logo dynamically */}
                <img src={require(`${skill.logo}`)} alt="company" />
            </span>
            <span className="text">
                <p className="school">{skill.name}</p>
                <p className="dep">{skill.tools}</p>
                <p className="time">{skill.description}</p>
            </span>
        </div>
    ));

    return <>{result}</>;
}

export default Skl;
