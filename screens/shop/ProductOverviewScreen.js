import React from "react";
import { View, Text, StyleSheet, FlatList} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";


const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch()
  return(
    <FlatList
      data={products}
      renderItem={itemData => <ProductItem 
                                 title={itemData.item.title}
                                 image={itemData.item.imageUrl}
                                 price={itemData.item.price}
                                 onViewDetail={() => {
                                    props.navigation.navigate('ProductDetail', {
                                    productId:itemData.item.id,
                                    productTitle:itemData.item.title
                                    });
                                }}
                                 addToCart={() => {
                                  dispatch(cartActions.addToCart(itemData.item))
                                 }}
                                />}
      keyExtractor={(item) => item.id}
    />
  );
};


ProductOverviewScreen.navigationOptions = {
    headerTitle:'All Products'
}

export default ProductOverviewScreen;