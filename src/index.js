import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './store';
import App from './app';
import './styles/commonStyles.scss';
import './styles/modalStyles.scss';


ReactDOM.render(
    <Router>
        <App store={store}/>
    </Router>,
    document.getElementById('root')
);
