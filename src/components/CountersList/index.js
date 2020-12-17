import React from 'react';
import {useSelector} from 'react-redux'
import Loading from '../../components/Loading/index';
import EmptyList from '../../components/EmptyList/index';
import FullList from '../../components/FullList/index';

const CounterList = (props) => {
    const {counters, loading, connectionError} = useSelector(state => ({
        counters: state.counters,
        loading: state.loading,
        connectionError: state.connectionError,
        searchFilter: state.searchFilter
    }));


    if (loading && counters.length == 0) {
        return null
    } else if (counters.length == 0) {
        return (
            <EmptyList/>
        )
    } else {
        return (
            <FullList disabled={props.disabled}/>
        )
    }
};

export default CounterList;
