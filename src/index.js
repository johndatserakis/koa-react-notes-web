import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'assets/css/app.css';
import App from 'App';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
