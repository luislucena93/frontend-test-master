import React from 'react';
import Footer from '../Footer';
import {fireEvent, screen} from "@testing-library/react";
import {getMockStore, renderWithState} from "../../../test/utils/storeWrapper"
import {setOpenAddCounterModal, setOpenDeleteConfirmationModal, setShowTooltip} from "../../actions/index";

describe('Footer component', () => {

    it('should render idle footer if loading for initial state', () => {
        const {container} = renderWithState(<Footer/>, getMockStore({}));
        expect(container.firstChild).toHaveClass('footer');
        expect(container.firstChild).not.toHaveClass('disabled');
    });

    it('should render disabled footer if loading state is true', () => {
        const {container} = renderWithState(<Footer/>, getMockStore({loading: true}));
        expect(container.firstChild).toHaveClass('disabled');
    });

    it('should render disabled footer if search filter is active but text is empty', () => {
        const {container} = renderWithState(<Footer/>, getMockStore({searchFilter: {isActive: true, text: ''}}));
        expect(container.firstChild).toHaveClass('disabled');
    });

    it('should hide selected item buttons id not counter is selected', () => {
        const {container} = renderWithState(<Footer/>, getMockStore({selectedCounter: null}));
        expect(container.firstChild.firstChild.firstChild).toHaveClass('hidden');
    })

    it('should show selected item buttons when counter is selected', () => {
        const {container} = renderWithState(<Footer/>, getMockStore({
            selectedCounter: '123',
            counters: [{id: '123', title: 'test counter', count: 0}]
        }));
        expect(container.firstChild.firstChild.firstChild).not.toHaveClass('hidden');
    })

    it('should render tooltip when show tooltip state is true', () => {
        const {container} = renderWithState(<Footer/>, getMockStore({
            selectedCounter: '123',
            counters: [{id: '123', title: 'test counter', count: 0}],
            showTooltip: true,
        }));
        expect(container).toHaveTextContent(/Share 1 counter/i);
    })

    it('should dispatch open add counter modal action with true when click the plus button', () => {
        const mockStore = getMockStore({});
        renderWithState(<Footer/>, mockStore);
        fireEvent.click(screen.getByAltText('plus'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setOpenAddCounterModal(true));
    })

    it('should dispatch show tooltip action with true when click the share button', () => {
        const mockStore = getMockStore({
            selectedCounter: '123',
            counters: [{id: '123', title: 'test counter', count: 0}]
        });
        renderWithState(<Footer/>, mockStore);
        fireEvent.click(screen.getByAltText('share'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setShowTooltip(true));
    })

    it('should dispatch show tooltip action with false when click outside the tooltip', () => {
        jest.useFakeTimers();
        const mockStore = getMockStore({
            selectedCounter: '123',
            counters: [{id: '123', title: 'test counter', count: 0}],
            showTooltip: true,
        });
        renderWithState(<Footer/>, mockStore);
        jest.runAllTimers();
        fireEvent.click(screen.getByAltText('share'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setShowTooltip(false));
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    })

    it('should dispatch open delete confirmation modal action with true when click the delete button', () => {
        const mockStore = getMockStore({
            selectedCounter: '123',
            counters: [{id: '123', title: 'test counter', count: 0}],
        });
        renderWithState(<Footer/>, mockStore);
        fireEvent.click(screen.getByAltText('delete'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setOpenDeleteConfirmationModal(true));
    })
})