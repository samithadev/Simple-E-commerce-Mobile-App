import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../CartReducer';

export default function Cart() {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item))
    }

    const dicreaseQuantity = (item) => {
        if (item.quantity == 1) {
            dispatch(removeFromCart(item))
        } else {
            dispatch(decrementQuantity(item))
        }
    }

    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <View>
            <Text style={{ fontSize: 30, margin: 20, fontWeight: 'bold' }}>Cart ({totalItemsInCart})</Text>
            <ScrollView style={{ height: 550 }}>
                {cart.map((item, index) => (
                    <View key={index} style={{ display: 'flex', flexDirection: 'row', gap: 10, padding: 10, marginBottom: 20, borderBottomWidth: 2, marginHorizontal: 10, borderColor: 'gray' }}>
                        <Image source={{ uri: item.image_url }} style={{ width: 100, height: 100 }} />
                        <View style={{ width: 250, gap: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                            <Text>{item.description}</Text>
                            <Text>Price: {item.price}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Pressable style={{ padding: 10, backgroundColor: 'black' }} onPress={() => dicreaseQuantity(item)}>
                                    <Text style={{ color: 'white' }}>-</Text>
                                </Pressable>
                                <Text>{item.quantity}</Text>
                                <Pressable style={{ padding: 10, backgroundColor: 'black' }} onPress={() => increaseQuantity(item)}>
                                    <Text style={{ color: 'white' }}>+</Text>
                                </Pressable>
                            </View>
                        </View>

                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
