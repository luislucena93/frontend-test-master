import React from 'react';
import SearchBar from '../SearchBar';
import {fireEvent, screen} from "@testing-library/react";
import {getMockStore, renderWithState} from "../../../test/utils/storeWrapper"
import {
    ERROR_GET_COUNTERS, setOpenAddCounterModal, setOpenDeleteConfirmationModal, setSearchFilterActive,
    setSearchFilterText,
    setShowTooltip
} from "../../actions/index";

describe('Search bar component', () => {

    it('should render disabled searchBar if loading state is true', () => {
        const {container} = renderWithState(<SearchBar/>, getMockStore({loading: true}));
        expect(container.firstChild.firstChild).toHaveClass('disabled');
    });

    it('should render disabled searchBar if counters length is 0', () => {
        const {container} = renderWithState(<SearchBar/>, getMockStore({counters: []}));
        expect(container.firstChild.firstChild).toHaveClass('disabled');
    });

    it('should render disabled searchBar if loading state is connection error is ERROR_GET_COUNTERS', () => {
        const {container} = renderWithState(<SearchBar/>, getMockStore({
            counters: [{
                id: '123',
                title: 'test counter',
                count: 0
            }], connectionError: ERROR_GET_COUNTERS
        }));
        expect(container.firstChild.firstChild).toHaveClass('disabled');
    });

    it('should render idle searchBar', () => {
        const {container} = renderWithState(<SearchBar/>, getMockStore({
            counters: [{
                id: '123',
                title: 'test counter',
                count: 0
            }]
        }));
        expect(container.firstChild.firstChild).not.toHaveClass('disabled');
        expect(container.firstChild.childNodes[1]).toBeUndefined();
    })

    it('should render in use searchBar and cancel button if search filter is active', () => {
        const {container} = renderWithState(<SearchBar/>, getMockStore({
            counters: [{
                id: '123',
                title: 'test counter',
                count: 0
            }],
            searchFilter: {isActive: true, text: ''}
        }));
        expect(container.firstChild.firstChild).toHaveClass('inUse');
        expect(container.firstChild.childNodes[1]).toHaveTextContent('Cancel');
    })

    it('should dispatch set search filters active true if focus the input text', () => {
        const mockStore = getMockStore({
            counters: [{id: '123', title: 'test counter', count: 0}],
        });
        renderWithState(<SearchBar/>, mockStore);
        screen.getByTestId('searchInput').focus();
        expect(mockStore.dispatch).toHaveBeenCalledWith(setSearchFilterActive(true));
    })

    it('should dispatch set search filters active false if blur the input text and text is empty', () => {
        const mockStore = getMockStore({
            counters: [{id: '123', title: 'test counter', count: 0}],
            searchFilter: {isActive: true, text: ''}
        });
        renderWithState(<SearchBar/>, mockStore);
        screen.getByTestId('searchInput').focus();
        screen.getByTestId('searchInput').blur();
        expect(mockStore.dispatch).toHaveBeenCalledWith(setSearchFilterActive(false));
    })

    it('should not dispatch set search filters active false if blur the input text and text is not empty', () => {
        const mockStore = getMockStore({
            counters: [{id: '123', title: 'test counter', count: 0}],
            searchFilter: {isActive: true, text: 'search text'}
        });
        renderWithState(<SearchBar/>, mockStore);
        screen.getByTestId('searchInput').focus();
        screen.getByTestId('searchInput').blur();
        expect(mockStore.dispatch).not.toHaveBeenCalledWith(setSearchFilterActive(false));
    })

    it('should dispatch set search filters text if input text change', () => {
        const mockStore = getMockStore({
            counters: [{id: '123', title: 'test counter', count: 0}],
            searchFilter: {isActive: true, text: ''}
        });
        renderWithState(<SearchBar/>, mockStore);
        fireEvent.change(screen.getByTestId('searchInput'), {target: {value: 'new search text'}});
        expect(mockStore.dispatch).toHaveBeenCalledWith(setSearchFilterText('new search text'));
    })

    it('should dispatch set search filters text empty and is active false if click cancel', () => {
        const mockStore = getMockStore({
            counters: [{id: '123', title: 'test counter', count: 0}],
            searchFilter: {isActive: true, text: 'new search text'}
        });
        renderWithState(<SearchBar/>, mockStore);
        fireEvent.click(screen.getByText('Cancel'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setSearchFilterText(''));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setSearchFilterActive(false));
    })
})