import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchScreen from './Screens/SearchScreen'

import { Ionicons } from '@expo/vector-icons';
import CartScreen from './Screens/CartScreen'

const StackNavigator = () => {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator screenOptions={
        { headerShown: false }
      } tabBarOptions={{
        activeTintColor: '#ed4b4b',
      }}>
        <Tab.Screen name="Home" component={HomeScreen}
          options={
            {
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              )
            }
          } />
        <Tab.Screen name="Search" component={SearchScreen}
          options={
            {
              tabBarLabel: 'Search',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" size={size} color={color} />
              )
            }
          } />
        <Tab.Screen name="Cart" component={CartScreen}
          options={
            {
              tabBarLabel: 'Cart',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cart" size={size} color={color} />
              )
            }
          } />


      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})