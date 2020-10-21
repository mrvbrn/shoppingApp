import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import ShopNavigator from './ShopNavigator';
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";

const MyStack = createStackNavigator()

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);

  return <NavigationContainer>
    <MyStack.Navigator>
      <MyStack.Screen 
        name="ProductOverview" 
        component={ProductOverviewScreen}
      />
    </MyStack.Navigator>
  </NavigationContainer>;
};

export default AppNavigator;