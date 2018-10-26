import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from 'App';
import { HashRouter } from 'react-router-dom'
// import history from 'router/history'
import { Provider } from 'react-redux'
import store from 'store'

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
), document.getElementById('root'));
