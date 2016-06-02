import appActions from '../../modules/actions.js';

// -----------------------------------------
// FUNCTIONS

/**
 * Index
 */
const index = {
    type: 'INDEX',
    url: '/',
    /**
     * Route handler
     * @param  {object} route
     * @param  {object} ctx
     * @param  {function} next
     */
    onRoute: (route, ctx) => {
        const params = ctx.params;
        const type = route.type;

        actions.app.setContent({ type, params });
    }
};

// -----------------------------------------
// EXPORT

export default [index];
