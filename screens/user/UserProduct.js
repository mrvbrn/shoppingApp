import React from "react";
import { View, Text, FlatList, Platform, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";



const UserProduct = props => {
    const productItems = useSelector(state => state.products.userProducts)
    const disPatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', {productId : id});
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text:'No', style:'default'},
            {
              text:'Yes',
              style:'destructive', 
              onPress: () => {
                disPatch(productsActions.deleteProduct(id));
              }
            }
        ]);
    }

    if (productItems.length === 0){
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text>No products found, maybe start creating some?</Text>
        </View>
      );
    }
    return(
        <FlatList
          data={productItems}
          key={item => item.id}
          renderItem={itemData => <ProductItem
                                    image={itemData.item.imageUrl}
                                    title={itemData.item.title}
                                    price={itemData.item.price}
                                    onSelect = {() => {
                                        editProductHandler(itemData.item.id)
                                    }}
                                  >
                                  <Button 
                                    color={Colors.primary} 
                                    title="Edit" 
                                    onPress={() => {
                                       editProductHandler(itemData.item.id)
                                    }}
                                  />
                                  <Button 
                                    color={Colors.primary} 
                                    title="Delete" 
                                    onPress={() => deleteHandler(itemData.item.id)}
                                  />
                                  </ProductItem>
                     }
        />
    )
}

export const screenOptions = navData => {
    return {
        headerTitle:"Your Products",
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item title="Menu" 
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() =>{navData.navigation.toggleDrawer();
                        }}
                  />
                </HeaderButtons>),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item title="Add" 
                        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        onPress={() =>{navData.navigation.navigate('EditProduct');
                        }}
                  />
                </HeaderButtons>),
    }
}



export default UserProduct;