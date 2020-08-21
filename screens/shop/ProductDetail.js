import React from "react";
import {View, Button, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";


const ProductDetail = props => {
    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
  return(
    <View> 
      <Text>{selectedProduct.title}</Text>
    </View>
  )
}

ProductDetail.navigationOptions = navData => {
    return{
        headerTitle: navData.navigation.getParam('productTitle')
    };
}

const styles=StyleSheet.create({

})

export default ProductDetail;