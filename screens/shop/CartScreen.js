import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";



const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a,b) => a.productId>b.productId ? 1 : -1);
  });

  const dispatch = useDispatch()
 
  return(
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total:<Text style={styles.amount}>{cartTotalAmount.toFixed(2)}</Text></Text>
        <Button 
          color={Colors.accent} 
          title="Order Now" 
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(addOrder(cartItems, cartTotalAmount));
          }}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => 
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen:{
    margin:20
  },
  summary:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    padding:10,
    marginBottom:20,
    shadowColor:'black',
    shadowOpacity:0.26,
    shadowOffset:{width:0, height:2},
    shadowOpacity:8,
    borderRadius:10,
    backgroundColor:'white',
    elevation:5,
  },
  summaryText:{
    fontFamily: 'rubik_medium',
    fontSize:18
  },
  amount:{
    color:Colors.primary
  }

});

export default CartScreen;