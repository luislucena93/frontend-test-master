import React from 'react'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom';
import {render} from "@testing-library/react";
import App from './app';
import {getMockStore} from "../test/utils/storeWrapper";

describe('App component', () => {

    it('should render welcome Screen for "/" path', () => {
        const history = createMemoryHistory();
        const {container} = render(<Router history={history}><App store={getMockStore()}/></Router>);
        expect(container).toHaveTextContent(/Welcome to counters/i);
    })

    it('should render main Screen for "/mainScreen" path', () => {
        const history = createMemoryHistory();
        history.push('/mainScreen');
        const {container} = render(<Router history={history}><App store={getMockStore()}/></Router>);
        expect(container).toHaveTextContent(/No counters yet/i);
    })

});
