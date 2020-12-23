import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import SearchIcon from '../../images/Search.png';
import './styles.scss';
import {ERROR_GET_COUNTERS, setSearchFilterActive, setSearchFilterText} from "../../actions/index";

const SearchBar = () => {
    const dispatch = useDispatch();
    const {disabled, searchFilter} = useSelector(state => ({
        disabled: state.counters.length === 0 || state.loading || state.connectionError === ERROR_GET_COUNTERS,
        searchFilter: state.searchFilter
    }));

    const handleOnFocus = () => {
        dispatch(setSearchFilterActive(true));
    }

    const handleOnBlur = () => {
        if (searchFilter.text === '') {
            dispatch(setSearchFilterActive(false));
        }
    }

    const handleCancel = () => {
        dispatch(setSearchFilterText(''));
        dispatch(setSearchFilterActive(false));
    }

    const handleTextChange = (e) => {
        dispatch(setSearchFilterText(e.target.value));
    }

    return (
        <div className={"searchBar"}>
            <div className={`searchBox ${disabled ? 'disabled ' : ''} ${searchFilter.isActive ? 'inUse' : ''}`}>
                <img src={SearchIcon} alt={""}/>
                <input value={searchFilter.text} placeholder="Search counters" disabled={disabled}
                       onFocus={handleOnFocus}
                       onBlur={handleOnBlur} onChange={handleTextChange} data-testid={'searchInput'}/>
            </div>
            {(searchFilter.isActive) &&
            <button className={"cancelButton"} onClick={handleCancel}>Cancel</button>}
        </div>
    )
}

export default SearchBar;