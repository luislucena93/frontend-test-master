import React from 'react';
import AddCounterModal from '../AddCounterModal';
import {fireEvent, screen} from "@testing-library/react";
import {getMockStore, renderWithState} from "../../../../test/utils/storeWrapper"
import {setNewCounterName, setOpenAddCounterModal, setOpenNamesExamplesModal} from "../../../actions/index";

describe('Add counter modal component', () => {

    it('should not show add counter modal in initial state', () => {
        const {container} = renderWithState(<AddCounterModal/>, getMockStore({}));
        expect(container.parentNode.childNodes[1]).toHaveStyle({position: 'fixed', zIndex: 9999999});
        expect(container.parentNode.childNodes[1]).toBeEmptyDOMElement();
    })

    it('should show add counter modal if open add counter modal state is true', () => {
        const {container} = renderWithState(<AddCounterModal/>, getMockStore({openAddCounterModal: true}));
        expect(container.parentNode.childNodes[1]).toHaveStyle({position: 'fixed', zIndex: 9999999});
        expect(container.parentNode.childNodes[1]).not.toBeEmptyDOMElement();
        expect(container.parentNode.childNodes[1]).toHaveTextContent(/Create counter/i);
    });

    it('should disable save button and modal content if loading is true', () => {
        renderWithState(<AddCounterModal/>, getMockStore({
            openAddCounterModal: true,
            loading: true
        }));
        expect(screen.getByText('Save')).toBeDisabled();
        expect(screen.getByTestId('addCounterModalContent')).toHaveClass('disabled');
    });

    it('should disable save button if new counter name is empty', () => {
        renderWithState(<AddCounterModal/>, getMockStore({
            openAddCounterModal: true,
            newCounterName: ''
        }));
        expect(screen.getByText('Save')).toBeDisabled();
    });

    it('should not disable save button or modal content if not loading and new counter name is not empty', () => {
        renderWithState(<AddCounterModal/>, getMockStore({
            openAddCounterModal: true,
            newCounterName: 'new counter name',
            loading: false,
        }));
        expect(screen.getByText('Save')).not.toBeDisabled();
        expect(screen.getByTestId('addCounterModalContent')).not.toHaveClass('disabled');
    });

    it('should dispatch add new counter action when click the save button', () => {
        const mockStore = getMockStore({
            openAddCounterModal: true,
            newCounterName: 'new counter name',
            loading: false,
        });
        renderWithState(<AddCounterModal/>, mockStore);
        fireEvent.click(screen.getByText('Save'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(expect.objectContaining({name: 'addCounterAction'}));
    });

    it('should dispatch set new counter name when input text changes', () => {
        const mockStore = getMockStore({
            openAddCounterModal: true,
            newCounterName: 'new counter name',
            loading: false,
        });
        renderWithState(<AddCounterModal/>, mockStore);
        fireEvent.change(screen.getByTestId('nameInput'), {target: {value: 'new counter name 2'}});
        expect(mockStore.dispatch).toHaveBeenCalledWith(setNewCounterName('new counter name 2'));
    });

    it('should dispatch open names examples modal when click on see examples', () => {
        const mockStore = getMockStore({
            openAddCounterModal: true,
            newCounterName: 'new counter name',
            loading: false,
        });
        renderWithState(<AddCounterModal/>, mockStore);
        fireEvent.click(screen.getByText('See examples.'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setOpenNamesExamplesModal(true));
    });

    it('should dispatch set open add new counter modal with false when click close if not laoding', () => {
        const mockStore = getMockStore({
            openAddCounterModal: true,
            newCounterName: 'new counter name',
            loading: false,
        });
        renderWithState(<AddCounterModal/>, mockStore);
        fireEvent.click(screen.getByAltText('close'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setOpenAddCounterModal(false));
    });

    it('should not dispatch set open add new counter modal with false when click close if laoding', () => {
        const mockStore = getMockStore({
            openAddCounterModal: true,
            newCounterName: 'new counter name',
            loading: true,
        });
        renderWithState(<AddCounterModal/>, mockStore);
        fireEvent.click(screen.getByAltText('close'));
        expect(mockStore.dispatch).not.toHaveBeenCalledWith(setOpenAddCounterModal(false));
    });
})