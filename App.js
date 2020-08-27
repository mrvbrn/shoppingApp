import React, { useState } from 'react';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import ShopNavigator from "./navigation/ShopNavigator";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";

const rootReducer = combineReducers({
  products:productsReducer,
  cart:cartReducer,
  orders:ordersReducer
});

const store = createStore(rootReducer);

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
      <ShopNavigator/>
    </Provider>
  );
}
