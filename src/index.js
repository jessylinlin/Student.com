import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MRoute from './routes/index';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from './store/reducers/index';


import registerServiceWorker from './registerServiceWorker';
const store = createStore(reducers, {}, applyMiddleware(logger));

ReactDOM.render(
	<Provider store={store}>
    	<MRoute />
    </Provider>,
    document.getElementById('root')
    
);
registerServiceWorker();
