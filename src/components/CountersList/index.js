import React, {useCallback} from 'react';
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
    const {counters, selectedCounter, loading, connectionError, refreshing, searchFilter} = useSelector(state => ({
        counters: state.counters,
        selectedCounter: state.selectedCounter,
        loading: state.loading,
        connectionError: state.connectionError,
        refreshing: state.refreshing,
        searchFilter: state.searchFilter,
    }));

    const searchFilterEmpty = searchFilter.isActive && searchFilter.text === '';

    const filteredCounters = (searchFilter.isActive && searchFilter.text !== '') ?
        counters.filter(counter => counter.title.toLowerCase().indexOf(searchFilter.text.toLowerCase()) === 0) :
        counters;

    const dispatchGetCounters = useCallback(() => dispatch(getCounters), [dispatch]);

    const dispatchSetNullSelectedCounter = useCallback(() => dispatch(setSelectedCounter(null)), [dispatch]);

    const dispatchSetSelectedCounter = useCallback((counterId) => dispatch(setSelectedCounter(counterId)), [dispatch]);

    const dispatchIncrementCounter = useCallback((counterId) => dispatch(incrementCounter(counterId)), [dispatch]);

    const dispatchDecrementCounter = useCallback((counterId) => dispatch(decrementCounter(counterId)), [dispatch]);

    const dispatchRefreshCounters = useCallback(() => dispatch(refreshCounters()), [dispatch]);

    if (loading) {
        return <Loading/>
    } else if (connectionError === ERROR_GET_COUNTERS) {
        return <ErrorScreen handleRetryClick={dispatchGetCounters}/>
    } else if (counters.length === 0) {
        return <EmptyList/>
    } else {
        return (
            <FullList counters={filteredCounters}
                      selectedCounter={selectedCounter}
                      disabled={searchFilterEmpty}
                      refreshing={refreshing}
                      handleClickOutsideList={dispatchSetNullSelectedCounter}
                      handleClickOnListItem={dispatchSetSelectedCounter}
                      handleClickIncItem={dispatchIncrementCounter}
                      handleClickDecItem={dispatchDecrementCounter}
                      handleClickRefresh={dispatchRefreshCounters}
            />)
    }
};

export default CounterList;