import React from "react";
import Proraw from "./customization/Project.json";
import "./styles/main.css";

export function Pro() {
    return (
        <div className="pro">
            {Proraw.projects.map((project, index) => (
                <div className="probox" key={index}>
                    <img 
                        src={require(`${project.project_img}`)} 
                        alt={`${project.project_name} project`} 
                    />
                    <div className="pro-content">
                        <div className="pro-title">
                            {project.project_name}
                        </div>
                        <div className="pro-about">
                            {project.project_about}
                        </div>
                        <div className="pro-bottom">
                            <span className="pro-tool">
                                Tools: {project.project_tool}
                            </span>
                            <span className="pro-link">
                                <a 
                                    target="_blank" 
                                    href={project.project_link} 
                                    rel="noreferrer"
                                    aria-label={`${project.project_name} GitHub link`}
                                >
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Pro;
