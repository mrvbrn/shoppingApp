import React, {useState} from "react";
import { View, StyleSheet, Text, Button } from "react-native";


import Colors from "../../constants/Colors";
import CartItem from "./CartItem";


const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button 
        color={Colors.primary} 
        title={showDetails ? "Hide Details" : "Show Details"} 
        onPress={() => setShowDetails(prevState => !prevState)}
      />
        {showDetails && (
          <View style={styles.detailItems}>
            {props.items.map(cartItem => (
                <CartItem
                    key={cartItem.productId}
                    quantity={cartItem.quantity}
                    amount={cartItem.sum}
                    title={cartItem.productTitle}
                />
            ))}
          </View>
        )}
    </View>
  )
};

const styles = StyleSheet.create({
    orderItem:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0, height:2},
        shadowOpacity:8,
        borderRadius:10,
        backgroundColor:'white',
        elevation:5,
        margin:10,
        padding:10,
        alignItems:'center'
    },
    summary:{
        flexDirection : 'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:'100%',
        marginBottom:15
    },
    totalAmount:{
        fontFamily:'rubik_medium',
        fontSize:16
    },
    detailItems:{
        width:'100%'
    },
    date:{
        fontSize:16,
        fontFamily:'rubik_regular',
        color:'#888'
    }
});

export default OrderItem;