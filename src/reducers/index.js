import {combineReducers} from 'redux'
import {
    SET_COUNTERS,
    SET_LOADING,
    SET_CONNECTION_ERROR,
    UPDATE_COUNTER,
    SET_SEARCH_FILTER_ACTIVE,
    SET_SEARCH_FILTER_TEXT, SET_OPEN_ADD_COUNTER_MODAL, ADD_COUNTER, SET_OPEN_NAMES_EXAMPLES_MODAL,
    SET_SELECTED_COUNTER, SET_OPEN_DELETE_CONFIRMATION_MODAL, REMOVE_COUNTER, SET_NEW_COUNTER_NAME
} from '../actions/index'

function counters(state = [], action) {
    switch (action.type) {
        case SET_COUNTERS:
            return action.counters;
        case UPDATE_COUNTER:
            return state.map((counter) => {
                if (counter.id !== action.counter.id) {
                    return counter;
                }
                return action.counter;
            });
        case ADD_COUNTER:
            return [...state, action.counter];
        case REMOVE_COUNTER:
            return state.filter((counter) => counter.id !== action.counterId)
        default:
            return state
    }
}

function loading(state = false, action) {
    switch (action.type) {
        case SET_LOADING:
            return action.loading;
        default:
            return state;
    }
}

function connectionError(state = false, action) {
    switch (action.type) {
        case SET_CONNECTION_ERROR:
            return action.error;
        default:
            return state;
    }
}

function searchFilter(state = {isActive: false, text: ''}, action) {
    switch (action.type) {
        case SET_SEARCH_FILTER_ACTIVE:
            return Object.assign({}, state, {isActive: action.isActive});
        case SET_SEARCH_FILTER_TEXT:
            return Object.assign({}, state, {text: action.text});
        default:
            return state;
    }
}

function openAddCounterModal(state = false, action) {
    switch (action.type) {
        case SET_OPEN_ADD_COUNTER_MODAL:
            return action.open;
        default:
            return state;
    }
}

function openNamesExamplesModal(state = false, action) {
    switch (action.type) {
        case SET_OPEN_NAMES_EXAMPLES_MODAL:
            return action.open;
        default:
            return state;
    }
}

function selectedCounter(state = null, action) {
    switch (action.type) {
        case SET_SELECTED_COUNTER:
            return action.counterId;
        default:
            return state;
    }
}

function openDeleteConfirmationModal(state = false, action) {
    switch (action.type) {
        case SET_OPEN_DELETE_CONFIRMATION_MODAL:
            return action.open;
        default:
            return state;
    }
}

function newCounterName(state = '', action) {
    switch (action.type) {
        case SET_NEW_COUNTER_NAME:
            return action.counterName;
        default:
            return state;
    }
}


const CountersApp = combineReducers({
    counters,
    connectionError,
    loading,
    searchFilter,
    openAddCounterModal,
    openNamesExamplesModal,
    selectedCounter,
    openDeleteConfirmationModal,
    newCounterName,
})

export default CountersApp;