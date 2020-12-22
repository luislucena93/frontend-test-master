import React from 'react';
import {fireEvent, screen} from "@testing-library/react";
import CountersList from '../CountersList';
import {getMockStore, renderWithState} from "../../../test/utils/storeWrapper";
import {ERROR_GET_COUNTERS, getCounters, refreshCounters, setSelectedCounter} from "../../actions/index";


describe('Counters list component', () => {

    it('should render Loading if loading state is true', () => {
        const {container} = renderWithState(<CountersList/>, getMockStore({loading: true}));
        expect(container.firstChild).toHaveClass('loading');
    });

    it('should render Error screen if connection error is ERROR_GET_COUNTERS', () => {
        const {container} = renderWithState(<CountersList/>, getMockStore({connectionError: ERROR_GET_COUNTERS}));
        expect(container.firstChild.firstChild).toHaveTextContent("Couldn’t load the counters");
    });

    it('should render Empty list if counters list is empty', () => {
        const {container} = renderWithState(<CountersList/>, getMockStore({counters: []}));
        expect(container.firstChild.firstChild).toHaveTextContent("No counters yet");
    });

    it('should render full list if counters list is not empty', () => {
        const {container} = renderWithState(<CountersList/>, getMockStore({
            counters: [{
                id: '123',
                title: 'test counter',
                count: 0
            }]
        }));
        expect(container.firstChild).toHaveClass("fullList");
    });

    it('should render full list with filtered counters if search filter is active', () => {
        const {container} = renderWithState(<CountersList/>, getMockStore({
            counters: [{
                id: '123',
                title: 'test counter',
                count: 0
            }],
            searchFilter: {
                isActive: true,
                text: 'test search'
            }
        }));
        expect(container.firstChild.firstChild).toHaveTextContent("No results");
    })

    it('should dispatch get counters when click in retry button on error screen ', () => {
        const mockStore = getMockStore({connectionError: ERROR_GET_COUNTERS});
        renderWithState(<CountersList/>, mockStore);
        fireEvent.click(screen.getByText('Retry'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(getCounters);
    });

    it('should dispatch get counters when click in retry button on error screen ', () => {
        const mockStore = getMockStore({connectionError: ERROR_GET_COUNTERS});
        renderWithState(<CountersList/>, mockStore);
        fireEvent.click(screen.getByText('Retry'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(getCounters);
    });

    it('should dispatch set selected counter with null when click outside of the item list', () => {
        const mockStore = getMockStore({
            counters: [{
                id: '123',
                title: 'test counter',
                count: 0
            }]
        });
        renderWithState(<CountersList/>, mockStore);
        fireEvent.click(screen.getByTestId('listSummary'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setSelectedCounter(null));
    });

    it('should dispatch set selected counter with item id after 1ms when click on item', () => {
        jest.useFakeTimers();
        const mockStore = getMockStore({
            counters: [{
                id: '123',
                title: 'test counter',
                count: 0
            }]
        });
        renderWithState(<CountersList/>, mockStore);
        fireEvent.click(screen.getByAltText('dec'));
        jest.runAllTimers();
        expect(mockStore.dispatch).toHaveBeenCalledWith(setSelectedCounter('123'));
        jest.useRealTimers();
    });

    it('should dispatch increment counter with item id after 1ms when click on item', () => {
        jest.useFakeTimers();
        const mockStore = getMockStore({
            counters: [{
                id: '123',
                title: 'test counter',
                count: 0
            }]
        });
        renderWithState(<CountersList/>, mockStore);
        fireEvent.click(screen.getByAltText('inc'));
        jest.runAllTimers();
        expect(mockStore.dispatch).toHaveBeenCalledWith(expect.objectContaining({name: 'incrementCounterAction'})); //check on function name because is thunk
        jest.useRealTimers();
    });

    it('should dispatch decrement counter with item id after 1ms when click on item', () => {
        jest.useFakeTimers();
        const mockStore = getMockStore({
            counters: [{
                id: '123',
                title: 'test counter',
                count: 1
            }]
        });
        renderWithState(<CountersList/>, mockStore);
        fireEvent.click(screen.getByAltText('dec'));
        jest.runAllTimers();
        expect(mockStore.dispatch).toHaveBeenCalledWith(expect.objectContaining({name: 'decrementCounterAction'})); // check on function name because is thunk
        jest.useRealTimers();
    });

    it('should dispatch refresh counters when click on refresh', () => {
        const mockStore = getMockStore({
            counters: [{
                id: '123',
                title: 'test counter',
                count: 1
            }]
        });
        renderWithState(<CountersList/>, mockStore);
        fireEvent.click(screen.getByAltText('refresh'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(refreshCounters);
    });

})