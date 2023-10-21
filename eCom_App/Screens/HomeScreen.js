import { View, Text } from 'react-native'
import React from 'react'
import Header from '../Components/Home/Header'
import ItemList from '../Components/Home/ItemList'

export default function HomeScreen() {
  return (
    <View>
      <Header/>
      <ItemList/>
    </View>
  )
}