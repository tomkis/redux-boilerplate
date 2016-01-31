import React from 'react';
import ReactDOM from 'react-dom';

import Application from './components/Application';
import { store } from './stores/ApplicationStore';

main();

function main()
{
    ReactDOM.render(
        <Application store={store} />, document.getElementById('app'));
}
