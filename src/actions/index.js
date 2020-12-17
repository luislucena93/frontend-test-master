export const SET_LOADING = "SET_LOADING";
export const SET_COUNTERS = "SET_COUNTERS";
export const SET_CONNECTION_ERROR = "CONNECTION_ERROR";
export const UPDATE_COUNTER = "UPDATE_COUNTER";
export const SET_SEARCH_FILTER_ACTIVE = "SET_SEARCH_FILTER_ACTIVE";
export const SET_SEARCH_FILTER_TEXT = "SET_SEARCH_FILTER_TEXT";
export const SET_OPEN_ADD_COUNTER_MODAL = "SET_OPEN_ADD_COUNTER_MODAL";
export const ADD_COUNTER = "ADD_COUNTER";
export const SET_OPEN_NAMES_EXAMPLES_MODAL = "SET_OPEN_NAMES_EXAMPLES_MODAL";
export const SET_SELECTED_COUNTER = "SET_SELECTED_COUNTER";
export const SET_OPEN_DELETE_CONFIRMATION_MODAL = "SET_OPEN_DELETE_CONFIRMATION_MODAL";
export const REMOVE_COUNTER = "REMOVE_COUNTER";
export const SET_NEW_COUNTER_NAME = "SET_NEW_COUNTER_NAME";

export const getCounters = () => {
    return dispatch => {
        dispatch(setLoading(true));
        fetch('/api/v1/counter', {method: 'get'})
            .then((response) => {
                response.json()
                    .then((counters) => {
                        dispatch(setCounters(counters));
                        dispatch(setLoading(false))
                    })
                    .catch((err) => dispatch(setConnectionError(true)))
            })
            .catch((err) => dispatch(setConnectionError(true)))
    }
};

export const incrementCounter = (counterId) => {
    return dispatch => {
        fetch('/api/v1/counter/inc', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: counterId})
        }).then((response) => {
            response.json()
                .then((counter) => {
                    dispatch(updateCounter(counter));
                })
        })
    }
}

export const decrementCounter = (counterId) => {
    return dispatch => {
        fetch('/api/v1/counter/dec', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: counterId})
        }).then((response) => {
            response.json()
                .then((counter) => {
                    dispatch(updateCounter(counter));
                })
        })
    }
}

export const addCounter = (counterName) => {
    return dispatch => {
        dispatch(setLoading(true));
        fetch('/api/v1/counter', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: counterName})
        }).then((response) => {
            response.json()
                .then((counter) => {
                    dispatch(setLoading(false));
                    dispatch(addNewCounter(counter));
                    dispatch(setOpenAddCounterModal(false));
                    dispatch(setNewCounterName(''))
                })
        })
    }
}

export const deleteCounter = (counterId) => {
    return dispatch => {
        fetch('/api/v1/counter', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: counterId})
        }).then((response) => {
            response.json()
                .then((counter) => {
                    dispatch(setOpenDeleteConfirmationModal(false));
                    setTimeout(() => { //Espera a que se cierre la modal para no mostrar titulo vacío
                        dispatch(removeCounter(counterId));
                        dispatch(setSelectedCounter(null));
                    }, 200);
                })
        })
    }
}

export const setNewCounterName = (counterName) => ({type: SET_NEW_COUNTER_NAME, counterName})

export const removeCounter = (counterId) => ({type: REMOVE_COUNTER, counterId});

export const setOpenDeleteConfirmationModal = (open) => ({type: SET_OPEN_DELETE_CONFIRMATION_MODAL, open});

export const setSelectedCounter = (counterId) => ({type: SET_SELECTED_COUNTER, counterId});

export const setOpenAddCounterModal = (open) => ({type: SET_OPEN_ADD_COUNTER_MODAL, open});

export const setOpenNamesExamplesModal = (open) => ({type: SET_OPEN_NAMES_EXAMPLES_MODAL, open});

export const setSearchFilterActive = (isActive) => ({type: SET_SEARCH_FILTER_ACTIVE, isActive});

export const setSearchFilterText = (text) => ({type: SET_SEARCH_FILTER_TEXT, text});

export const setLoading = (loading) => ({type: SET_LOADING, loading});

export const setCounters = (counters) => ({type: SET_COUNTERS, counters});

export const setConnectionError = (error) => ({type: SET_CONNECTION_ERROR, error});

export const updateCounter = (counter) => ({type: UPDATE_COUNTER, counter});

export const addNewCounter = (counter) => ({type: ADD_COUNTER, counter});