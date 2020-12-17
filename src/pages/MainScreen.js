import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import SearchBar from "../components/SearchBar/index";
import Footer from "../components/Footer/index";
import CounterList from "../components/CountersList/index";
import {getCounters} from "../actions/index";
import AddCounterModal from "../components/AddCounterModal/index";
import NamesExamplesModal from "../components/NamesExamplesModal/index";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal/index";
import Loading from "../components/Loading/index";

const MainScreen = () => {
    const dispatch = useDispatch();
    const {counters, loading, connectionError, searchFilter} = useSelector(state => ({
        counters: state.counters,
        loading: state.loading,
        connectionError: state.connectionError,
        searchFilter: state.searchFilter
    }));
    const [openBottomModal, setOpenBottomModal] = useState(false);
    useEffect(() => {
        const loadCounters = async () => {
            await dispatch(getCounters());
        }
        loadCounters();
    }, []);

    const disabledSearchBar = counters.length == 0 || loading || connectionError;
    const disabledContent = searchFilter.isActive && searchFilter.text === '';
    return (
        <div className={"container main"}>
            <SearchBar icon={"search"} placeholder={"Search counters"} disabled={disabledSearchBar}/>
            <CounterList disabled={disabledContent}/>
            <Footer disabled={disabledContent} x/>
            <AddCounterModal/>
            <NamesExamplesModal/>
            <DeleteConfirmationModal/>
            {loading && <Loading/>}
        </div>
    )
}

export default MainScreen;

