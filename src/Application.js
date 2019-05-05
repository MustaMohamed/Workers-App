import React, { Component } from 'react';
import { Root } from "native-base";
import AppNavigator from "./AppNavigation";

import { Provider } from 'react-redux'

import store from './redux-store/store/redux.store';

export default class Application extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root>
                    <AppNavigator/>
                </Root>
            </Provider>
        );
    }
}
