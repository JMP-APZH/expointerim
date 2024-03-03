import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BusinessByCatScreen from '../Screens/BusinessByCatScreen/BusinessByCatScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BusiDetScreen from '../Screens/BusinessDetailsScreen/BusiDetScreen';
import CalendarScreen from '../Screens/CalendarScreen/CalendarScreen';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
      <Stack.Screen 
        name='home'
        component={HomeScreen}
      />
      <Stack.Screen 
        name='business-list'
        component={BusinessByCatScreen}
      />
      <Stack.Screen 
        name='business-detail'
        component={BusiDetScreen}
      />
      <Stack.Screen 
        name="calendar-view" 
        component={CalendarScreen}
      />
    </Stack.Navigator>
  )
}