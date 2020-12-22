import React from "react";
import {Provider} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import MainScreen from './pages/MainScreen';
import WelcomeScreen from './pages/WelcomeScreen';

const App = ({store}) => {
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

export default App