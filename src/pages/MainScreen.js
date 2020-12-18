import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import SearchBar from "../components/SearchBar/index";
import Footer from "../components/Footer/index";
import CounterList from "../components/CountersList/index";
import AddCounterModal from "../components/Modals/AddCounterModal/index";
import NamesExamplesModal from "../components/Modals/NamesExamplesModal/index";
import DeleteConfirmationModal from "../components/Modals/DeleteConfirmationModal/index";
import ErrorModal from "../components/Modals/ErrorModal/index";
import {getCounters} from "../actions/index";

const MainScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCounters());// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={"container main"}>
            <SearchBar/>
            <CounterList/>
            <Footer/>
            <AddCounterModal/>
            <NamesExamplesModal/>
            <DeleteConfirmationModal/>
            <ErrorModal/>
        </div>
    )
}

export default MainScreen;

