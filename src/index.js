import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from "redux-thunk";
import CountersApp from './reducers/index';
import MainScreen from './pages/MainScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import './styles/commonStyles.scss';
import './styles/mainScreenStyles.scss';
import './styles/welcomeScreenStyles.scss';


let store = createStore(CountersApp, applyMiddleware(thunkMiddleware));

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Switch>
                        <Route path="/mainScreen">
                            <MainScreen/>
                        </Route>
                        <Route path="/">
                            <WelcomeScreen/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
