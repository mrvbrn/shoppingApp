import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import productsReducer from "./store/reducers/product";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

export default function App() {
  const rootReducer = combineReducers({
    products:productsReducer
  });

  const store = createStore(rootReducer);

  return (
    <Provider>
      <View>
      </View>
    </Provider>
  );
}
