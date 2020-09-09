import React from "react";
import { View, StyleSheet } from "react-native";


const Card = props => {
  return (
    <View style={{...styles.card, ...props.styles}}>{props.children}</View>
  )
};

const styles = StyleSheet.create({
    cart:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0, height:2},
        shadowOpacity:8,
        borderRadius:10,
        backgroundColor:'white',
        elevation:5,
    }
})


export default Card;
