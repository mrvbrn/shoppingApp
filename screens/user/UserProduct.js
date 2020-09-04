import React from "react";
import { FlatList, Platform, Button } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";



const UserProduct = props => {
    const productItems = useSelector(state => state.products.userProducts)
    return(
        <FlatList
          data={productItems}
          key={item => item.id}
          renderItem={itemData => <ProductItem
                                    image={itemData.item.imageUrl}
                                    title={itemData.item.title}
                                    price={itemData.item.price}
                                  >
                                  <Button 
                                    color={Colors.primary} 
                                    title="Edit" 
                                    onPress={() => {
                                  
                                    }}
                                  />
                                  <Button 
                                    color={Colors.primary} 
                                    title="Delete" 
                                    onPress={() => {                                             
                                    
                                    }}
                                  />
                                  </ProductItem>
                     }
        />
    )
}

UserProduct.navigationOptions = navData => {
    return {
        headerTitle:"Your Products",
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item title="Menu" 
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() =>{navData.navigation.toggleDrawer();
                        }}
                  />
                </HeaderButtons>,
    }
}



export default UserProduct;