import React from 'react';
import {useDispatch} from 'react-redux';
import './styles.scss';
import {getCounters} from "../../../actions/index";

const ErrorScreen = (props) => {
        const {handleRetryClick} = props;
        return (
            <div className={"container"}>
                <h1 className={"title"}>Couldn’t load the counters</h1>
                <h2 className={"subtitle error"}>“The Internet connection appears to be offline.”</h2>
                <button className={"secondaryButton"} onClick={() => handleRetryClick()}>Retry</button>
            </div>
        );
    }
;

export default ErrorScreen;