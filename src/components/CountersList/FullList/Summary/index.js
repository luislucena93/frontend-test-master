import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {refreshCounters} from "../../../../actions/index";
import RefreshIcon from '../../../../images/Refresh.png';
import RefreshActiveIcon from '../../../../images/Refresh-active.png';
import './styles.scss';

const Summary = () => {
    const {counters, selectedCounter, searchFilter, refreshing} = useSelector(state => ({
        counters: (state.searchFilter.isActive && state.searchFilter.text !== '') ?
            state.counters.filter(counter => counter.title.toLowerCase().indexOf(state.searchFilter.text.toLowerCase()) === 0) :
            state.counters,
        selectedCounter: state.selectedCounter,
        searchFilter: state.searchFilter,
        refreshing: state.refreshing,
        disabled: state.searchFilter.isActive && state.searchFilter.text === '',
    }));

    const dispatch = useDispatch();
    const [refreshingDots, setRefreshingDots] = useState(0);
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

    if (selectedCounter === null) {
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
};

export default Summary;
