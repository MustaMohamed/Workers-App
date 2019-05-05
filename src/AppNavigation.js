import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "./components/screens/LoginScreen";
import Home from "./components/screens/HomeScreen";


const AppNavigator = createSwitchNavigator({
        Login: Login,
        Home: Home
    },
    {
        initialRouteName: "Home"
    }
);

export default createAppContainer(AppNavigator);