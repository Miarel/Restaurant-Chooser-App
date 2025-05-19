import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Platform, ScrollView, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddPeople = ({navigation}) => {
  const [Restaurant, setPeople] = useState({ firstName : "", lastName : "", relationship : "",
    key : `r_${new Date().getTime()}`
    });

  const updateField = (data) => {
    setPeople( (prev) => ({... prev, ... data}))
  }
  const setField = (field, value) => {
    setPeople( (prev) => ({... prev, [field] : value}))
  }
  const handleInputChange = (field, value) => {
    setPeople(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const saveRestaurant = async () => {
    if (
      !Restaurant.firstName ||
      !Restaurant.lastName || 
      !Restaurant.relationship
    ) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    const existingData = await AsyncStorage.getItem("people");
    const restaurants = existingData ? JSON.parse(existingData) : [];
    restaurants.push(Restaurant);
    await AsyncStorage.setItem("people", JSON.stringify(restaurants));

    Alert.alert("Success", "People added successfully!");
    navigation.navigate("PeopleScreen");
  };

  return (
    <ScrollView style={styles.addScreenContainer}> 
      <View style = {styles.addScreenInnerContainer}>
      <View style={styles.addScreenFormContainer}>
        <CustomTextInput
          label="First name"
          maxLength={20}
          value={Restaurant.firstName}
          onChangeText={(text) => handleInputChange("firstName", text)}
        />
        <CustomTextInput
          label="Last name"
          maxLength={20}
          value={Restaurant.lastName}
          onChangeText={(text) => handleInputChange("lastName", text)}
        />
        <Text style={styles.fieldLabel}>relationship</Text>
        <View style={styles.pickerContainer}>
          <Picker style={styles.picker} prompt="Relationship" selectedValue={Restaurant.relationship}
          onValueChange={ (inItemValue) => setField ("relationship", inItemValue) }>
            <Picker.Item label="" value="" />
            <Picker.Item label="Me" value="Me" />
            <Picker.Item label="Family" value="Family" />
            <Picker.Item label="Friend" value="Friend" />
            <Picker.Item label="Coworker" value="Coworker" />
            <Picker.Item label="Other" value="Other" />
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

export default AddPeople;

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
