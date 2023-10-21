import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import Cart from '../Components/Cart/Cart'
import store from '../store'
import ItemList from '../Components/Home/ItemList'
import Header from '../Components/Home/Header'

export default function CartScreen() {
  return (
    <View>
      <Header/>
      <Cart/>
    </View>
      
  )
}