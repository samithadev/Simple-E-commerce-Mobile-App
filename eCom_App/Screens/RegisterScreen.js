import { View, Text, SafeAreaView, TextInput, Pressable, Alert, Image } from 'react-native'
import React, { useState } from 'react'

import { Zocial } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigation = useNavigation();

    const handleRegistration = async () => {
        try {
            if (password.length < 6) {
                Alert.alert('Password Error', 'Password must be at least 6 characters');
                return;
            }

            // Make an API request to register the user
            const response = await axios.post(
                'https://user-dev.delivergate.com/api/v1/webshop_customer/register',
                {
                    email: email,
                    password: password,
                    contact_number: contactNumber,
                    first_name: firstName,
                    last_name: lastName,
                    grant_type: process.env.GRANT_TYPE,
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    scope: '',
                    account_brand: process.env.BRAND_ID, // Change to your specific brand ID
                },
                {
                    headers: { 'x-tenant-code': 'subway' },
                }
            );

            console.log('Registration successful');

            navigation.navigate("Login")
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Server returned a validation error
                console.log('Validation Errors:', error.response.data);
            } else {
                // Handle other types of errors
                console.log('Registration failed. Please try again.');
            }
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../assets/r_logo.png')} style={{ width: 150, height: 100 }} />
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>Register New Account</Text>
            </View>

            <View style={{ marginTop: 40 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                    <Zocial style={{ marginLeft: 8, color: "gray" }} name="email" size={24} color="black" />
                    <TextInput onChangeText={setEmail} placeholder='Enter Email' placeholderTextColor="gray" style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }} />
                </View>

                <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                    <AntDesign style={{ marginLeft: 8, color: "gray" }} name="phone" size={24} color="black" />
                    <TextInput onChangeText={setContactNumber} placeholder='Enter Contact Number' placeholderTextColor="gray" style={{ color: "gray", marginVertical: 10, width: 300, fontSize: contactNumber ? 16 : 16 }} />
                </View>

                <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                    <AntDesign style={{ marginLeft: 8, color: "gray" }} name="user" size={24} color="black" />
                    <TextInput onChangeText={setFirstName} placeholder='Enter First Name' placeholderTextColor="gray" style={{ color: "gray", marginVertical: 10, width: 300, fontSize: firstName ? 16 : 16 }} />
                </View>

                <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                    <AntDesign style={{ marginLeft: 8, color: "gray" }} name="user" size={24} color="black" />
                    <TextInput onChangeText={setLastName} placeholder='Enter Last Name' placeholderTextColor="gray" style={{ color: "gray", marginVertical: 10, width: 300, fontSize: lastName ? 16 : 16 }} />
                </View>

                <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                    <MaterialCommunityIcons style={{ marginLeft: 8, color: "gray" }} name="form-textbox-password" size={24} color="black" />
                    <TextInput onChangeText={setPassword} placeholder='Enter Password' placeholderTextColor="gray" secureTextEntry={true} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }} />
                </View>

                <Pressable onPress={handleRegistration} style={{ width: 200, backgroundColor: "#ed4b4b", padding: 15, marginTop: 40, marginLeft: "auto", marginRight: "auto", borderRadius: 6 }}>
                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, color: "white" }}>Register</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
