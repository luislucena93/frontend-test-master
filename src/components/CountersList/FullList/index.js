import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux'
import PlusIcon from '../../../images/Plus-orange.png';
import MinusIcon from '../../../images/Minus.png';
import MinusDisabledIcon from '../../../images/Minus-disabled.png';
import RefreshIcon from '../../../images/Refresh.png';
import RefreshActiveIcon from '../../../images/Refresh-active.png';
import './styles.scss';
import {
    incrementCounter, decrementCounter, setSelectedCounter, refreshCounters, setShowTooltip
} from "../../../actions/index";

const FullList = () => {
        const dispatch = useDispatch();
        const [refreshingDots, setRefreshingDots] = useState(0);
        const {counters, selectedCounter, searchFilter, refreshing, disabled} = useSelector(state => ({
            counters: (state.searchFilter.isActive && state.searchFilter.text !== '') ?
                state.counters.filter(counter => counter.title.toLowerCase().indexOf(state.searchFilter.text.toLowerCase()) === 0) :
                state.counters,
            selectedCounter: state.selectedCounter,
            searchFilter: state.searchFilter,
            refreshing: state.refreshing,
            disabled: state.searchFilter.isActive && state.searchFilter.text === '',
        }));

        useEffect(() => {
            window.addEventListener('click', detectClickOutside);// eslint-disable-next-line react-hooks/exhaustive-deps
            return () => window.removeEventListener('click', detectClickOutside);
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
        }

        const intervalRef = useRef();

        useEffect(() => {
            if (refreshing) {
                const id = setInterval(() => {
                    updateRefreshingDots();
                }, 500);
                intervalRef.current = id;
            } else {
                clearInterval(intervalRef.current);
            }
        }, [refreshing])

        const updateRefreshingDots = () => {
            setRefreshingDots((refreshingDots) => refreshingDots < 3 ? refreshingDots + 1 : 0);
        }


        const totalCount = counters.reduce((a, b) => a + (b.count || 0), 0);

        const handleClickRefresh = () => {
            if (!refreshing) {
                dispatch(refreshCounters())
            }
        }

        const getRefresh = () => {
            return (
                <div className={"refresh"}>
                    <img onClick={handleClickRefresh} src={refreshing ? RefreshActiveIcon : RefreshIcon} alt={""}/>
                    {refreshing && <p>Refreshing{".".repeat(refreshingDots)}</p>}
                </div>
            )
        }

        const getSummary = () => {
            if (selectedCounter == null) {
                if (searchFilter.isActive && counters.length === 0) {
                    return null;
                }
                return (
                    <div className={"listSummary"}>
                        <p className={"itemQty"}>{counters.length} items</p>
                        <p className={"totalCount"}>{totalCount} times</p>
                        {getRefresh()}
                    </div>
                )
            }
            return (
                <div className={"listSummary"}>
                    <p className={"itemSelected"}>1 selected</p>
                    {getRefresh()}
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
            <div className={`fullList ${disabled ? 'disabled' : ''}`}>
                {getSummary()}
                {getEmptyListMessage()}
                <div className={"itemsList clickable"}>
                    {counters.map((counter) =>
                        <div className={`item ${selectedCounter === counter.id ? 'selected' : ''}`} key={counter.id}
                             onClick={() => dispatch(setSelectedCounter(counter.id))}>
                            <p className={"itemName"}>{counter.title}</p>
                            <div className={"counterButtons"}>
                                <button disabled={counter.count === 0}
                                        onClick={() => dispatch(decrementCounter(counter.id))}>
                                    <img src={counter.count === 0 ? MinusDisabledIcon : MinusIcon} alt={""}/>
                                </button>
                                <p className={counter.count === 0 ? 'zero' : ''}>{counter.count}</p>
                                <button onClick={() => dispatch(incrementCounter(counter.id))}
                                        disabled={disabled}>
                                    <img src={PlusIcon} alt={""}/>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {disabled && <div className={"disableOverlay"}/>}
            </div>

        );
    }
;

export default FullList;