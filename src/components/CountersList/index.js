import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Loading from './Loading/index';
import EmptyList from './EmptyList/index';
import FullList from './FullList/index';
import ErrorScreen from './ErrorScreen/index';
import {
    decrementCounter, ERROR_GET_COUNTERS, getCounters, incrementCounter, refreshCounters,
    setSelectedCounter
} from "../../actions/index";

const CounterList = () => {
    const dispatch = useDispatch();
    const {counters, filteredCounters, selectedCounter, loading, connectionError, searchFilter, refreshing, searchFilterEmpty} = useSelector(state => ({
        counters: state.counters,
        filteredCounters: (state.searchFilter.isActive && state.searchFilter.text !== '') ?
            state.counters.filter(counter => counter.title.toLowerCase().indexOf(state.searchFilter.text.toLowerCase()) === 0) : state.counters,
        selectedCounter: state.selectedCounter,
        loading: state.loading,
        connectionError: state.connectionError,
        searchFilter: state.searchFilter,
        refreshing: state.refreshing,
        searchFilterEmpty: state.searchFilter.isActive && state.searchFilter.text === '',
    }));

    const dispatchGetCounters = () => {
        dispatch(getCounters());
    }

    const dispatchSetSelectedCounter = (counterId) => {
        dispatch(setSelectedCounter(counterId));
    }

    const dispatchIncrementCounter = (counterId) => {
        dispatch(incrementCounter(counterId));
    }

    const dispatchDecrementCounter = (counterId) => {
        dispatch(decrementCounter(counterId));
    }

    const dispatchRefreshCounters = () => {
        dispatch(refreshCounters());
    }

    if (loading) {
        return <Loading/>
    } else if (connectionError === ERROR_GET_COUNTERS) {
        return <ErrorScreen handleRetryClick={dispatchGetCounters}/>
    } else if (counters.length === 0) {
        return <EmptyList/>
    } else {
        return <FullList counters={filteredCounters} selectedCounter={selectedCounter}
                         disabled={searchFilterEmpty} refreshing={refreshing}
                         handleClickOutsideList={() => dispatchSetSelectedCounter(null)}
                         handleClickOnListItem={(itemId) => dispatchSetSelectedCounter(itemId)}
                         handleClickIncItem={(counterId) => dispatchIncrementCounter(counterId)}
                         handleClickDecItem={(counterId) => dispatchDecrementCounter(counterId)}
                         handleClickRefresh={dispatchRefreshCounters}/>
    }
};

export default CounterList;