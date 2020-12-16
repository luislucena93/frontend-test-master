import React from 'react';
import InputText from '../components/SearchInputText/index'
import Footer from "../components/Footer/index";

const MainScreen = () => {
    return (
        <div className={"container main"}>
            <InputText icon={"search"} placeholder={"Search counters"} disabled={false}/>
            <Footer disabled={false}/>
        </div>
    )
}

export default MainScreen;

