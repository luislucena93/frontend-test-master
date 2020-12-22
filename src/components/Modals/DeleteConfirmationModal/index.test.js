import React from 'react';
import {fireEvent, screen} from "@testing-library/react";
import {getMockStore, renderWithState} from "../../../../test/utils/storeWrapper"
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import {setOpenDeleteConfirmationModal} from "../../../actions/index";

describe('Delete confirmation modal component', () => {

    it('should not show delete confirmation modal in initial state', () => {
        const {container} = renderWithState(<DeleteConfirmationModal/>, getMockStore({}));
        expect(container.firstChild).toHaveClass('overlay');
        expect(container.firstChild).not.toHaveClass('show');
    });

    it('should show delete confirmation modal if open confirmation modal state is  true', () => {
        const {container} = renderWithState(
            <DeleteConfirmationModal/>, getMockStore({openDeleteConfirmationModal: true, selectedCounter: '123s'}));
        expect(container.firstChild).toHaveClass('show');
    });

    it('should dispatch set open delete confirmation modal with false when click in cancel button', () => {
        const mockStore = getMockStore({openDeleteConfirmationModal: true, selectedCounter: '123'});
        renderWithState(<DeleteConfirmationModal/>, mockStore);
        fireEvent.click(screen.getByText('Cancel'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setOpenDeleteConfirmationModal(false));

    })

    it('should dispatch delete counter when click in delete button', () => {
        const mockStore = getMockStore({
            openDeleteConfirmationModal: true,
            selectedCounter: '123',
            counters: [{
                id: '123',
                title: 'test counter',
                count: 0
            }]
        });
        renderWithState(<DeleteConfirmationModal/>, mockStore);
        fireEvent.click(screen.getByText('Delete'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(expect.objectContaining({name: 'deleteCounterAction'}));
    })

})