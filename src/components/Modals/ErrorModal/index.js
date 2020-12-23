import React, {useCallback} from 'react';
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

    const dispatchDeleteCounter = useCallback((counterId) => dispatch(deleteCounter(counterId)), [dispatch]);

    const dispatcDecrementCounter = useCallback((counterId) => dispatch(decrementCounter(counterId)), [dispatch]);

    const dispatchIncrementCounter = useCallback((counterId) => dispatch(incrementCounter(counterId)), [dispatch]);

    const dispatchCloseErrorModal = useCallback(() => setTimeout(() => dispatch(setOpenErrorModal(false)), 1), [dispatch]);

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
                retryButtonAction = dispatchDeleteCounter;
                break;
            case ERROR_DEC_COUNTER:
                retryButtonAction = dispatcDecrementCounter;
                break;
            case ERROR_INC_COUNTER:
                retryButtonAction = dispatchIncrementCounter;
                break;
            default:
                break
        }
        return (
            <div className={"modalButtons"}>
                {connectionError !== ERROR_ADD_COUNTER &&
                <button className={"mainButton"} onClick={() => setTimeout(() => retryButtonAction(counter.id), 1)}>
                    Retry</button>
                }
                <button className={connectionError !== ERROR_ADD_COUNTER ? "secondaryButton" : "mainButton"}
                        onClick={dispatchCloseErrorModal}>
                    Dismiss
                </button>
            </div>
        )
    }

    const ModalContent = () => {
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
            <div className={"modalWindow clickable"}>
                <ModalContent/>
            </div>
        </div>
    )
}

export default ErrorModal