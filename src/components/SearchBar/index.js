import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import SearchIcon from '../../images/Search.png';
import './styles.scss';
import {ERROR_GET_COUNTERS, setSearchFilterActive, setSearchFilterText} from "../../actions/index";

const SearchBar = () => {
    const [focused, setFocused] = useState(false);
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const disabled = useSelector(state => state.counters.length === 0 || state.loading || state.connectionError === ERROR_GET_COUNTERS)

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
            <div className={`searchBox ${disabled ? 'disabled ' : ''} ${focused || text !== '' ? 'inUse' : ''}`}>
                <img src={SearchIcon} alt={""}/>
                <input value={text} placeholder="Search counters" disabled={disabled}
                       onFocus={() => handleOnFocus()}
                       onBlur={() => handleOnBlur()} onChange={handleTextChange}/>
            </div>
            {(focused || text !== '') &&
            <button className={"cancelButton"} onClick={() => handleCancel()}>Cancel</button>}
        </div>
    )
}

export default SearchBar;