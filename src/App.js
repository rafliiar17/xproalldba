import React from "react";
import {Intro} from "./intro";
import {Edu} from "./edu";
import Pub from "./pub";
import Exp from "./exp";
import Pro from "./pro";
import Skl from "./skills";
import { ASCII } from "./tool";
import { Path, Code, Contact } from "./tool";
import "./styles/main.css";
import "./chat";

const paths = ['~\\Home','~\\Education','~\\Experience', '~\\Skills','~\\Project','~\\Certificate','~\\Contact'];

function IntroContent({ index }) {
    return (
        <div id='app'>
            <ASCII />
            <Path path={paths[index - 1]} />
            <Code command='About Me' />
            <Intro />
            <Path path={paths[index +5]} />
            <Code command='Contact Information' />
            <Contact />
        </div>
    );
}

function EduContent({ index }) {
    return (
        <div id='app'>
            <ASCII />
                <Path path={paths[index -5]} />
                <Code command='Education' />
                <Edu />
            <Path path={paths[index -0]} />
            <Code command='Contact Information' />
            <Contact />
        </div>
    );
}
function ExpContent({ index }) {
    return (
        <div id='app'>
            <ASCII />
            <Path path={paths[index ]} />
            <Code command='Work and Internship' />
            <Exp />
            <Path path={paths[index +4]} />
            <Code command='Contact Information' />
            <Contact />
        </div>
    );
}

function SklContent({ index }) {
    return (
        <div id='app'>
            <ASCII />
            <Path path={paths[index]} />
            <Code command='Skills' />
            <Skl />
            <Path path={paths[index +3]} />
            <Code command='Contact Information' />
            <Contact />
        </div>
    );
}

function ProContent({ index }) {
    return (
        <div id='app'>
            <ASCII />
            <Path path={paths[index]} />
            <Code command='Project' />
            <Pro />
            <Path path={paths[index +2]} />
            <Code command='Contact Information' />
            <Contact />
        </div>
    );
}

function PubContent({ index }) {
    return (
        <div id='app'>
            <ASCII />
            <Path path={paths[index - 0]} />
            <Code command='Certificate Owned List' />
            <Pub />
            <Path path={paths[index +1]} />
            <Code command='Contact Information' />
            <Contact />
        </div>
    );
}





function App(props) {
    // eslint-disable-next-line eqeqeq
    if (props.index == 1) {
        return <IntroContent index={props.index} />;
    }
    // eslint-disable-next-line eqeqeq
    else if (props.index == 2) {
        return <ExpContent index={props.index} />;
    }
    // eslint-disable-next-line eqeqeq
    else if (props.index == 3) {
        return <SklContent index={props.index} />;
    }
    // eslint-disable-next-line eqeqeq
    else if (props.index == 4) {
        return <ProContent index={props.index} />;
    }
    // eslint-disable-next-line eqeqeq
    else if (props.index == 5) {
        return <PubContent index={props.index} />;
    }
    // TODO : Project
    // eslint-disable-next-line eqeqeq
    else if (props.index == 6) {
        return <EduContent index={props.index} />;
    }
}

export default App;
