import React from "react";
import {View, Button, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";


const ProductDetail = props => {
    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
  return(
    <ScrollView> 
      <Image style={styles.image} source={{uri:selectedProduct.imageUrl}}/>
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart"/>
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>   
    </ScrollView>
  )
}

ProductDetail.navigationOptions = navData => {
    return{
        headerTitle: navData.navigation.getParam('productTitle')
    };
}

const styles=StyleSheet.create({
    image:{
        width:'100%',
        height:300,
    },
    price:{
        fontFamily:'rubik_medium',
        fontSize:20,
        color:'#888',
        marginVertical:10,
        textAlign:'center'
    },
    description:{
        fontSize:14,
        textAlign:'center',
        marginHorizontal:20
    },
    actions:{
        marginVertical:10,
        alignItems:'center'
    }

})

export default ProductDetail;