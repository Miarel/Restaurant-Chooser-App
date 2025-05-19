import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const PeopleScreen = () => {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(()=>{
    const fetchPeople = async () =>
      {
        const data = await AsyncStorage.getItem("people");
        if (data) setRestaurants(JSON.parse(data));
      }
      fetchPeople();
  }, [])

  const deleteRestaurant = async (item) => {
    try {
      const restaurants = await AsyncStorage.getItem("people");
      let listData = restaurants ? JSON.parse(restaurants) : [];
      listData = listData.filter((restaurant) => restaurant.key !== item.key);
      await AsyncStorage.setItem("people", JSON.stringify(listData));
      setRestaurants(listData);

      Toast.show({
        type: 'error',
        position: 'bottom',
        visibilityTime: 2000,
        text1: 'People deleted'
      });
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <CustomButton 
        text="Add people" 
        onPress={() => navigation.navigate("AddPeople")} 
        width="96%" 
        buttonStyle={styles.addButton}
      />

      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            <Text style={styles.restaurantName}>{item.firstName} {item.lastName}</Text>
            <CustomButton 
              text="Delete" 
              onPress={() =>
                Alert.alert(
                    "Please confirm",
                    "Are you sure you want to delete this restaurant?",
                    [
                        { text: "Yes", onPress: () => deleteRestaurant(item) },
                        { text: "No" },
                        { text: "Cancel", style: "cancel" },
                    ],
                    { cancelable: true }
                )
            }
              buttonStyle={styles.deleteButton} 
            />
          </View>
        )}
      />
    </View>
  );
};

export default PeopleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    width: '96%',
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  restaurantName: {
    fontSize: 18,
  },
  deleteButton: {
    width: '30%',
  },
});