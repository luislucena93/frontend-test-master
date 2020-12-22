import React from 'react';
import {render} from '@testing-library/react';
import EmptyList from "../EmptyList";

describe('Empty list component', () => {

    it('should render empty list correctly', () => {
        const {container} = render(<EmptyList/>);
        expect(container.firstChild.childNodes[0]).toHaveTextContent('No counters yet');
        expect(container.firstChild.childNodes[1]).toHaveTextContent('“When I started counting my blessings, my whole life turned around.”');
    });
});