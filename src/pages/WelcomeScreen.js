import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../images/Logo.png';

const WelcomeScreen = () => {
    return (
        <div className={"container"}>
            <img className={"logo"} src={Logo} alt={""}/>
            <h1 className={"title"}>Welcome to counters</h1>
            <h2 className={"subtitle"}>Capture cups of lattes, frapuccinos, or anything else that can be counted.</h2>
            <Link to={"/mainScreen"}>
                <button className={"mainButton"}>Get started</button>
            </Link>
        </div>
    )
}

export default WelcomeScreen;

