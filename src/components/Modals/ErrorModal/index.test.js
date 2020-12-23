import React from 'react';
import {fireEvent, screen} from "@testing-library/react";
import {getMockStore, renderWithState} from "../../../../test/utils/storeWrapper"
import ErrorModal from '../ErrorModal';
import {
    ERROR_ADD_COUNTER,
    ERROR_DEC_COUNTER,
    ERROR_DEL_COUNTER,
    ERROR_INC_COUNTER,
    setOpenErrorModal
} from "../../../actions/index";

describe('Error modal component', () => {

    it('should not show error modal in initial state', () => {
        const {container} = renderWithState(<ErrorModal/>, getMockStore({}));
        expect(container.firstChild).toHaveClass('overlay');
        expect(container.firstChild).not.toHaveClass('show');
    });

    it('should show error modal if open error modal state is  true', () => {
        const {container} = renderWithState(
            <ErrorModal/>, getMockStore({openErrorModal: true}));
        expect(container.firstChild).toHaveClass('show');
    });

    it('should show error modal for delete counter error', () => {
        const {container} = renderWithState(
            <ErrorModal/>, getMockStore({
                openErrorModal: true,
                connectionError: ERROR_DEL_COUNTER,
                selectedCounter: '123',
                counters: [{id: '123', title: 'test counter', count: 1}]
            }));
        expect(container).toHaveTextContent(/Couldn’t delete “test counter”/i);
    });

    it('should show error modal for increment counter error', () => {
        const {container} = renderWithState(
            <ErrorModal/>, getMockStore({
                openErrorModal: true,
                connectionError: ERROR_INC_COUNTER,
                selectedCounter: '123',
                counters: [{id: '123', title: 'test counter', count: 1}]
            }));
        expect(container).toHaveTextContent(/Couldn’t update “test counter” to 2/i);
    });

    it('should show error modal for decrement counter error', () => {
        const {container} = renderWithState(
            <ErrorModal/>, getMockStore({
                openErrorModal: true,
                connectionError: ERROR_DEC_COUNTER,
                selectedCounter: '123',
                counters: [{id: '123', title: 'test counter', count: 1}]
            }));
        expect(container).toHaveTextContent(/Couldn’t update “test counter” to 0/i);
    });

    it('should show error modal for decrement counter error', () => {
        const {container} = renderWithState(
            <ErrorModal/>, getMockStore({
                openErrorModal: true,
                connectionError: ERROR_ADD_COUNTER,
                selectedCounter: '123',
                counters: [{id: '123', title: 'test counter', count: 1}]
            }));
        expect(container).toHaveTextContent(/Couldn’t create counter/i);
    });


    it('should dispatch delete counter when click in retry button and set open error modal when click dismiss button if' +
        ' connection error is ERROR_DEL_COUNTER', () => {
        jest.useFakeTimers();
        const mockStore = getMockStore({
            openErrorModal: true,
            connectionError: ERROR_DEL_COUNTER,
            selectedCounter: '123',
            counters: [{id: '123', title: 'test counter', count: 1}]
        });
        renderWithState(<ErrorModal/>, mockStore);
        fireEvent.click(screen.getByText('Retry'));
        jest.runAllTimers();
        expect(mockStore.dispatch).toHaveBeenCalledWith(expect.objectContaining({name: 'deleteCounterAction'}));
        fireEvent.click(screen.getByText('Dismiss'));
        jest.runAllTimers();
        expect(mockStore.dispatch).toHaveBeenCalledWith(setOpenErrorModal(false));
        jest.useRealTimers();
    });

    it('should dispatch increment counter when click in retry button and set open error modal when click dismiss button if' +
        ' connection error is ERROR_INC_COUNTER', () => {
        jest.useFakeTimers();
        const mockStore = getMockStore({
            openErrorModal: true,
            connectionError: ERROR_INC_COUNTER,
            selectedCounter: '123',
            counters: [{id: '123', title: 'test counter', count: 1}]
        });
        renderWithState(<ErrorModal/>, mockStore);
        fireEvent.click(screen.getByText('Retry'));
        jest.runAllTimers();
        expect(mockStore.dispatch).toHaveBeenCalledWith(expect.objectContaining({name: 'incrementCounterAction'}));
        fireEvent.click(screen.getByText('Dismiss'));
        jest.runAllTimers();
        expect(mockStore.dispatch).toHaveBeenCalledWith(setOpenErrorModal(false));
        jest.useRealTimers()
    });

    it('should dispatch decrement counter when click in retry button and set open error modal when click dismiss button if' +
        ' connection error is ERROR_DEC_COUNTER', () => {
        jest.useFakeTimers()
        const mockStore = getMockStore({
            openErrorModal: true,
            connectionError: ERROR_DEC_COUNTER,
            selectedCounter: '123',
            counters: [{id: '123', title: 'test counter', count: 1}]
        });
        renderWithState(<ErrorModal/>, mockStore);
        fireEvent.click(screen.getByText('Retry'));
        jest.runAllTimers();
        expect(mockStore.dispatch).toHaveBeenCalledWith(expect.objectContaining({name: 'decrementCounterAction'}));
        fireEvent.click(screen.getByText('Dismiss'));
        jest.runAllTimers();
        expect(mockStore.dispatch).toHaveBeenCalledWith(setOpenErrorModal(false));
        jest.useRealTimers();
    });

    it('should set open error modal when click dismiss button if connection error is ERROR_ADD_COUNTER', () => {
        jest.useFakeTimers()
        const mockStore = getMockStore({
            openErrorModal: true,
            connectionError: ERROR_ADD_COUNTER,
            selectedCounter: '123',
            counters: [{id: '123', title: 'test counter', count: 1}]
        });
        renderWithState(<ErrorModal/>, mockStore);
        fireEvent.click(screen.getByText('Dismiss'));
        jest.runAllTimers()
        expect(mockStore.dispatch).toHaveBeenCalledWith(setOpenErrorModal(false));
        jest.useRealTimers()
    })

})