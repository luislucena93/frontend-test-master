import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {
    ADD_COUNTER, addCounter, addNewCounter,
    CLEAR_CONNECTION_ERROR, clearConnectionError, decrementCounter, deleteCounter, ERROR_ADD_COUNTER, ERROR_DEC_COUNTER,
    ERROR_DEL_COUNTER,
    ERROR_GET_COUNTERS, ERROR_INC_COUNTER, getCounters, incrementCounter, refreshCounters, REMOVE_COUNTER,
    removeCounter,
    SET_CONNECTION_ERROR,
    SET_COUNTERS,
    SET_LOADING, SET_NEW_COUNTER_NAME, SET_OPEN_ADD_COUNTER_MODAL, SET_OPEN_DELETE_CONFIRMATION_MODAL,
    SET_OPEN_ERROR_MODAL,
    SET_OPEN_NAMES_EXAMPLES_MODAL,
    SET_REFRESHING, SET_SEARCH_FILTER_ACTIVE,
    SET_SEARCH_FILTER_TEXT, SET_SELECTED_COUNTER, SET_SHOW_TOOLTIP,
    setConnectionError, setCounters, setLoading, setNewCounterName, setOpenAddCounterModal,
    setOpenDeleteConfirmationModal,
    setOpenErrorModal,
    setOpenNamesExamplesModal,
    setRefreshing,
    setSearchFilterActive, setSearchFilterText, setSelectedCounter, setShowTooltip, UPDATE_COUNTER, updateCounter
} from "./index";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('actions', () => {
    it('should create an action to set loading state', () => {
        const loading = true;
        const expectedAction = {
            type: SET_LOADING,
            loading
        }
        expect(setLoading(true)).toEqual(expectedAction);
    });

    it('should create an action to set refreshing state', () => {
        const refreshing = true;
        const expectedAction = {
            type: SET_REFRESHING,
            refreshing
        }
        expect(setRefreshing(true)).toEqual(expectedAction);
    });

    it('should create an action to set search filter active state', () => {
        const isActive = true;
        const expectedAction = {
            type: SET_SEARCH_FILTER_ACTIVE,
            isActive
        }
        expect(setSearchFilterActive(true)).toEqual(expectedAction);
    });

    it('should create an action to set search filter text state', () => {
        const text = 'search text';
        const expectedAction = {
            type: SET_SEARCH_FILTER_TEXT,
            text
        }
        expect(setSearchFilterText(text)).toEqual(expectedAction);
    });

    it('should create an action to set connection error state', () => {
        const error = ERROR_GET_COUNTERS;
        const expectedAction = {
            type: SET_CONNECTION_ERROR,
            error
        }
        expect(setConnectionError(error)).toEqual(expectedAction);
    });

    it('should create an action to clear connection error state', () => {
        const expectedAction = {
            type: CLEAR_CONNECTION_ERROR,
        }
        expect(clearConnectionError()).toEqual(expectedAction);
    });

    it('should create an action to set open add counter modal state', () => {
        const open = true;
        const expectedAction = {
            type: SET_OPEN_ADD_COUNTER_MODAL,
            open
        }
        expect(setOpenAddCounterModal(open)).toEqual(expectedAction);
    });

    it('should create an action to set open names examples modal state', () => {
        const open = true;
        const expectedAction = {
            type: SET_OPEN_NAMES_EXAMPLES_MODAL,
            open
        }
        expect(setOpenNamesExamplesModal(open)).toEqual(expectedAction);
    });

    it('should create an action to set open delete confirmation modal state', () => {
        const open = true;
        const expectedAction = {
            type: SET_OPEN_DELETE_CONFIRMATION_MODAL,
            open
        }
        expect(setOpenDeleteConfirmationModal(open)).toEqual(expectedAction);
    });

    it('should create an action to set open error modal state', () => {
        const open = true;
        const expectedAction = {
            type: SET_OPEN_ERROR_MODAL,
            open
        }
        expect(setOpenErrorModal(open)).toEqual(expectedAction);
    });

    it('should create an action to set show tooltip state', () => {
        const show = true;
        const expectedAction = {
            type: SET_SHOW_TOOLTIP,
            show
        }
        expect(setShowTooltip(show)).toEqual(expectedAction);
    });

    it('should create an action to set selected counter state', () => {
        const counterId = '123';
        const expectedAction = {
            type: SET_SELECTED_COUNTER,
            counterId
        }
        expect(setSelectedCounter(counterId)).toEqual(expectedAction);
    });

    it('should create an action to set new counter name state', () => {
        const counterName = 'test counter';
        const expectedAction = {
            type: SET_NEW_COUNTER_NAME,
            counterName
        }
        expect(setNewCounterName(counterName)).toEqual(expectedAction);
    });

    it('should create an action to set counters state', () => {
        const counters = [{id: '123', title: 'test counter', count: 0}];
        const expectedAction = {
            type: SET_COUNTERS,
            counters
        }
        expect(setCounters(counters)).toEqual(expectedAction);
    });

    it('should create an action to update counter state', () => {
        const counter = {id: '123', title: 'test counter', count: 1};
        const expectedAction = {
            type: UPDATE_COUNTER,
            counter
        }
        expect(updateCounter(counter)).toEqual(expectedAction);
    });

    it('should create an action to add new counter state', () => {
        const counter = {id: '123', title: 'test counter', count: 0};
        const expectedAction = {
            type: ADD_COUNTER,
            counter
        }
        expect(addNewCounter(counter)).toEqual(expectedAction);
    });

    it('should create an action to remove counter state', () => {
        const counterId = '123';
        const expectedAction = {
            type: REMOVE_COUNTER,
            counterId
        }
        expect(removeCounter(counterId)).toEqual(expectedAction);
    });

});

