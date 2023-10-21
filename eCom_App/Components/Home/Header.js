import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function Header() {
  const cart = useSelector((state) => state.cart.cart);

  const navigation = useNavigation()

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);


  return (
    <View style={{ width: 'auto', marginTop: 30, padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Image source={require('../../assets/r_logo.png')} style={{ width: 60, height: 20 }} />
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#ed4b4b' }}>West Drayton </Text>
      </View>


      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Pressable style={{ padding: 10, marginRight: -15 }} onPress={() => navigation.navigate("Cart")}>
          <AntDesign name="shoppingcart" size={24} color="black" />
        </Pressable>
        <View style={{ backgroundColor: "#ed4b4b", alignItems: 'center', borderRadius: 50, width: 20, height: 20 }}>
          <Text style={{ color: 'white' }}>{totalItemsInCart}</Text>
        </View>

      </View>

    </View>
  )
}