import React from 'react';
import {useSelector} from 'react-redux'
import Loading from './Loading/index';
import EmptyList from './EmptyList/index';
import FullList from './FullList/index';
import ErrorScreen from './ErrorScreen/index';
import {ERROR_GET_COUNTERS} from "../../actions/index";

const CounterList = () => {
    const {counters, loading, connectionError} = useSelector(state => ({
        counters: state.counters,
        loading: state.loading,
        connectionError: state.connectionError,
    }));


    if (loading) {
        return <Loading/>
    } else if (connectionError === ERROR_GET_COUNTERS) {
        return <ErrorScreen/>
    } else if (counters.length === 0) {
        return <EmptyList/>
    } else {
        return <FullList/>
    }
};

export default CounterList;
