import { Image, Platform } from 'react-native';
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import PeopleScreen from "./screens/PeopleScreen";
import DecisionScreen from "./screens/DecisionScreen";
import RestaurantsScreen from "./screens/RestaurantsScreen";
import AddRestaurant from './screens/AddRestaurant';
import AddPeople from './screens/AddPeople';

const platformOS = Platform.OS.toLowerCase();
const Tab = platformOS === "android" ? createMaterialTopTabNavigator() : createBottomTabNavigator();
const Stack = createStackNavigator();

const RestaurantsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="RestaurantsScreen" component={RestaurantsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AddRestaurant" component={AddRestaurant} />
  </Stack.Navigator>
);

const PeopleStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="PeopleScreen" component={PeopleScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddPeople" component={AddPeople} />
    </Stack.Navigator>
  );
  

export const Navigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='DecisionScreen'
            screenOptions={{
                animationEnabled: true,
                swipeEnabled: true,
                tabBarActiveTintColor: "#ff0000",
                tabBarShowIcon: true
            }}
        >
        <Tab.Screen 
            name="People" 
            component={PeopleStack} 
            options={{
                tabBarLabel: "People",
                tabBarIcon: ({color}) => (
                    <Image
                        source={require("./images/icon-people.png")}
                        style={{ width: 32, height: 32, tintColor: color }}
                    />
                ),
            }}
        />
        <Tab.Screen 
            name="DecisionScreen" 
            component={DecisionScreen} 
            options={{
                tabBarLabel: "Decision",
                tabBarIcon: ({color}) => (
                    <Image
                        source={require("./images/icon-decision.png")}
                        style={{ width: 32, height: 32, tintColor: color }}
                    />
                ),
            }}
        />
        <Tab.Screen 
            name="RestaurantsScreen" 
            component={RestaurantsStack} 
            options={{
                tabBarLabel: "Restaurants",
                tabBarIcon: ({color}) => (
                    <Image
                        source={require("./images/icon-restaurants.png")}
                        style={{ width: 32, height: 32, tintColor: color }}
                    />
                ),
            }}
        />
      </Tab.Navigator>
    )
}