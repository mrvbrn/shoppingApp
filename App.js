import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";
import * as Notifications from "expo-notifications";

import AppNavigator from "./navigation/AppNavigator";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true};
  },
});

const rootReducer = combineReducers({
  products:productsReducer,
  cart:cartReducer,
  orders:ordersReducer,
  auth:authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'rubik_medium':require('./assets/fonts/rubik_medium.ttf'),
    'rubik_regular':require('./assets/fonts/rubik_regular.ttf')
  });
};



export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => {
      setFontLoaded(true)
    }}/>
  }
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
}
