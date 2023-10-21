import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../CartReducer';

export default function ItemList() {
  const [categories, setCategories] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch();



  const handleButtonClick = (buttonname) => {
    setSelectedButton(buttonname);

    // Fetch items for the selected category
    const apiUrl = `https://pos-dev.delivergate.com/api/v1/webshop/main-menu/1/categories/webshop-brand/1/shop/2`;
    axios
      .get(apiUrl, {
        headers: { 'x-tenant-code': 'subway' },
      })
      .then((response) => {
        setItems(response.data.data[buttonname]);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    // Fetch categories when the component mounts
    const apiUrl = 'https://pos-dev.delivergate.com/api/v1/webshop/main-menu/1/categories/webshop-brand/1/shop/2';
    axios
      .get(apiUrl, {
        headers: { 'x-tenant-code': 'subway' },
      })
      .then((response) => {
        const categoryNames = Object.keys(response.data.data); // Extract category names
        setCategories(categoryNames);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const addItemToCart = (item) => {
    dispatch(addToCart(item))
  }

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item))
  }

  return (
    <View>
      <ScrollView horizontal={true} style={{ padding: 10 }} showsHorizontalScrollIndicator={false}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 20, marginRight: 40 }}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <Pressable
                key={index}
                onPress={() => handleButtonClick(category)}
                style={[
                  selectedButton === category ? { borderBottomWidth: 2, borderColor: '#ed4b4b' } : null,
                ]}
              >
                <Text style={{ fontWeight: 'bold' }}>{category}</Text>
              </Pressable>
            ))
          ) : (
            <Text>No categories available.</Text>
          )}
        </View>
      </ScrollView>

      <ScrollView style={{ height: 600 }}>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <View key={index} style={{ display: 'flex', flexDirection: 'row', gap: 10, padding: 10, marginBottom: 20, borderBottomWidth: 2, marginHorizontal: 10, borderColor: 'gray' }}>
              <Image source={{ uri: item.image_url }} style={{ width: 100, height: 100 }} />
              <View style={{ width: 250 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text>Price: {item.price}</Text>

                {cart.some((value) => value.id == item.id) ? (
                  <Pressable style={{ marginTop: 10 }} onPress={() => removeItemFromCart(item)}>
                    <Text style={{ borderWidth: 1, width: 90, padding: 5, borderColor: '#ed4b4b' }}>Remove From Cart</Text>
                  </Pressable>
                ) : (
                  <Pressable style={{ marginTop: 10 }} onPress={() => addItemToCart(item)}>
                    <Text style={{ borderWidth: 1, width: 90, padding: 5, borderColor: '#ed4b4b' }}>Add To Cart</Text>
                  </Pressable>

                )}

              </View>

            </View>
          ))
        ) : (
          <View></View>
        )}
      </ScrollView>

    </View>
  );
}
