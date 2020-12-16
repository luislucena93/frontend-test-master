import React, {useState} from 'react';
import SearchIcon from '../../images/Search.png';
import SearchIconDisabled from '../../images/Search-disabled.png'
import './styles.scss';

const InputText = (props) => {
    const [focused, setFocused] = useState(false);
    const [text, setText] = useState('');
    return (
        <div className={"searchBar"}>
            <div className={`searchBox ${props.disabled ? 'disabled ' : ''} ${focused || text != '' ? 'inUse' : ''}`}>
                <img src={props.disabled ? SearchIcon : SearchIconDisabled}/>
                <input value={text} placeholder={props.placeholder} disabled={props.disabled}
                       onFocus={() => setFocused(true)}
                       onBlur={() => setFocused(false)} onChange={e => setText(e.target.value)}/>
            </div>
            {(focused || text !== '') &&
            <div className={"cancelButton"}>
                <button onClick={() => setText('')}>Cancel</button>
            </div>}
        </div>
    )
}

export default InputText;