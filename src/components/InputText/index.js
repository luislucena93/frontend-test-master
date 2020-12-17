import React, {useState} from 'react';
import './styles.scss';

const InputText = (props) => {

    const handleTextChange = (e) => {
        props.setInputText(e.target.value);
    }

    return (
        <div>
            <p className={"inputLabel"}>{props.label}</p>
            <div className={"searchBox simple"}>
                <input value={props.value} placeholder={props.placeholder} disabled={props.disabled}
                       onChange={handleTextChange}/>
            </div>
        </div>
    )
}

export default InputText;