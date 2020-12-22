import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import App from './app';
import './styles/commonStyles.scss';
import './styles/modalStyles.scss';


ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
);
