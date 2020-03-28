import "core-js/stable";
import "regenerator-runtime/runtime";
import { hot } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { loadComponents } from 'loadable-components';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import App from './app';
import stores from './store/index';

if (window.__INITIAL_STATE__) {
    stores.replace(window.__INITIAL_STATE__)
}

ReactDOM.render(
    <Provider $store={stores}>
        <App />
    </Provider>,
    document.getElementById('root')
)





