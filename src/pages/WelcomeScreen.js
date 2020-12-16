import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../images/Logo.png';
import '../styles/welcomeScreenStyles.scss';

const WelcomeScreen = () => {
    return (
        <div className={"container"}>
            <img className={"logo"} src={Logo}/>
            <h1 className={"title"}>Welcome to counters</h1>
            <h2 className={"subtitle"}>Capture cups of lattes, frapuccinos, or anything else that can be
                counted.</h2>
            <div className={"mainButton"}>
                <Link to={"/mainScreen"}>
                    <button>Get started</button>
                </Link>
            </div>
        </div>
    )
}

export default WelcomeScreen;