describe('async actions', () => {

    it('dispatch expected actions when getting counters from api', () => {
        const counters = [{id: '123', title: 'test counter', count: 0}];
        fetchMock.mockOnce(JSON.stringify(counters));

        const expectedActions = [
            {type: SET_LOADING, loading: true},
            {type: CLEAR_CONNECTION_ERROR},
            {type: SET_COUNTERS, counters},
            {type: SET_LOADING, loading: false},
        ]
        const store = mockStore();

        return store.dispatch(getCounters()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch expected actions when error getting counters from api', () => {
        fetchMock.mockRejectOnce();

        const expectedActions = [
            {type: SET_LOADING, loading: true},
            {type: CLEAR_CONNECTION_ERROR},
            {type: SET_CONNECTION_ERROR, error: ERROR_GET_COUNTERS},
            {type: SET_LOADING, loading: false},
        ]
        const store = mockStore();

        return store.dispatch(getCounters()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch expected actions when calling increment counter from api', () => {
        const counter = {id: '123', title: 'test counter', count: 1};
        fetchMock.mockOnce(JSON.stringify(counter));

        const expectedActions = [
            {type: CLEAR_CONNECTION_ERROR},
            {type: SET_OPEN_ERROR_MODAL, open: false},
            {type: SET_REFRESHING, refreshing: true},
            {type: UPDATE_COUNTER, counter},
            {type: SET_REFRESHING, refreshing: false},
        ]
        const store = mockStore();

        return store.dispatch(incrementCounter('123')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch expected actions when error incrementing counter', () => {
        fetchMock.mockRejectOnce();

        const expectedActions = [
            {type: CLEAR_CONNECTION_ERROR},
            {type: SET_OPEN_ERROR_MODAL, open: false},
            {type: SET_REFRESHING, refreshing: true},
            {type: SET_CONNECTION_ERROR, error: ERROR_INC_COUNTER},
            {type: SET_OPEN_ERROR_MODAL, open: true},
            {type: SET_REFRESHING, refreshing: false},
        ]
        const store = mockStore();

        return store.dispatch(incrementCounter('123')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch expected actions when calling decrement counter from api', () => {
        const counter = {id: '123', title: 'test counter', count: 0};
        fetchMock.mockOnce(JSON.stringify(counter));

        const expectedActions = [
            {type: CLEAR_CONNECTION_ERROR},
            {type: SET_OPEN_ERROR_MODAL, open: false},
            {type: SET_REFRESHING, refreshing: true},
            {type: UPDATE_COUNTER, counter},
            {type: SET_REFRESHING, refreshing: false},
        ]
        const store = mockStore();

        return store.dispatch(decrementCounter('123')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch expected actions when error decrementing counter', () => {
        fetchMock.mockRejectOnce();

        const expectedActions = [
            {type: CLEAR_CONNECTION_ERROR},
            {type: SET_OPEN_ERROR_MODAL, open: false},
            {type: SET_REFRESHING, refreshing: true},
            {type: SET_CONNECTION_ERROR, error: ERROR_DEC_COUNTER},
            {type: SET_OPEN_ERROR_MODAL, open: true},
            {type: SET_REFRESHING, refreshing: false},
        ]
        const store = mockStore();

        return store.dispatch(decrementCounter('123')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch expected actions when calling add counter from api', () => {
        const counter = {id: '123', title: 'test counter', count: 0};
        fetchMock.mockOnce(JSON.stringify(counter));

        const expectedActions = [
            {type: CLEAR_CONNECTION_ERROR},
            {type: SET_OPEN_ERROR_MODAL, open: false},
            {type: SET_LOADING, loading: true},
            {type: ADD_COUNTER, counter},
            {type: SET_OPEN_ADD_COUNTER_MODAL, open: false},
            {type: SET_NEW_COUNTER_NAME, counterName: ''},
            {type: SET_LOADING, loading: false},
        ]
        const store = mockStore();

        return store.dispatch(addCounter('test counter')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch expected actions when error adding new counter', () => {
        fetchMock.mockRejectOnce();

        const expectedActions = [
            {type: CLEAR_CONNECTION_ERROR},
            {type: SET_OPEN_ERROR_MODAL, open: false},
            {type: SET_LOADING, loading: true},
            {type: SET_CONNECTION_ERROR, error: ERROR_ADD_COUNTER},
            {type: SET_OPEN_ERROR_MODAL, open: true},
            {type: SET_LOADING, loading: false},
        ]
        const store = mockStore();

        return store.dispatch(addCounter('test counter')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch expected actions when calling delete counter from api', () => {
        const counter = {id: '123', title: 'test counter', count: 0};
        fetchMock.mockOnce(JSON.stringify(counter));
        jest.useFakeTimers()
        const expectedActions = [
            {type: CLEAR_CONNECTION_ERROR},
            {type: SET_OPEN_ERROR_MODAL, open: false},
            {type: SET_OPEN_DELETE_CONFIRMATION_MODAL, open: false},
            {type: REMOVE_COUNTER, counterId: counter.id},
            {type: SET_SELECTED_COUNTER, counterId: null},
        ]
        const store = mockStore();

        return store.dispatch(deleteCounter('123')).then(() => {
            // return of async actions
            jest.runAllTimers();
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch expected actions when error deleting counter', () => {
        fetchMock.mockRejectOnce();

        const expectedActions = [
            {type: CLEAR_CONNECTION_ERROR},
            {type: SET_OPEN_ERROR_MODAL, open: false},
            {type: SET_CONNECTION_ERROR, error: ERROR_DEL_COUNTER},
            {type: SET_OPEN_ERROR_MODAL, open: true},
        ]
        const store = mockStore();

        return store.dispatch(deleteCounter('123')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch expected actions when calling refresh counters from api', () => {
        const counters = [{id: '123', title: 'test counter', count: 0}];
        fetchMock.mockOnce(JSON.stringify(counters));
        const expectedActions = [
            {type: CLEAR_CONNECTION_ERROR},
            {type: SET_REFRESHING, refreshing: true},
            {type: SET_COUNTERS, counters},
            {type: SET_REFRESHING, refreshing: false},
        ]
        const store = mockStore();

        return store.dispatch(refreshCounters()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch expected actions when error refreshing counters', () => {
        fetchMock.mockRejectOnce();

        const expectedActions = [
            {type: CLEAR_CONNECTION_ERROR},
            {type: SET_REFRESHING, refreshing: true},
            {type: SET_CONNECTION_ERROR, error: ERROR_GET_COUNTERS},
            {type: SET_REFRESHING, refreshing: false}
        ]
        const store = mockStore();

        return store.dispatch(refreshCounters('123')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})