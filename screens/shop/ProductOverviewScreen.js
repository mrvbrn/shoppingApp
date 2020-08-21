import React from "react";
import { View, Text, StyleSheet, FlatList} from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";


const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  return(
    <FlatList
      data={products}
      renderItem={itemData => <ProductItem 
                                 title={itemData.item.title}
                                 image={itemData.item.imageUrl}
                                 price={itemData.item.price}
                                 onViewDetail={() => {}}
                                 addToCart={() => {}}
                                />}
      keyExtractor={(item) => item.id}
    />
  );
};


ProductOverviewScreen.navigationOptions = {
    headerTitle:'All Products'
}

export default ProductOverviewScreen;