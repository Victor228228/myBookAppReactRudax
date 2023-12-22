import React from 'react';
import ReactDOM from "react-dom";
import App from './components/app';
import {Provider} from "react-redux";
import ErrorBoundry from "./components/error-boundry";
import FireBase from "./services/fire-base";
import RenderId from "./services/renderId";
import {fireBaseStorage} from "./services/fire-base-config";
import FireBaseContext from "./components/fireBase-service-context";
import store from "./store";

import './index.scss';


const fireBase = new FireBase();
const renderId = new RenderId();
ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <FireBaseContext.Provider value={{fireBase, renderId, fireBaseStorage}}>
                <App/>
            </FireBaseContext.Provider>
        </ErrorBoundry>
    </Provider>
    , document.getElementById('root'));


