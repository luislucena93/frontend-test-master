import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import SearchIcon from '../../images/Search.png';
import SearchIconDisabled from '../../images/Search-disabled.png'
import './styles.scss';
import {setSearchFilterActive, setSearchFilterText} from "../../actions/index";

const SearchBar = (props) => {
    const [focused, setFocused] = useState(false);
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleOnFocus = () => {
        setFocused(true);
        dispatch(setSearchFilterActive(true));
    }

    const handleOnBlur = () => {
        setFocused(false);
        if (text === '') {
            dispatch(setSearchFilterActive(false));
        }
    }

    const handleCancel = () => {
        setText('');
        dispatch(setSearchFilterText(''));
        dispatch(setSearchFilterActive(false));
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
        dispatch(setSearchFilterText(e.target.value));
    }

    return (
        <div className={"searchBar"}>
            <div className={`searchBox ${props.disabled ? 'disabled ' : ''} ${focused || text !== '' ? 'inUse' : ''}`}>
                <img src={props.disabled ? SearchIconDisabled : SearchIcon}/>
                <input value={text} placeholder={props.placeholder} disabled={props.disabled}
                       onFocus={() => handleOnFocus()}
                       onBlur={() => handleOnBlur()} onChange={handleTextChange}/>
            </div>
            {(focused || text !== '') &&
            <div className={"cancelButton"}>
                <button onClick={() => handleCancel()}>Cancel</button>
            </div>}
        </div>
    )
}

export default SearchBar;