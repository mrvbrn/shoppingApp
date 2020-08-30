import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

import Colors from "../../constants/Colors";


const OrderItem = props => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button color={Colors.primary} title="Show Details"/>
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
    date:{
        fontSize:16,
        fontFamily:'rubik_regular',
        color:'#888'
    }
});

export default OrderItem;