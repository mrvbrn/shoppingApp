import React from "react";
import { View, Text, StyleSheet, FlatList} from "react-native";
import { useSelector } from "react-redux";


const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  return(
    <FlatList
      data={products}
      renderItem={itemData => <Text>{itemData.item.title}</Text>}
      keyExtractor={(item) => item.id}
    />
  );
};


ProductOverviewScreen.navigationOptions = {
    headerTitle:'All Products'
}

export default ProductOverviewScreen;