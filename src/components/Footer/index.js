import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PlusIcon from '../../images/Plus.png';
import DeleteIcon from '../../images/Delete.png';
import ShareIcon from '../../images/Share.png';
import Tooltip from './Tooltip/index';
import DisableOverlay from '../DisableOverlay/index';
import './styles.scss';
import {setOpenAddCounterModal, setOpenDeleteConfirmationModal, setShowTooltip} from "../../actions/index";

const Footer = () => {
    const dispatch = useDispatch();
    const {selectedCounterId, selectedCounter, disabled, showTooltip} = useSelector(state => ({
        selectedCounterId: state.selectedCounter,
        selectedCounter: state.counters.find((counter) => counter.id === state.selectedCounter) || {},
        disabled: (state.searchFilter.isActive && state.searchFilter.text === '') || state.loading,
        showTooltip: state.showTooltip
    }));

    const dispatchCloseTooltip = useCallback(() => dispatch(setShowTooltip(false)), [dispatch]);

    const dispatchOpenTooltip = useCallback(() => dispatch(setShowTooltip(true)), [dispatch]);

    const dispatchOpenDeleteConfirmationModal = useCallback(() => dispatch(setOpenDeleteConfirmationModal(true)), [dispatch]);

    const dispatchOpenAddCounterModal = useCallback(() => dispatch(setOpenAddCounterModal(true)), [dispatch]);

    return (
        <div className={`footer ${disabled ? 'disabled' : ''}`}>
            <div className={"buttonsContainer"}>
                <div className={`itemSelectedButtons clickable ${selectedCounterId === null ? 'hidden' : ''}`}>
                    <div>
                        <button className={"secondaryButton"}
                                onClick={dispatchOpenDeleteConfirmationModal}>
                            <img src={DeleteIcon} alt={"delete"}/>
                        </button>
                        {showTooltip &&
                        <Tooltip counter={selectedCounter} close={dispatchCloseTooltip}/>}
                    </div>
                    <button className={"secondaryButton"} onClick={dispatchOpenTooltip}>
                        <img src={ShareIcon} alt={"share"}/>
                    </button>
                </div>
                <button className={"mainButton"}
                        onClick={dispatchOpenAddCounterModal}>
                    <img src={PlusIcon} alt={"plus"}/>
                </button>
            </div>
            <DisableOverlay disabled={disabled}/>
        </div>
    )
};

export default Footer;