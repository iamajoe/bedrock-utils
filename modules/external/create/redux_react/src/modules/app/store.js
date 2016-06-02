import { breadcrumbReducer } from 'bedrock/store';
import { combineReducers } from 'redux';

// -----------------------------------------
// VARS

const BREADCRUMB_SCHEMA = {
    'INDEX': { name: 'Dashboard' },
    'ADD': { name: 'Add', parentType: 'INDEX' }
};

const INITIAL_STATE = {
    breadcrumb: [],
    content: {
        type: '',
        params: {}
    },
    modal: {
        type: null,
        params: {}
    },
    modules: [
        { name: 'Dashboard', routeType: 'INDEX' }
    ]
};

// -----------------------------------------
// FUNCTIONS

/**
 * Content reducer
 * @param  {object}  state
 * @param  {object}  action
 * @return {object}
 */
const content = (state = INITIAL_STATE.content, action) => {
    switch (action.type) {
    case 'SET_CONTENT':
        return { ...action.content };
    default:
        return { ...state };
    }
};

/**
 * Sets modal
 * @param  {object} state
 * @param  {object} action
 * @return {object}
 */
const modal = (state = INITIAL_STATE.modal, action) => {
    switch (action.type) {
    case 'SET_MODAL':
        return { ...action.modal };
    default:
        return { ...state };
    }
};

// -----------------------------------------
// EXPORT

export default {
    getInitial: () => INITIAL_STATE,
    reducers: combineReducers({
        breadcrumb: breadcrumbReducer(INITIAL_STATE.breadcrumb, BREADCRUMB_SCHEMA),
        modal, content
    })
};
