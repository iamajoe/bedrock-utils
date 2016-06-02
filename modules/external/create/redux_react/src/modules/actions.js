import store from './store.js';
import appActionsFn from './app/actions.js';

// -----------------------------------------
// VARS

const appActions = appActionsFn(store);

// Add to the update pool
store.subscribe(() => {
    // TODO: Do you need to do anything at this stage?
});

// -----------------------------------------
// EXPORT

export default {
    subscribe: store.subscribe,
    getInitial: store.getInitial,
    getState: store.getState,

    ...appActions
};
