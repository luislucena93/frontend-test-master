import React from "react";
import {render} from "@testing-library/react";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import CountersApp from "../../src/reducers/index";
import thunkMiddleware from "redux-thunk";
import MainScreen from "../../src/pages/MainScreen";

export const renderWithState = (ui, store) => {
    const Wrapper = ({children}) => (
        <Provider store={store}>{children}</Provider>
    );

    return render(ui, {wrapper: Wrapper});
};

export const getMockStore = (initialState = {}) => {
    const store = createStore(CountersApp, initialState, applyMiddleware(thunkMiddleware));
    store.dispatch = jest.fn();
    return store;
};