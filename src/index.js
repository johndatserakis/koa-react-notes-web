import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'assets/css/app.css';
import App from 'App';
import { Router } from 'react-router-dom'
import history from 'router/history'
import { Provider } from 'react-redux'
import store from 'store'
// eslint-disable-next-line
// import thunk from 'redux-thunk';

// import updateUserAction from 'store/actions/updateUserAction'

// store.dispatch(updateUserAction, {
//     id: 1,
//     username: 'johndatserakis'
// })

// console.log(store.getState())

ReactDOM.render((
    <Router history={history} basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
), document.getElementById('root'));
