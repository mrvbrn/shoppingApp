import React from "react";
import { View, Text, FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";


const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch()

  const onSelect = (id, title) => {
                          props.navigation.navigate('ProductDetail', {
                          productId:id,
                          productTitle:title
                          });
                        }
                                
  return(
    <FlatList
      data={products}
      renderItem={itemData => <ProductItem 
                                 title={itemData.item.title}
                                 image={itemData.item.imageUrl}
                                 price={itemData.item.price}
                                 onSelect={() => onSelect(itemData.item.id, itemData.item.title)}
                                >
                                <Button 
                                  color={Colors.primary} 
                                  title="View Details" 
                                  onPress={() => {
                                    onSelect(itemData.item.id, itemData.item.title)
                                  }}
                                />
                                <Button 
                                  color={Colors.primary} 
                                  title="To Cart" 
                                  onPress={() => {                                             
                                    dispatch(cartActions.addToCart(itemData.item))
                                  }}
                                />
                              </ProductItem>
                              }
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
