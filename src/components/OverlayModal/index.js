import React from 'react';
import './styles.scss';


const OverlayModal = (props) => {
    return (
        <div className={`overlay ${props.open ? 'show' : ''} `} id={"overlay"}>
            <div className={"modalWindow"}>
                {props.content}
            </div>
        </div>
    )
}

export default OverlayModal;