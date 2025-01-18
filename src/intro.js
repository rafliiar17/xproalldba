import React from "react";
import head from "./img/me5.jpg";
import "./styles/main.css";
import Introraw from './customization/Introduction.json';

// Perbaikan nama komponen: ReadIntro
export function ReadIntro() {
    return (
        <span className="text block-long">
            {Introraw.intro}
            <p>
                <a className="icon-link" target="_blank" href={Introraw.linkedin} rel="noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                </a>
                <a className="icon-link" target="_blank" href={Introraw.glints} rel="noreferrer">
                    <i className="fa-solid fa-briefcase" style={{ color: '#40e7ff' }}></i>
                </a>
                <a className="icon-link" target="_blank" href={Introraw.github} rel="noreferrer">
                    <i className="fa-brands fa-github"></i>
                </a>
                <a className="icon-link" target="_blank" href={Introraw.upwork} rel="noreferrer">
                    <i className="fa-brands fa-upwork" style={{ color: '#0fff57' }}></i>
                </a>
                <a className="icon-link" target="_blank" href={Introraw.instagram} rel="noreferrer">
                    <i className="fa-brands fa-instagram" style={{ color: '#C13584' }}></i>
                </a>
                <a className="icon-link" target="_blank" href={Introraw.x} rel="noreferrer">
                    <i className="fa-brands fa-twitter" style={{ color: '#1DA1F2' }}></i>
                </a>
                <a className="icon-link" target="_blank" href={Introraw.cv} rel="noreferrer">
                    <i className="fa-solid fa-file-signature" style={{ color: '#f80000' }}></i>
                </a>
                <a className="icon-link" target="_blank" href={Introraw.whatsapp} rel="noreferrer">
                    <i className="fa-brands fa-whatsapp" style={{ color: '#25D366' }}></i>
                </a>
            </p>
        </span>
    );
}

// Perbaikan nama komponen: ReadIntro
export function Intro() {
    return (
        <div className="intro">
            <span id="block">
                <img src={head} alt="Profile Headshot" />
            </span>
            <ReadIntro />
        </div>
    );
}
