import React from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
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


ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle:'All Products',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item title="Menu" 
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() =>{navData.navigation.toggleDrawer();
                        }}
                  />
                </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item title="Cart" 
                        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                        onPress={() =>{navData.navigation.navigate('Cart');
                        }}
                  />
                </HeaderButtons>

  };
};

export default ProductOverviewScreen;