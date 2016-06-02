import React from 'react';
import ReactDOM from 'react-dom';
import { cE } from 'bedrock/component';
import outdatedBrowser from 'bedrock/outdatedbrowser';

// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Component mount
 * @param  {tag} self
 */
const componentDidMount = () => {
    // Set outdated browser
    outdatedBrowser({ lowerThan: 'IE11', languagePath: '' });
};

/**
 * Renders tag
 * @param  {tag} self
 * @return {template}
 */
const render = () => {
    return (
    cE('div.ss-rg.app', null, [
        cE('div', { id: 'outdated' }, [
            cE('h6', null, 'Your browser is out-of-date!'),
            cE('p', null, [
                'Update your browser to view this website correctly. ',
                cE('a', {
                    id: 'btnUpdateBrowser',
                    href: 'http://outdatedbrowser.com/'
                }, ['Update my browser now '])
            ]),
            cE('p.last', null, [
                cE('a', {
                    id: 'btnCloseUpdateBrowser',
                    title: 'Close',
                    href: '#'
                }, ['&times;'])
            ])
        ])
    ])
    );
};

// -----------------------------------------
// The tag

class App extends React.Component {
    componentDidMount() { componentDidMount(this); }

    render() { return render(this); }
}

/**
 * Mounts app
 * @param  {element} el
 */
const mountApp = el => ReactDOM.render(cE(App), el);

// -------------------------------------------
// EXPORT

export { App, mountApp };
