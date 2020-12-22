import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import FullList from "../FullList";

describe("Full List component", () => {
    let mockClickOutsideList;
    let mockClickOnListItem;
    let mockClickIncItem;
    let mockClickDecItem;
    let mockClickRefresh;

    beforeEach(() => {
        mockClickOutsideList = jest.fn();
        mockClickOnListItem = jest.fn();
        mockClickIncItem = jest.fn();
        mockClickDecItem = jest.fn();
        mockClickRefresh = jest.fn();

    });

    it('should render no results when counter list is empty', () => {
        const {container} = render(<FullList
            counters={[]}
            selectedCounter={null}
            disabled={false}
            refreshing={false}
            handleClickOutsideList={mockClickOutsideList}
            handleClickOnListItem={mockClickOnListItem}
            handleClickIncItem={mockClickIncItem}
            handleClickDecItem={mockClickDecItem}
            handleClickRefresh={mockClickRefresh}
        />);
        expect(container.firstChild.firstChild).toHaveClass("noResults");
    });

    it('should render summary and item list when counter list is not empty', () => {
        const {container} = render(<FullList
            counters={[{id: "123", title: "test counter", count: 0}]}
            selectedCounter={null}
            disabled={false}
            refreshing={false}
            handleClickOutsideList={mockClickOutsideList}
            handleClickOnListItem={mockClickOnListItem}
            handleClickIncItem={mockClickIncItem}
            handleClickDecItem={mockClickDecItem}
            handleClickRefresh={mockClickRefresh}
        />);
        expect(container.firstChild.firstChild).toHaveClass("listSummary");
        expect(container.firstChild.childNodes[1]).toHaveClass("itemsList");
    });

    it('should render disabled overlay when counter disabled is true', () => {
        const {container, debug} = render(<FullList
            counters={[{id: "123", title: "test counter", count: 0}]}
            selectedCounter={null}
            disabled={true}
            refreshing={false}
            handleClickOutsideList={mockClickOutsideList}
            handleClickOnListItem={mockClickOnListItem}
            handleClickIncItem={mockClickIncItem}
            handleClickDecItem={mockClickDecItem}
            handleClickRefresh={mockClickRefresh}
        />);
        expect(container.firstChild.childNodes[2]).toHaveClass("disableOverlay");
    });

    it('should call handleCLickOutsideList when click anywhere but the list', () => {
        const {container, debug} = render(<FullList
            counters={[{id: "123", title: "test counter", count: 0}]}
            selectedCounter={null}
            disabled={false}
            refreshing={false}
            handleClickOutsideList={mockClickOutsideList}
            handleClickOnListItem={mockClickOnListItem}
            handleClickIncItem={mockClickIncItem}
            handleClickDecItem={mockClickDecItem}
            handleClickRefresh={mockClickRefresh}
        />);
        fireEvent.click(container.firstChild.childNodes[1]); //itemsList
        expect(mockClickOutsideList).toHaveBeenCalledTimes(0);
        fireEvent.click(container.firstChild.childNodes[0]); // summary
        expect(mockClickOutsideList).toHaveBeenCalledTimes(1);
    });
});