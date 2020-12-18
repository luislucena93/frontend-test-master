import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCounter, setOpenDeleteConfirmationModal} from "../../../actions/index";

const DeleteConfirmationModal = () => {
    const dispatch = useDispatch();
    const {counter, open} = useSelector(state => ({
        counter: state.counters.find(counter => counter.id === state.selectedCounter),
        open: state.openDeleteConfirmationModal
    }));

    const modalContent = () => {
        return (
            <div className={"modalContentContainer"}>
                <p className={"modalTitle"}>Delete the "{counter ? counter.title : ""}" counter?</p>
                <p className={"modalSubtitle"}>This cannot be undone</p>
                <div className={"modalButtons"}>
                    <button className={"mainButton"} onClick={() => dispatch(setOpenDeleteConfirmationModal(false))}>
                        Cancel
                    </button>
                    <button className={"secondaryButton deleteButton"}
                            onClick={() => dispatch(deleteCounter(counter.id))}>Delete
                    </button>
                </div>
            </div>
        )
    }
    return (
        <div className={`overlay clickable ${open ? 'show' : ''} `}>
            <div className={"modalWindow"}>
                {modalContent()}
            </div>
        </div>
    )
}

export default DeleteConfirmationModal