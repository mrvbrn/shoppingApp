import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import  Colors  from "../constants/Colors";

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview : ProductOverviewScreen
  },
  {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : "",
        },
        headerTintColor:Platform.OS === 'android' ? 'white' : Colors.primary,
    }
  }
);

export default createAppContainer(ProductsNavigator);