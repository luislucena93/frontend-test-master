import React, {useCallback} from 'react';
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

    const handleCloseModal = useCallback(() => {
        if (!loading) {
            dispatch(setOpenAddCounterModal(false));
            dispatch(setNewCounterName(""));
        }
    }, [dispatch, loading]);

    const dispatchAddCounter = useCallback((newName) => dispatch(addCounter(newName)), [dispatch]);

    const dispatchSetNewCounterName = useCallback((text) => dispatch(setNewCounterName(text)), [dispatch]);

    const dispatchOpenNamesExamplesModal = useCallback(() => dispatch(setOpenNamesExamplesModal(true)), [dispatch]);

    const header = () => {
        return (
            <div className={"modalHeader"}>
                <img src={CloseIcon} onClick={handleCloseModal} alt={"close"}/>
                <h1>Create counter</h1>
                <button className={"mainButton"} onClick={() => dispatchAddCounter(newCounterName)}
                        disabled={newCounterName === '' || loading}>
                    Save
                </button>
            </div>
        )
    }

    const content = () => {
        return (
            <div className={`modalContent ${loading ? 'disabled' : ''}`} data-testid={"addCounterModalContent"}>
                <InputText value={newCounterName} label={"Name"}
                           setInputText={dispatchSetNewCounterName}/>
                <p className={"message"}>Give it a name. Creative block? <span
                    onClick={dispatchOpenNamesExamplesModal}>See examples.</span></p>
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
