import React from "react";
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";
import Colors from "../../constants/Colors";


const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if(Platform.OS === "android" && Platform.Version >= 21){
    TouchableCmp = TouchableNativeFeedback
  }
  return(
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onViewDetail} useForeground>
            <View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} /> 
              </View>  
              <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>{props.price.toFixed(2)}</Text>
              </View>
              <View style={styles.action}>
                <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail}/>
                <Button color={Colors.primary} title="To Cart" onPress={props.addToCart}/>
              </View>
            </View>
        </TouchableCmp>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
    product:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0, height:2},
        shadowOpacity:8,
        borderRadius:10,
        backgroundColor:'white',
        elevation:5,
        height:300,
        margin:20
    },
    touchable:{
        overflow:'hidden',
        borderRadius:10
    },
    image:{
        width:'100%',
        height:'100%'
    },
    imageContainer:{
        width:'100%',
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },
    title:{
        fontFamily:'rubik_medium',
        fontSize:18,
        marginVertical:4

    },
    price:{
        fontFamily:'rubik_regular',
        fontSize:14,
        color:'#888'
    },
    action:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        height:'25%',
        paddingHorizontal:20
    },
    details:{
        alignItems:'center',
        padding:10,
        height:'15%'
    }
})

export default ProductItem;