import CountersApp from '../reducers';
import {
    ADD_COUNTER, CLEAR_CONNECTION_ERROR, ERROR_GET_COUNTERS, REMOVE_COUNTER, SET_CONNECTION_ERROR, SET_COUNTERS,
    SET_LOADING,
    SET_NEW_COUNTER_NAME, SET_OPEN_ADD_COUNTER_MODAL, SET_OPEN_DELETE_CONFIRMATION_MODAL, SET_OPEN_ERROR_MODAL,
    SET_OPEN_NAMES_EXAMPLES_MODAL,
    SET_REFRESHING,
    SET_SEARCH_FILTER_ACTIVE, SET_SEARCH_FILTER_TEXT,
    SET_SELECTED_COUNTER, SET_SHOW_TOOLTIP,
    UPDATE_COUNTER
} from "../actions/index";

describe('Counters reducer', () => {

    it('should return initial state', () => {
        expect(CountersApp(undefined, {}).counters).toEqual([]);
    })

    it('should handle set counters', () => {
        expect(CountersApp({counters: []}, {
            type: SET_COUNTERS,
            counters: [{id: '123', title: 'test counter', count: 0}]
        }).counters).toEqual([{
            id: '123',
            title: 'test counter',
            count: 0
        }]);
    })

    it('should handle update counter', () => {
        expect(CountersApp({
            counters: [{
                id: '123', title: 'test counter', count: 0
            }, {
                id: '234', title: 'test counter', count: 0
            }]
        }, {
            type: UPDATE_COUNTER,
            counter: {id: '123', title: 'test counter', count: 1}
        }).counters).toEqual([{
            id: '123', title: 'test counter', count: 1
        }, {
            id: '234', title: 'test counter', count: 0
        }]);
    })

    it('should handle add counter', () => {
        expect(CountersApp({counters: [{id: '123', title: 'test counter', count: 0}]}, {
            type: ADD_COUNTER,
            counter: {id: '234', title: 'test counter 2', count: 0}
        }).counters).toEqual([{
            id: '123',
            title: 'test counter',
            count: 0
        }, {
            id: '234',
            title: 'test counter 2',
            count: 0
        }]);
    })

    it('should handle remove counter', () => {
        expect(CountersApp({counters: [{id: '123', title: 'test counter', count: 0}]}, {
            type: REMOVE_COUNTER,
            counterId: '123'
        }).counters).toEqual([]);
    })

});

describe('selectedCounter reducer', () => {

    it('should return initial state', () => {
        expect(CountersApp(undefined, {}).selectedCounter).toEqual(null);
    });

    it('should handle set selected counter', () => {
        expect(CountersApp({selectedCounter: null}, {
            type: SET_SELECTED_COUNTER,
            counterId: '123'
        }).selectedCounter).toEqual('123');
    })

})

describe('newCounterName reducer', () => {

    it('should return initial state', () => {
        expect(CountersApp(undefined, {}).newCounterName).toEqual('');
    });

    it('should handle set new counter name', () => {
        expect(CountersApp({newCounterName: ''}, {
            type: SET_NEW_COUNTER_NAME,
            counterName: 'test counter'
        }).newCounterName).toEqual('test counter');
    })

})


describe('conneectionError reducer', () => {

    it('should return initial state', () => {
        expect(CountersApp(undefined, {}).connectionError).toEqual(null);
    });

    it('should handle set connection error', () => {
        expect(CountersApp({connectionError: null}, {
            type: SET_CONNECTION_ERROR,
            error: ERROR_GET_COUNTERS
        }).connectionError).toEqual(ERROR_GET_COUNTERS);
    })

    it('should handle clear connection error', () => {
        expect(CountersApp({connectionError: ERROR_GET_COUNTERS}, {
            type: CLEAR_CONNECTION_ERROR,
        }).connectionError).toEqual(null);
    })

})

describe('refreshing reducer', () => {

    it('should return initial state', () => {
        expect(CountersApp(undefined, {}).refreshing).toEqual(false);
    });

    it('should handle set refreshing', () => {
        expect(CountersApp({refreshing: false}, {
            type: SET_REFRESHING,
            refreshing: true
        }).refreshing).toEqual(true);
    })

})

describe('loading reducer', () => {

    it('should return initial state', () => {
        expect(CountersApp(undefined, {}).loading).toEqual(false);
    });

    it('should handle set loading', () => {
        expect(CountersApp({loading: false}, {
            type: SET_LOADING,
            loading: true
        }).loading).toEqual(true);
    })

})

describe('searchFIlter reducer', () => {

    it('should return initial state', () => {
        expect(CountersApp(undefined, {}).searchFilter).toEqual({isActive: false, text: ''});
    });

    it('should handle set search filter active', () => {
        expect(CountersApp({searchFilter: {isActive: false, text: ''}}, {
            type: SET_SEARCH_FILTER_ACTIVE,
            isActive: true
        }).searchFilter).toEqual({isActive: true, text: ''});
    });

    it('should handle set search filter text', () => {
        expect(CountersApp({searchFilter: {isActive: true, text: ''}}, {
            type: SET_SEARCH_FILTER_TEXT,
            text: 'new search'
        }).searchFilter).toEqual({isActive: true, text: 'new search'});
    });

})

describe('openAddCounterModal reducer', () => {

    it('should return initial state', () => {
        expect(CountersApp(undefined, {}).openAddCounterModal).toEqual(false);
    });

    it('should handle set open add counter modal', () => {
        expect(CountersApp({openAddCounterModal: false}, {
            type: SET_OPEN_ADD_COUNTER_MODAL,
            open: true
        }).openAddCounterModal).toEqual(true);
    })

})

describe('openNamesExamplesModal reducer', () => {

    it('should return initial state', () => {
        expect(CountersApp(undefined, {}).openNamesExamplesModal).toEqual(false);
    });

    it('should handle set open names examples modal', () => {
        expect(CountersApp({openNamesExamplesModal: false}, {
            type: SET_OPEN_NAMES_EXAMPLES_MODAL,
            open: true
        }).openNamesExamplesModal).toEqual(true);
    })

})


describe('openDeleteCOnfirmationModal reducer', () => {

    it('should return initial state', () => {
        expect(CountersApp(undefined, {}).openDeleteConfirmationModal).toEqual(false);
    });

    it('should handle set open delete confirmation modal', () => {
        expect(CountersApp({openDeleteConfirmationModal: false}, {
            type: SET_OPEN_DELETE_CONFIRMATION_MODAL,
            open: true
        }).openDeleteConfirmationModal).toEqual(true);
    })

})

describe('openErrorModal reducer', () => {

    it('should return initial state', () => {
        expect(CountersApp(undefined, {}).openErrorModal).toEqual(false);
    });

    it('should handle set open error modal', () => {
        expect(CountersApp({openErrorModal: false}, {
            type: SET_OPEN_ERROR_MODAL,
            open: true
        }).openErrorModal).toEqual(true);
    })

})


describe('showTooltip reducer', () => {

    it('should return initial state', () => {
        expect(CountersApp(undefined, {}).showTooltip).toEqual(false);
    });

    it('should handle set show tooltip modal', () => {
        expect(CountersApp({showTooltip: false}, {
            type: SET_SHOW_TOOLTIP,
            show: true
        }).showTooltip).toEqual(true);
    })

})