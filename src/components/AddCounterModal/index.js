import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Sheet from 'react-modal-sheet';
import CloseIcon from '../../images/Close.png';
import './styles.scss';
import InputText from "../InputText/index";
import {addCounter, setNewCounterName, setOpenAddCounterModal, setOpenNamesExamplesModal} from "../../actions/index";

const AddCounterModal = () => {
    const dispatch = useDispatch();
    const {open, newCounterName, loading} = useSelector(state => ({
        open: state.openAddCounterModal,
        newCounterName: state.newCounterName,
        loading: state.loading
    }));

    const handleTextChange = (text) => {
        dispatch(setNewCounterName(text));
    }

    const handleCloseModal = () => {
        if (!loading) {
            dispatch(setOpenAddCounterModal(false));
        }
    }

    return (<Sheet isOpen={open} onClose={() => dispatch(setOpenAddCounterModal(false))}>
        <Sheet.Container>
            <Sheet.Header>
                <div className={"modalHeader"}>
                    <img src={CloseIcon} onClick={handleCloseModal}/>
                    <h1>Create counter</h1>
                    <button onClick={() => dispatch(addCounter(newCounterName))}
                            disabled={newCounterName === '' || loading}>Save
                    </button>
                </div>
            </Sheet.Header>
            <Sheet.Content>
                <div className={`modalContent ${loading ? 'disabled' : ''}`}>
                    <InputText value={newCounterName} label={"Name"} setInputText={handleTextChange}/>
                    <p className={"message"}>Give it a name. Creative block? <span
                        onClick={() => dispatch(setOpenNamesExamplesModal(true))}>See examples.</span></p>
                </div>
            </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop/>
    </Sheet>)
}

export default AddCounterModal;
