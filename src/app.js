import React from "react";
import {Provider} from "react-redux";
import {

    Switch,
    Route
} from "react-router-dom";
import MainScreen from './pages/MainScreen';
import WelcomeScreen from './pages/WelcomeScreen';

const App = ({store}) => {
    return (
        <Provider store={store}>
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
        </Provider>
    );
};

export default App