import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'assets/css/app.css';
import App from 'App';
import { BrowserRouter } from 'react-router-dom'
import history from 'router/history'
import { Provider } from 'react-redux'
import store from 'store'

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter history={history}>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
