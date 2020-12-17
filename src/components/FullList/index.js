import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import PlusIcon from '../../images/Plus-orange.png';
import PlusDisabledIcon from '../../images/Plus-disabled.png';
import MinusIcon from '../../images/Minus.png';
import MinusDisabledIcon from '../../images/Minus-disabled.png';
import './styles.scss';
import {incrementCounter, decrementCounter, setSelectedCounter} from "../../actions/index";

const FullList = (props) => {
        useEffect(() => {
                activateEventListener();
            }, []
        );


        const detectClickOutside = (e) => {
            const itemListElement = document.getElementById('itemsList');
            const itemSelectedButtonsElement = document.getElementById('itemSelectedButtons');
            const overlayElement = document.getElementById('overlay');
            if ((itemListElement && !itemListElement.contains(e.target)) &&
                (itemSelectedButtonsElement && !itemSelectedButtonsElement.contains(e.target)) &&
                (overlayElement && !overlayElement.contains(e.target))
            ) {
                dispatch(setSelectedCounter(null));
            }
        }

        const activateEventListener = () => {
            window.addEventListener('click', detectClickOutside)
        }


        const dispatch = useDispatch();
        const {counters, selectedCounter, searchFilter} = useSelector(state => ({
                counters: (state.searchFilter.isActive && state.searchFilter.text !== '') ?
                    state.counters.filter(counter => counter.title.indexOf(state.searchFilter.text) == 0) :
                    state.counters,
                selectedCounter: state.selectedCounter,
                searchFilter: state.searchFilter
            }))
        ;
        const totalCount = counters.reduce((a, b) => a + (b.count || 0), 0);


        const getSummary = () => {
            if (selectedCounter == null) {
                if (searchFilter.isActive && counters.length === 0) {
                    return null;
                }
                return (
                    <div className={"listSummary"}>
                        <p className={"itemQty"}>{counters.length} items</p>
                        <p className={"totalCount"}>{totalCount} times</p>
                    </div>
                )
            }
            return (
                <div className={"listSummary"}>
                    <p className={"itemSelected"}>1 selected</p>
                </div>
            )

        }

        const getEmptyListMessage = () => {
            if (searchFilter.isActive && counters.length === 0) {
                return <div className={"noResults"}><p>No results</p></div>
            }
            return null
        }

        return (
            <div className={`fullList ${props.disabled ? 'disabled' : ''}`}>
                {getSummary()}
                {getEmptyListMessage()}
                <div className={"itemsList"} id={"itemsList"}>
                    {counters.map((counter) =>
                        <div className={`item ${selectedCounter === counter.id ? 'selected' : ''}`} key={counter.id}
                             onClick={() => dispatch(setSelectedCounter(counter.id))}>
                            <p className={"itemName"}>{counter.title}</p>
                            <div className={"counterButtons"}>
                                <button disabled={counter.count === 0 || props.disabled}
                                        onClick={() => dispatch(decrementCounter(counter.id))}>
                                    <img src={counter.count == 0 || props.disabled ? MinusDisabledIcon : MinusIcon}/>
                                </button>
                                <p className={`${counter.count === 0 ? 'zero' : ''} ${props.disabled ? 'disabled' : ''}`}>{counter.count}</p>
                                <button onClick={() => dispatch(incrementCounter(counter.id))} disabled={props.disabled}>
                                    <img src={props.disabled ? PlusDisabledIcon : PlusIcon}/>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
;

export default FullList;