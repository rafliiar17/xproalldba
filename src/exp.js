import React from "react";
import Expraw from "./customization/Experience.json";
import "./styles/main.css";

export function Exp() {
    const result = Expraw.companies.map((company, index) => (
        <div className="edu" key={index}>
            <span class="status">
                <img src={require(`${company.logo}`)} alt="company" />
            </span>
            <span className="text">
            <p className="status-company"style={{ color: '#68c9dc' }}>Status : {company.status}</p>
                <p className="school">{company.name}</p>
                <p className="dep">{company.position_time}</p>
                {company.description.map((desc, descIndex) => (
                    <div key={descIndex} className="description-item">
                        <p className="task"><strong>{desc.task}</strong></p>
                        <p className="details">{desc.details}</p>
                    </div>
                ))}
            </span>
        </div>
    ));

    return (
        <div>
            {result}
        </div>
    );
}

export default Exp;
