import React from 'react';
import './styles.scss';

const InputText = (props) => {

    return (
        <div>
            <p className={"inputLabel"}>{props.label}</p>
            <div className={"searchBox simple"}>
                <input value={props.value} placeholder={props.placeholder} disabled={props.disabled}
                       onChange={(e) => props.setInputText(e.target.value)}/>
            </div>
        </div>
    )
};

export default InputText;