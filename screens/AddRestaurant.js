import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Platform, ScrollView, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

const AddScreen = ({navigation}) => {
  const [restaurant, setRestaurant] = useState({ name : "", cuisine : "", price : "", rating : "",
    phone : "", address : "", webSite : "", delivery : "",
    key: `r_${new Date().getTime()}`
    });
  
  const [errors, setErrors] = useState({});

  const updateField = (data) => {
    setRestaurant( (prev) => ({... prev, ... data}))
  }
  const setField = (field, value) => {
    setRestaurant( (prev) => ({... prev, [field] : value}))
  }
  const validateName = (name) => {

    console.log("Validating name: ", name);
    if (!name.trim()) {
      return "Restaurant name is required";
    }
    if (name.length < 2) {
      return "Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z0-9\s,'-]*$/.test(name)) {
      return "Name contains invalid characters";
    }
    return null;
  }
  const validatePhone = (phone) => {

    console.log("Validating phone: ", phone);
    if(!phone.trim()){
      return "Phone number is required";
    }
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid phone number";
    }
    return null;
  };
  const validateAddress = (address) => {
    if (!address.trim()) {
      return "Address is required";
    }
    if (!/\d+/.test(address) || !/[a-zA-Z]/.test(address)) {
      return "Please enter a valid address (should include street number and name)";
    }
    if (address.length < 5) {
      return "Address is too short";
    }
    return null;
  };
  const validateWebsite = (website) => {
    if (!website.trim()) {
      return "Website is required";
    }
  
    try {
      const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlRegex.test(website)) {
        return "Please enter a valid website URL (e.g., http://example.com)";
      }
  
      if (!website.startsWith('http://') && !website.startsWith('https://')) {
        return "URL must start with http:// or https://";
      }
    } catch (e) {
      return "Please enter a valid website URL";
    }
  
    return null;
  };
  
  const handleInputChange = (field, value) => {
    setRestaurant(prev => ({
      ...prev,
      [field]: value
    }));
  
    setErrors(prev => ({
      ...prev,
      [field]: null
    }));
  };
  
  
  

  const validateAllFields = () => {
    const currentErrors = {
      name: validateName(restaurant.name),
      phone: validatePhone(restaurant.phone),
      address: validateAddress(restaurant.address),
      webSite: validateWebsite(restaurant.webSite),
      cuisine: !restaurant.cuisine ? 'Cuisine is required' : null,
      price: !restaurant.price ? 'Price is required' : null,
      rating: !restaurant.rating ? 'Rating is required' : null,
      delivery: !restaurant.delivery ? 'Please specify delivery option' : null
    };

    console.log("Current Errors: ", currentErrors);
    setErrors(currentErrors);
    return Object.values(currentErrors).filter(error => error !== null);
  };

  const saveRestaurant = async () => {
    const errorMessages = validateAllFields();
    if (errorMessages.length > 0) {
      Alert.alert("Validation Errors", errorMessages.join("\n"));
      return;
    }
  
    try {
      const existingData = await AsyncStorage.getItem("restaurants");
      const restaurants = existingData ? JSON.parse(existingData) : [];
  
      restaurants.push(restaurant);
      await AsyncStorage.setItem("restaurants", JSON.stringify(restaurants));
  
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Success',
        text2: 'Restaurant saved successfully',
        visibilityTime: 2000
      });
  
      navigation.navigate("RestaurantsScreen");
    } catch (error) {
      console.error("Failed to save restaurant:", error);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error saving restaurant',
        text2: 'Please try again',
        visibilityTime: 3000
      });
    }
  };

  return (
    <ScrollView style={styles.addScreenContainer}> 
      <View style = {styles.addScreenInnerContainer}>
      <View style={styles.addScreenFormContainer}>
      <CustomTextInput
          label="Name"
          maxLength={50}
          stateFieldName="name"
          onChangeText={(text) => handleInputChange("name", text)}
          error={errors.name}
        />

        <Text style={styles.fieldLabel}>Cuisine</Text>
        <View style={[
          styles.pickerContainer,
          errors.cuisine ? { borderColor: 'red' } : {}
        ]}>
          <Picker style={[
            styles.picker,
            errors.cuisine ? { borderColor: 'red' } : {}
          ]}
          prompt="Cuisine" selectedValue={restaurant.cuisine}
          onValueChange={ (inItemValue) => setField ("cuisine", inItemValue) }>
            <Picker.Item label="" value="" />
            <Picker.Item label="Algerian" value="Algerian" />
            <Picker.Item label="American" value="American" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
      <Text style={styles.fieldLabel}>Price</Text>
      <View style={[
          styles.pickerContainer,
          errors.price ? { borderColor: 'red' } : {}
        ]}>
        <Picker style={[
          styles.picker,
          errors.price ? { borderColor: 'red' } : {}
        ]}
        selectedValue={restaurant.price} prompt="Price"
        onValueChange={ (inItemValue) => setField ("price", inItemValue)}>
          <Picker.Item label="" value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
      </View>
      <Text style={styles.fieldLabel}>Rating</Text>
      <View style={[
          styles.pickerContainer,
          errors.rating ? { borderColor: 'red' } : {}
        ]}>
        <Picker style={[
          styles.picker,
          errors.rating ? { borderColor: 'red' } : {}
        ]} 
        selectedValue={restaurant.rating}prompt="Rating"
        onValueChange={ (inItemValue) => setField ("rating", inItemValue)}>
          <Picker.Item label="" value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
      </View>
      <CustomTextInput label="Phone Number" maxLength={20}
        stateFieldName="phone"
        stateHolder={{state: restaurant, setState: updateField}}
        onChangeText={(text) => handleInputChange("phone", text)}
        error={errors.phone}/>
      <CustomTextInput label="Address" maxLength={20}
        stateFieldName="address" 
        stateHolder={{state: restaurant, setState: updateField}}
        onChangeText={(text) => handleInputChange("address", text)}
        error={errors.address}/>
      <CustomTextInput label="Web Site" maxLength={20}
        stateFieldName="webSite" 
        stateHolder={{state: restaurant, setState: updateField}}
        onChangeText={(text) => handleInputChange("webSite", text)}
        error={errors.webSite}/>
      <Text style={styles.fieldLabel}>Delivery?</Text>
      <View style={[
          styles.pickerContainer,
          errors.delivery ? { borderColor: 'red' } : {}
        ]}>
        <Picker style={[
          styles.picker,
          errors.delivery ? { borderColor: 'red' } : {}
        ]}
        prompt="Delivery?" selectedValue={restaurant.delivery}
        onValueChange={ (inItemValue) => setField ("delivery", inItemValue)}>
          <Picker.Item label="" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </Picker>
      </View>
      </View>
      <View style = {styles.AddScreenButtonContainer}>
        <CustomButton 
          text = "Cancel"
          width = "44%"
          onPress = {
            () => {navigation.navigate("RestaurantsScreen");}
          }
        />
        <CustomButton 
          text = "Save"
          width = "44%"
          onPress = { saveRestaurant }
        />
      </View>

      </View>
    </ScrollView>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 24,
  },
  picker : {
    ...Platform.select({
    ios : { width : "96%", borderRadius : 8, borderColor : "#c0c0c0",
    borderWidth : 2, marginLeft : 10, marginBottom : 20, marginTop : 4 },
    android : { }
    })
    },
  pickerContainer : {
      ...Platform.select({
      ios : { },
      android : { width : "96%", borderRadius : 8, borderColor : "#c0c0c0",
      borderWidth : 2, marginLeft : 10, marginBottom : 20, marginTop : 4 }
      })
    },
    addScreenInnerContainer : { flex : 1, alignItems : "center", paddingTop : 20,
      width : "100%" },
    addScreenFormContainer : { width : "96%" },
    addScreenButtonsContainer : { flexDirection : "row", justifyContent : "center"
    }
});