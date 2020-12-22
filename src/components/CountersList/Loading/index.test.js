import React from 'react';
import {render, act} from '@testing-library/react';
import Loading from "../Loading";

describe('Loading component', () => {

    it('should render loading and change class every 500ms', () => {
        jest.useFakeTimers();
        const {container} = render(<Loading/>);
        expect(container.firstChild.firstChild).toHaveClass('transparent');
        act(() => jest.advanceTimersByTime(500));
        expect(container.firstChild.firstChild).not.toHaveClass('transparent');
        act(() => jest.runOnlyPendingTimers());
        jest.useRealTimers();
    });
});