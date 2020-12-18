//APP STATE RELATED TYPES
export const SET_LOADING = "SET_LOADING";
export const SET_REFRESHING = "SET_REFRESHING";

export const SET_SEARCH_FILTER_ACTIVE = "SET_SEARCH_FILTER_ACTIVE";
export const SET_SEARCH_FILTER_TEXT = "SET_SEARCH_FILTER_TEXT";

export const SET_CONNECTION_ERROR = "CONNECTION_ERROR";
export const CLEAR_CONNECTION_ERROR = "CLEAR_CONNECTION_ERROR";

export const SET_OPEN_ADD_COUNTER_MODAL = "SET_OPEN_ADD_COUNTER_MODAL";
export const SET_OPEN_NAMES_EXAMPLES_MODAL = "SET_OPEN_NAMES_EXAMPLES_MODAL";
export const SET_OPEN_DELETE_CONFIRMATION_MODAL = "SET_OPEN_DELETE_CONFIRMATION_MODAL";
export const SET_OPEN_ERROR_MODAL = "SET_OPEN_ERROR_MODAL";
export const SET_SHOW_TOOLTIP = "SET_SHOW_TOOLTIP";

//COUNTERS MANAGEMENT RELATED TYPES
export const SET_SELECTED_COUNTER = "SET_SELECTED_COUNTER";
export const SET_NEW_COUNTER_NAME = "SET_NEW_COUNTER_NAME";
export const SET_COUNTERS = "SET_COUNTERS";
export const UPDATE_COUNTER = "UPDATE_COUNTER";
export const ADD_COUNTER = "ADD_COUNTER";
export const REMOVE_COUNTER = "REMOVE_COUNTER";

//ERROR TYPES
export const ERROR_GET_COUNTERS = "ERROR_GET_COUNTERS";
export const ERROR_INC_COUNTER = "ERROR_INC_COUNTER";
export const ERROR_DEC_COUNTER = "ERROR_DEC_COUNTER";
export const ERROR_DEL_COUNTER = "ERROR_DEL_COUNTER";
export const ERROR_ADD_COUNTER = "ERROR_ADD_COUNTER";

//APP STATE RELATED ACTIONS
export const setLoading = (loading) => ({type: SET_LOADING, loading});

export const setRefreshing = (refreshing) => ({type: SET_REFRESHING, refreshing});

export const setSearchFilterActive = (isActive) => ({type: SET_SEARCH_FILTER_ACTIVE, isActive});

export const setSearchFilterText = (text) => ({type: SET_SEARCH_FILTER_TEXT, text});

export const setConnectionError = (error) => ({type: SET_CONNECTION_ERROR, error});

export const clearConnectionError = () => ({type: CLEAR_CONNECTION_ERROR});

export const setOpenAddCounterModal = (open) => ({type: SET_OPEN_ADD_COUNTER_MODAL, open});

export const setOpenNamesExamplesModal = (open) => ({type: SET_OPEN_NAMES_EXAMPLES_MODAL, open});

export const setOpenDeleteConfirmationModal = (open) => ({type: SET_OPEN_DELETE_CONFIRMATION_MODAL, open});

export const setOpenErrorModal = (open) => ({type: SET_OPEN_ERROR_MODAL, open});

export const setShowTooltip = (show) => ({type: SET_SHOW_TOOLTIP, show});


//COUNTERS MANAGEMENT RELATED ACTIONS
export const setSelectedCounter = (counterId) => ({type: SET_SELECTED_COUNTER, counterId});

export const setNewCounterName = (counterName) => ({type: SET_NEW_COUNTER_NAME, counterName});

export const setCounters = (counters) => ({type: SET_COUNTERS, counters});

export const updateCounter = (counter) => ({type: UPDATE_COUNTER, counter});

export const addNewCounter = (counter) => ({type: ADD_COUNTER, counter});

export const removeCounter = (counterId) => ({type: REMOVE_COUNTER, counterId});


//THUNK ASYNC ACTIONS
export const getCounters = () => {
    return dispatch => {
        dispatch(setLoading(true));
        dispatch(clearConnectionError());
        fetch('/api/v1/counter', {method: 'get'})
            .then((response) => {
                response.json()
                    .then((counters) => {
                        dispatch(setCounters(counters));
                        dispatch(setLoading(false))
                    })
            })
            .catch(() => {
                dispatch(setConnectionError('ERROR_GET_COUNTERS'));
                dispatch(setLoading(false));
            })
    }
};

export const incrementCounter = (counterId) => {
    return dispatch => {
        dispatch(clearConnectionError());
        dispatch(setOpenErrorModal(false));
        dispatch(setRefreshing(true));
        fetch('/api/v1/counter/inc', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: counterId})
        }).then((response) => {
            response.json()
                .then((counter) => {
                    dispatch(updateCounter(counter));
                    dispatch(setRefreshing(false));
                })
        }).catch(() => {
            dispatch(setConnectionError(ERROR_INC_COUNTER));
            dispatch(setOpenErrorModal(true));
            dispatch(setRefreshing(false));
        })
    }
};

export const decrementCounter = (counterId) => {
    return dispatch => {
        dispatch(clearConnectionError());
        dispatch(setOpenErrorModal(false));
        dispatch(setRefreshing(true));
        fetch('/api/v1/counter/dec', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: counterId})
        }).then((response) => {
            response.json()
                .then((counter) => {
                    dispatch(updateCounter(counter));
                    dispatch(setRefreshing(false));
                })
        }).catch(() => {
            dispatch(setConnectionError(ERROR_DEC_COUNTER))
            dispatch(setOpenErrorModal(true));
            dispatch(setRefreshing(false));
        })

    }
};

export const addCounter = (counterName) => {
    return dispatch => {
        dispatch(clearConnectionError());
        dispatch(setOpenErrorModal(false));
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
        }).catch(() => {
            dispatch(setConnectionError(ERROR_ADD_COUNTER));
            dispatch(setLoading(false));
            dispatch(setOpenErrorModal(true));
        })
    }
};

export const deleteCounter = (counterId) => {
    return dispatch => {
        dispatch(clearConnectionError());
        dispatch(setOpenErrorModal(false));
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
        }).catch(() => {
            dispatch(setConnectionError(ERROR_DEL_COUNTER));
            dispatch(setOpenErrorModal(true));
        })
    }
};

export const refreshCounters = () => {
    return dispatch => {
        dispatch(clearConnectionError());
        dispatch(setRefreshing(true));
        fetch('/api/v1/counter', {method: 'get'})
            .then((response) => {
                response.json()
                    .then((counters) => {
                        dispatch(setCounters(counters));
                        dispatch(setRefreshing(false))
                    })
            })
            .catch((err) => dispatch(setConnectionError(ERROR_GET_COUNTERS)))
    }
};