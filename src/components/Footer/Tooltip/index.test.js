import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import Tooltip from "../Tooltip";

describe("Tooltip component", () => {
    let mockClose;

    beforeEach(() => {
        mockClose = jest.fn();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it("should close when click outside tooltip if 200ms have past", () => {
        render(
            <Tooltip
                counter={{title: "test counter", id: "123", count: 1}}
                close={mockClose}
            />
        );
        fireEvent.click(screen.getByTestId("tooltipOverlay"));
        expect(mockClose).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(200);
        fireEvent.click(screen.getByTestId("tooltipOverlay"));
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it("should not close when click inside tooltip after 200ms", () => {
        render(
            <Tooltip
                counter={{title: "test counter", id: "123", count: 1}}
                close={mockClose}
            />
        );
        document.execCommand = jest.fn();
        jest.advanceTimersByTime(200);
        fireEvent.click(screen.getByText("Copy"));
        expect(mockClose).toHaveBeenCalledTimes(0);
    });

    it("should copy an then close after 100ms when click in copy button", () => {
        render(
            <Tooltip
                counter={{title: "test counter", id: "123", count: 1}}
                close={mockClose}
            />
        );
        const mockExecCommand = jest.fn();
        document.execCommand = mockExecCommand;
        fireEvent.click(screen.getByText('Copy'));
        expect(mockExecCommand).toHaveBeenCalledWith('copy');
        expect(mockClose).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(100);
        expect(mockClose).toHaveBeenCalledTimes(1);
    })
});
