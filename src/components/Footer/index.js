import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PlusIcon from '../../images/Plus.png';
import DeleteIcon from '../../images/Delete.png';
import ShareIcon from '../../images/Share.png';
import Tooltip from './Tooltip/index';
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

    return (
        <div className={`footer ${disabled ? 'disabled' : ''}`}>
            <div className={"buttonsContainer"}>
                <div className={`itemSelectedButtons clickable ${selectedCounterId === null ? 'hidden' : ''}`}>
                    <div>
                        <button className={"secondaryButton"}
                                onClick={() => dispatch(setOpenDeleteConfirmationModal(true))}>
                            <img src={DeleteIcon} alt={""}/>
                        </button>
                        {showTooltip &&
                        <Tooltip counter={selectedCounter} close={() => dispatch(setShowTooltip(false))}/>}
                    </div>
                    <button className={"secondaryButton"} onClick={() => dispatch(setShowTooltip(true))}>
                        <img src={ShareIcon} alt={""}/>
                    </button>
                </div>
                <button className={"mainButton"}
                        onClick={() => dispatch(setOpenAddCounterModal(true))}>
                    <img src={PlusIcon} alt={""}/>
                </button>
            </div>
            {disabled && <div className={"disableOverlay"}/>}
        </div>
    )
}

export default Footer;