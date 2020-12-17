import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PlusIcon from '../../images/Plus.png';
import DeleteIcon from '../../images/Delete.png';
import ShareIcon from '../../images/Share.png';
import './styles.scss';
import {setOpenAddCounterModal, setOpenDeleteConfirmationModal} from "../../actions/index";

const Footer = (props) => {
    const dispatch = useDispatch();
    const selectedCounter = useSelector(state => state.selectedCounter);


    return (
        <div className={`footer ${props.disabled ? 'disabled' : ''}`}>
            <div className={`itemSelectedButtons ${selectedCounter == null ? 'hidden' : ''}`}
                 id={"itemSelectedButtons"}>
                <button onClick={() => dispatch(setOpenDeleteConfirmationModal(true))}>
                    <img src={DeleteIcon}/>
                </button>
                <button>
                    <img src={ShareIcon}/>
                </button>
            </div>
            <div className={"addButton"}>
                <button disabled={props.disabled} onClick={() => dispatch(setOpenAddCounterModal(true))}>
                    <img src={PlusIcon}/>
                </button>
            </div>
        </div>
    )
}

export default Footer;