import React, {useState} from 'react';
import Plus from '../../images/Plus.png';
import './styles.scss';

const Footer = (props) => {
    return (
        <div className={`footer ${props.disabled ? 'disabled' : ''}`}>
            <div className={"addButton"}>
                <button disabled={props.disabled}>
                    <img src={Plus}/>
                </button>
            </div>
        </div>
    )
}

export default Footer;