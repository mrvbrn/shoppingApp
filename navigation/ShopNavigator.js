import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetail from "../screens/shop/ProductDetail";
import CartScreen from "../screens/shop/CartScreen";
import  Colors  from "../constants/Colors";

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview : ProductOverviewScreen,
    ProductDetail : ProductDetail,
    Cart :  CartScreen
  },
  {
    defaultNavigationOptions:{
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
  }
);

export default createAppContainer(ProductsNavigator);