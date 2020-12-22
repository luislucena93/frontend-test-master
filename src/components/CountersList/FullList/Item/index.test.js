import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import Item from "../Item";

describe("Item component", () => {
    let mockSelectCounter;
    let mockDecCounter;
    let mockIncCounter;

    beforeEach(() => {
        mockSelectCounter = jest.fn();
        mockDecCounter = jest.fn();
        mockIncCounter = jest.fn();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it("should call inc counter when click plus button after 1ms if not refreshing", () => {
        render(
            <Item
                selectedCounter={null}
                counter={{title: "test counter", id: "123", count: 1}}
                selectCounter={mockSelectCounter}
                decCounter={mockDecCounter}
                incCounter={mockIncCounter}
                refreshing={false}
            />
        );

        fireEvent.click(screen.getByAltText("inc"));
        jest.runAllTimers();

        expect(mockIncCounter).toHaveBeenCalledTimes(1);
        expect(setTimeout.mock.calls[0][1]).toBe(1);
    });

    it("should not call inc counter when click plus button after if already refreshing", () => {
        render(
            <Item
                selectedCounter={null}
                counter={{title: "test counter", id: "123", count: 1}}
                selectCounter={mockSelectCounter}
                decCounter={mockDecCounter}
                incCounter={mockIncCounter}
                refreshing={true}
            />
        );

        fireEvent.click(screen.getByAltText("inc"));

        expect(mockIncCounter).toHaveBeenCalledTimes(0);
    });

    it("should call dec counter when click minus button after 1ms if not refreshing", () => {
        render(
            <Item
                selectedCounter={null}
                counter={{title: "test counter", id: "123", count: 1}}
                selectCounter={mockSelectCounter}
                decCounter={mockDecCounter}
                incCounter={mockIncCounter}
                refreshing={false}
            />
        );

        fireEvent.click(screen.getByAltText("dec"));
        jest.runAllTimers();

        expect(mockDecCounter).toHaveBeenCalledTimes(1);
        expect(setTimeout.mock.calls[0][1]).toBe(1);
    });

    it("should not call dec counter when click minus button if already refreshing", () => {
        render(
            <Item
                selectedCounter={null}
                counter={{title: "test counter", id: "123", count: 1}}
                selectCounter={mockSelectCounter}
                decCounter={mockDecCounter}
                incCounter={mockIncCounter}
                refreshing={true}
            />
        );

        fireEvent.click(screen.getByAltText("dec"));

        expect(mockDecCounter).toHaveBeenCalledTimes(0);
    });

    it("should call selected counter when click anywhere over the item component after 1ms", () => {
        render(
            <Item
                selectedCounter={null}
                counter={{title: "test counter", id: "123", count: 1}}
                selectCounter={mockSelectCounter}
                decCounter={mockDecCounter}
                incCounter={mockIncCounter}
                refreshing={false}
            />
        );

        fireEvent.click(screen.getByAltText("dec"));
        jest.runAllTimers();

        expect(mockSelectCounter).toHaveBeenCalledTimes(1);
        expect(setTimeout.mock.calls[0][1]).toBe(1);

        fireEvent.click(screen.getByAltText("inc"));
        jest.runAllTimers();

        expect(mockSelectCounter).toHaveBeenCalledTimes(2);
        expect(setTimeout.mock.calls[1][1]).toBe(1);

        fireEvent.click(screen.getByText("test counter"));
        jest.runAllTimers();

        expect(mockSelectCounter).toHaveBeenCalledTimes(3);
        expect(setTimeout.mock.calls[2][1]).toBe(1);
    });

    it('main div should have class "selected" if the selected id match the counter', () => {
        const {container} = render(
            <Item
                selectedCounter={"123"}
                counter={{title: "test counter", id: "123", count: 0}}
                selectCounter={mockSelectCounter}
                decCounter={mockDecCounter}
                incCounter={mockIncCounter}
                refreshing={false}
            />
        );
        expect(container.firstChild).toHaveClass('selected');
    });

    it('dec button should be "disabled" and label must have class "zero" if the counter count is 0', () => {
        const {container} = render(
            <Item
                selectedCounter={"123"}
                counter={{title: "test counter", id: "123", count: 0}}
                selectCounter={mockSelectCounter}
                decCounter={mockDecCounter}
                incCounter={mockIncCounter}
                refreshing={false}
            />
        );
        expect(container.firstChild.childNodes[1].childNodes[0]).toBeDisabled();
        expect(container.firstChild.childNodes[1].childNodes[1]).toHaveClass("zero");
    });
});
