import React from 'react';
import {render, fireEvent, screen, act} from '@testing-library/react';
import Summary from "../Summary";

describe('Summary component', () => {
    let mockRefreshCounters;

    beforeEach(() => {
        mockRefreshCounters = jest.fn();
    });

    it('should call refresh counters when click refresh button and is not already refreshing', () => {
        render(<Summary selectedCounter={null} refreshing={false} refreshCounters={mockRefreshCounters} countersQty={0}
                        totalCount={0} hidden={false}/>);

        fireEvent.click(screen.getByAltText("refresh"));

        expect(mockRefreshCounters).toHaveBeenCalledTimes(1);
    });

    it('should not call refresh counters when click refresh button and is already refreshing', () => {
        render(<Summary selectedCounter={null} refreshing={true} refreshCounters={mockRefreshCounters} countersQty={1}
                        totalCount={1} hidden={false}/>);

        fireEvent.click(screen.getByAltText("refresh"));

        expect(mockRefreshCounters).toHaveBeenCalledTimes(0);
    });

    it('should render null when hidden is true', () => {
        const {container} = render(<Summary selectedCounter={null} refreshing={false}
                                            refreshCounters={mockRefreshCounters} countersQty={1}
                                            totalCount={1} hidden={true}/>);
        expect(container.firstChild).toBeNull()
    });

    it('should render idle summary when hidden is false and selected counter is null', () => {
        const {container} = render(<Summary selectedCounter={null} refreshing={false}
                                            refreshCounters={mockRefreshCounters} countersQty={1}
                                            totalCount={1} hidden={false}/>);
        expect(container.firstChild.childNodes[0]).toHaveTextContent('1 item');
        expect(container.firstChild.childNodes[1]).toHaveTextContent('1 time');
    });

    it('should render item selected summary when hidden is false and selected counter is not null', () => {
        const {container} = render(<Summary selectedCounter={'123'} refreshing={false}
                                            refreshCounters={mockRefreshCounters} countersQty={1}
                                            totalCount={1} hidden={false}/>);
        expect(container.firstChild.childNodes[0]).toHaveTextContent('1 selected');
    });

    it('should change dots state each 500ms to animate the refreshing label when refreshing is true', () => {
        jest.useFakeTimers();
        const {container} = render(<Summary selectedCounter={null} refreshing={true}
                                            refreshCounters={mockRefreshCounters} countersQty={1}
                                            totalCount={1} hidden={false}/>);
        expect(container.firstChild.childNodes[2].childNodes[1]).toHaveTextContent('Refreshing');
        act(() => jest.advanceTimersByTime(500));
        expect(container.firstChild.childNodes[2].childNodes[1]).toHaveTextContent('Refreshing.');
        act(() => jest.advanceTimersByTime(500));
        expect(container.firstChild.childNodes[2].childNodes[1]).toHaveTextContent('Refreshing..');
        act(() => jest.advanceTimersByTime(500));
        expect(container.firstChild.childNodes[2].childNodes[1]).toHaveTextContent('Refreshing...');
        act(() => jest.advanceTimersByTime(500));
        expect(container.firstChild.childNodes[2].childNodes[1]).toHaveTextContent('Refreshing');
        act(() => jest.runOnlyPendingTimers());
        jest.useRealTimers();


    });
});