import { View, Text, SafeAreaView, TextInput, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { Zocial } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://user-dev.delivergate.com/api/v1/webshop_customer/login',
        {
          username: email,
          password,
          grant_type: process.env.GRANT_TYPE,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          scope: '',
          account_brand: process.env.BRAND_ID,
        },
        {
          headers: { 'x-tenant-code': 'subway' },
        }
      );
      console.log('login sucess')
      navigation.navigate("Main");

    } catch (error) {
      console.log('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <SafeAreaView style={{ marginTop: 30, backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../assets/r_logo.png')} style={{ width: 150, height: 100 }} />
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Log In to Your Account</Text>
      </View>

      <View style={{ marginTop: 40 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
          <Zocial style={{ marginLeft: 8, color: "gray" }} name="email" size={24} color="black" />
          <TextInput
            placeholder='Enter Email'
            placeholderTextColor="gray"
            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={{ marginTop: 30, flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
          <MaterialCommunityIcons style={{ marginLeft: 8, color: "gray" }} name="form-textbox-password" size={24} color="black" />
          <TextInput
            placeholder='Enter Password'
            placeholderTextColor="gray"
            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error && <Text style={{ color: "red" }}>{error}</Text>}

        <Pressable style={{ width: 200, backgroundColor: "#ed4b4b", padding: 15, marginTop: 40, marginLeft: "auto", marginRight: "auto", borderRadius: 6 }} onPress={handleLogin}>
          <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, color: "white" }}>Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "black", textAlign: "center", marginTop: 10 }}>Don't have an account!</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
