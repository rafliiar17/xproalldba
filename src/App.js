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
            <Path path={paths[0]} />
            <Code command='About Me' />
            <Intro />
            <Path path={paths[6]} />
            <Code command='Contact Information' />
            <Contact />
        </div>
    );
}

function EduContent({ index }) {
    return (
        <div id='app'>
            <ASCII />
            <Path path={paths[1]} />
            <Code command='Education' />
            <Edu />
            <Path path={paths[6]} />
            <Code command='Contact Information' />
            <Contact />
        </div>
    );
}

function ExpContent({ index }) {
    return (
        <div id='app'>
            <ASCII />
            <Path path={paths[2]} />
            <Code command='Work and Internship' />
            <Exp />
            <Path path={paths[6]} />
            <Code command='Contact Information' />
            <Contact />
        </div>
    );
}

function SklContent({ index }) {
    return (
        <div id='app'>
            <ASCII />
            <Path path={paths[3]} />
            <Code command='Skills' />
            <Skl />
            <Path path={paths[6]} />
            <Code command='Contact Information' />
            <Contact />
        </div>
    );
}

function ProContent({ index }) {
    return (
        <div id='app'>
            <ASCII />
            <Path path={paths[4]} />
            <Code command='Project' />
            <Pro />
            <Path path={paths[6]} />
            <Code command='Contact Information' />
            <Contact />
        </div>
    );
}

function PubContent({ index }) {
    return (
        <div id='app'>
            <ASCII />
            <Path path={paths[5]} />
            <Code command='Certificate Owned List' />
            <Pub />
            <Path path={paths[6]} />
            <Code command='Contact Information' />
            <Contact />
        </div>
    );
}

function App(props) {
    return (
        <>

            {
                // eslint-disable-next-line eqeqeq
                props.index == 1 ? <IntroContent index={props.index} /> :
                // eslint-disable-next-line eqeqeq
                props.index == 2 ? <EduContent index={props.index} /> :
                // eslint-disable-next-line eqeqeq
                props.index == 3 ? <ExpContent index={props.index} /> :
                // eslint-disable-next-line eqeqeq
                props.index == 4 ? <SklContent index={props.index} /> :
                // eslint-disable-next-line eqeqeq
                props.index == 5 ? <ProContent index={props.index} /> :
                // eslint-disable-next-line eqeqeq
                props.index == 6 ? <PubContent index={props.index} /> : null
            }
        </>
    );
}

export default App;
