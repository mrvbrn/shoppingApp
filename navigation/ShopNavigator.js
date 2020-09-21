import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from "@expo/vector-icons";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetail from "../screens/shop/ProductDetail";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProduct from "../screens/user/UserProduct";
import EditProduct from "../screens/user/EditProduct";
import AuthScreen from "../screens/user/AuthScreen";
import  Colors  from "../constants/Colors";


const defaultNavOptions = {
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : "",
        },
        headerTitleStyle:{
            fontFamily:'rubik_medium'
        },
        headerBackTitleStyle:{
            fontFamily:'rubik_regular'
        },
        headerTintColor:Platform.OS === 'android' ? 'white' : Colors.primary,
    }

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview : ProductOverviewScreen,
    ProductDetail : ProductDetail,
    Cart :  CartScreen,
  },
  {
    navigationOptions:{
      drawerIcon: drawerConfig => (
        <Ionicons 
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);


const OrdersNavigator = createStackNavigator(
  {
    Orders : OrdersScreen
  },
  {
    navigationOptions:{
      drawerIcon: drawerConfig => (
        <Ionicons 
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions:defaultNavOptions
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts : UserProduct,
    EditProduct : EditProduct
  },
  {
    navigationOptions:{
      drawerIcon: drawerConfig => (
        <Ionicons 
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions:defaultNavOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products : ProductsNavigator,
    Orders : OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions : {
      activeTintColor : Colors.primary
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth:AuthScreen
  },
  {
  defaultNavigationOptions:defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator(
  {
    Auth:AuthNavigator,
    Shop:ShopNavigator
  }
);

export default createAppContainer(MainNavigator);