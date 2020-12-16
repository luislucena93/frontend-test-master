import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import MainScreen from './pages/MainScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import './styles/commonStyles.scss';

// You don't have to use `fetch` btw, use whatever you want
const getCounters = () =>
    fetch('/api/v1/counter', {method: 'get'})
        .then(res => res.json());

const App = () => {
    React.useEffect(() => {
        getCounters().then(console.log, console.error);
    }, []);

    return (
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
    );
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
