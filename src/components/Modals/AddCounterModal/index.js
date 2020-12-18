import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Sheet from 'react-modal-sheet';
import CloseIcon from '../../../images/Close.png'
import InputText from "./InputText/index";
import {addCounter, setNewCounterName, setOpenAddCounterModal, setOpenNamesExamplesModal} from "../../../actions/index";

const AddCounterModal = () => {
    const dispatch = useDispatch();
    const {open, newCounterName, loading} = useSelector(state => ({
        open: state.openAddCounterModal,
        newCounterName: state.newCounterName,
        loading: state.loading
    }));

    const handleCloseModal = () => {
        if (!loading) {
            dispatch(setOpenAddCounterModal(false));
            dispatch(setNewCounterName(""));
        }
    };

    const header = () => {
        return (
            <div className={"modalHeader"}>
                <img src={CloseIcon} onClick={handleCloseModal} alt={""}/>
                <h1>Create counter</h1>
                <button className={"mainButton"} onClick={() => dispatch(addCounter(newCounterName))}
                        disabled={newCounterName === '' || loading}>Save
                </button>
            </div>
        )
    }

    const content = () => {
        return (
            <div className={`modalContent ${loading ? 'disabled' : ''}`}>
                <InputText value={newCounterName} label={"Name"}
                           setInputText={(text) => dispatch(setNewCounterName(text))}/>
                <p className={"message"}>Give it a name. Creative block? <span
                    onClick={() => dispatch(setOpenNamesExamplesModal(true))}>See examples.</span></p>
            </div>
        )
    }

    return (
        <Sheet isOpen={open} onClose={handleCloseModal}>
            <Sheet.Container>
                <Sheet.Header>
                    {header()}
                </Sheet.Header>
                <Sheet.Content>
                    {content()}
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop/>
        </Sheet>
    )
};

export default AddCounterModal;
