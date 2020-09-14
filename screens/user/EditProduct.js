import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import * as productsActions from '../../store/actions/products';
import Input from "../../components/UI/Input";

const FORM_INPUT_REDUCER = 'FORM_INPUT_REDUCER';

const formReducer = (state, action) => {
  if(action.type === FORM_INPUT_REDUCER){
    const updatedInputValues = {
        ...state.inputValues,
        [action.input] : action.value
    };
    const updatedValidities = {
        ...state.inputValidities,
        [action.input] : action.isValid
    };
    let updatedFormIsValid = true;
    for(const key in updatedValidities){
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return{
      inputValues:updatedInputValues,
      inputValidities:updatedValidities,
      formIsValid:updatedFormIsValid
    }
  }
  return state; 
}

const EditProductScreen = props => {
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
                        inputValues:{
                          title : editedProduct ? editedProduct.formState.inputValues.title : '',
                          imageUrl : editedProduct ? editedProduct.formState.inputValues.imageUrl:'',
                          description : editedProduct ? editedProduct.formState.inputValues.description:'',
                          price : ''
                        }, 
                        inputValidities:{
                          title : editedProduct ? true : false,
                          imageUrl : editedProduct ? true : false,
                          description : editedProduct ? true : false,
                          price : editedProduct ?  true : false
                        }, 
                        formIsValid: editedProduct ? true : false
                       }
            )


  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({ 
        type:FORM_INPUT_REDUCER, 
        value:inputValue, 
        isValid:inputValidity,
        input:inputIdentifier
    });
  },[dispatchFormState]);


  const submitHandler = useCallback(() => {
    if(!formState.formIsValid){
        Alert.alert('Wrong input', 'Please check the errorsin the form',
            [{text:'Okay'}]
        )
        return;
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
                        prodId, 
                        formState.inputValues.title, 
                        formState.inputValues.description, 
                        formState.inputValues.imageUrl
                        )
      );
    } else {
      dispatch(
        productsActions.createProduct(
                        formState.inputValues.title, 
                        formState.inputValues.description, 
                        formState.inputValues.imageUrl, 
                        +formState.inputValues.price
                        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label='Title'
          errorText='Please enter a valid Title!'
          keyboardType='default'
          autoCapitalize="sentences"
          autoCorrect
          returnKeyText="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ""}
          initiallyValid={!!editedProduct}
          required
        />
        <Input
          id="imageUrl"
          label="imageUrl"
          errorText="Please enter a valid image url"
          returnKeyText="next"
          initialValue={editedProduct ? editedProduct.imageUrl : ""}
          onInputChange={inputChangeHandler}
          initiallyValid={!!editedProduct}
          required
        />
          
        {editedProduct ? null : (
        <Input
          id="price"
          label="Price"
          errorText="Please enter a valid price"
          keyboardType="decimal-pad"
          returnKeyText="next"
          onInputChange={inputChangeHandler}
          required
          min={0.1}
         />
        )}
        <Input
          id="description"
          label="Description"
          errorText="Please enter a valid description"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          initialValue={editedProduct ? editedProduct.description : ""}
          onInputChange={inputChangeHandler}
          initiallyValid={!!editedProduct}
          required
          minLength={5} 
        />
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
});

export default EditProductScreen;
   