import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import Item from './Item/index';
import Summary from './Summary/index';
import './styles.scss';
import {
    setSelectedCounter,
} from "../../../actions/index";

const FullList = () => {
        const dispatch = useDispatch();
        const {counters, selectedCounter, searchFilter, disabled} = useSelector(state => ({
            counters: (state.searchFilter.isActive && state.searchFilter.text !== '') ?
                state.counters.filter(counter => counter.title.toLowerCase().indexOf(state.searchFilter.text.toLowerCase()) === 0) :
                state.counters,
            selectedCounter: state.selectedCounter,
            searchFilter: state.searchFilter,
            disabled: state.searchFilter.isActive && state.searchFilter.text === '',
        }));

        useEffect(() => {
            window.addEventListener('click', detectClickOutside);
            return () => window.removeEventListener('click', detectClickOutside);// eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);


        const detectClickOutside = (e) => {
            let clickOutside = true;
            const clickablesElements = document.getElementsByClassName('clickable');
            [].forEach.call(clickablesElements, (clickableElement) => {
                if (clickableElement.contains(e.target)) {
                    clickOutside = false;
                }
            });
            if (clickOutside) {
                dispatch(setSelectedCounter(null));
            }
        };

        const getEmptyListMessage = () => {
            if (searchFilter.isActive && counters.length === 0) {
                return <div className={"noResults"}><p>No results</p></div>
            }
            return null
        }

        return (
            <div className={`fullList ${disabled ? 'disabled' : ''}`}>
                <Summary/>
                {getEmptyListMessage()}
                <div className={"itemsList clickable"}>
                    {counters.map((counter) =>
                        <Item counter={counter} selectedCounter={selectedCounter} key={counter.id}/>
                    )}
                </div>
                {disabled && <div className={"disableOverlay"}/>}
            </div>
        );
    }
;

export default FullList;