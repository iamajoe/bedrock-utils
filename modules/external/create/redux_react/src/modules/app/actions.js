// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Sets content of app
 */
const setContent = (store, action) => {
    store.dispatch({ type: 'SET_CONTENT', content: action });
};

/**
 * Sets modal of app
 */
const setModal = (store, action) => {
    store.dispatch({ type: 'SET_MODAL', modal: action });
};

// -----------------------------------------
// EXPORT

export default (store) => {
    return {
        setContent: (action) => setContent(store, action),
        setModal: (action) => setModal(store, action)
    };
};
