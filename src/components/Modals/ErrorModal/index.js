import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    decrementCounter,
    deleteCounter,
    ERROR_ADD_COUNTER, ERROR_DEC_COUNTER, ERROR_DEL_COUNTER, ERROR_INC_COUNTER, incrementCounter, setOpenErrorModal,
} from "../../../actions/index";

const ErrorModal = () => {
    const dispatch = useDispatch();
    const {counter, open, connectionError} = useSelector(state => ({
        counter: state.counters.find(counter => counter.id === state.selectedCounter) || {},
        open: state.openErrorModal,
        connectionError: state.connectionError
    }));

    const getTitle = () => {
        switch (connectionError) {
            case ERROR_DEL_COUNTER:
                return `Couldn’t delete “${counter.title}”`;
            case ERROR_ADD_COUNTER:
                return "Couldn’t create counter";
            case ERROR_INC_COUNTER:
                return `Couldn’t update “${counter.title}” to ${counter.count + 1}`;
            case ERROR_DEC_COUNTER:
                return `Couldn’t update “${counter.title}” to ${counter.count - 1}`;
            default:
                return 'Something went wrong';
        }
    }

    const getModalButtons = () => {
        let retryButtonAction;
        switch (connectionError) {
            case ERROR_DEL_COUNTER:
                retryButtonAction = deleteCounter(counter.id);
                break;
            case ERROR_DEC_COUNTER:
                retryButtonAction = decrementCounter(counter.id);
                break;
            case ERROR_INC_COUNTER:
                retryButtonAction = incrementCounter(counter.id);
                break;
            default:
                break
        }
        return (
            <div className={"modalButtons"}>
                {connectionError !== ERROR_ADD_COUNTER &&
                <button className={"mainButton"} onClick={() => dispatch(retryButtonAction)}>Retry</button>
                }
                <button className={connectionError !== ERROR_ADD_COUNTER ? "secondaryButton" : "mainButton"}
                        onClick={() => dispatch(setOpenErrorModal(false))}>Dismiss
                </button>
            </div>
        )
    }

    const modalContent = () => {
        return (
            <div className={"modalContentContainer"}>
                <p className={"modalTitle"}>{getTitle()}</p>
                <p className={"modalSubtitle"}>The Internet connection appears to be offline.</p>
                {getModalButtons()}
            </div>
        )
    }
    return (
        <div className={`overlay clickable ${open ? 'show' : ''}`}>
            <div className={"modalWindow"}>
                {modalContent()}
            </div>
        </div>
    )
}

export default ErrorModal