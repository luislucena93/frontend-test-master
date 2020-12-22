import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import ErrorScreen from "../ErrorScreen";

describe('Error screen component', () => {
    let mockRetryClick;

    beforeEach(() => {
        mockRetryClick = jest.fn();
    });

    it('should call handle retry click when click the button', () => {
        const {container} = render(<ErrorScreen handleRetryClick={mockRetryClick}/>);
        fireEvent.click(container.firstChild.childNodes[2]);
        expect(mockRetryClick).toHaveBeenCalledTimes(1);
    });
});