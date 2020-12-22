import React from 'react';
import {fireEvent, screen} from "@testing-library/react";
import {getMockStore, renderWithState} from "../../../../test/utils/storeWrapper"
import NamesExamplesModal from '../NamesExamplesModal';
import {setNewCounterName, setOpenNamesExamplesModal} from "../../../actions/index";

describe('Names Examples modal component', () => {

    it('should not show Names examples modal in initial state', () => {
        const {container} = renderWithState(<NamesExamplesModal/>, getMockStore({}));
        expect(container.parentNode.childNodes[1]).toHaveStyle({position: 'fixed', zIndex: 9999999});
        expect(container.parentNode.childNodes[1]).toBeEmptyDOMElement();
    })

    it('should show names examples modal if open names examples modal state is true', () => {
        const {container} = renderWithState(<NamesExamplesModal/>, getMockStore({openNamesExamplesModal: true}));
        expect(container.parentNode.childNodes[1]).toHaveStyle({position: 'fixed', zIndex: 9999999});
        expect(container.parentNode.childNodes[1]).not.toBeEmptyDOMElement();
        expect(container.parentNode.childNodes[1]).toHaveTextContent(/Examples/i);
    });

    it('should dispatch set open names examples modal with false when click on close', () => {
        const mockStore = getMockStore({openNamesExamplesModal: true});
        renderWithState(<NamesExamplesModal/>, mockStore);
        fireEvent.click(screen.getByAltText('close'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setOpenNamesExamplesModal(false));
    });

    it('should dispatch set open names examples modal with false and set new counter name with suggestion name when click on chip', () => {
        const mockStore = getMockStore({openNamesExamplesModal: true});
        renderWithState(<NamesExamplesModal/>, mockStore);
        fireEvent.click(screen.getByText('Cups of coffee'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setNewCounterName('Cups of coffee'));
        expect(mockStore.dispatch).toHaveBeenCalledWith(setOpenNamesExamplesModal(false));
    });
})