import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image } from 'react-native';
import axios from 'axios';

export default function SearchScreen() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch all items when the component mounts
    const apiUrl =
      'https://pos-dev.delivergate.com/api/v1/webshop/main-menu/1/categories/webshop-brand/1/shop/2';
    axios
      .get(apiUrl, {
        headers: { 'x-tenant-code': 'subway' },
      })
      .then((response) => {
        // Flatten and set all items into a single array
        const itemsData = flattenData(response.data.data);
        setItems(itemsData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // Function to recursively flatten nested data
  const flattenData = (data) => {
    const flattenedItems = [];
    for (const key in data) {
      if (Array.isArray(data[key])) {
        flattenedItems.push(...data[key]);
      } else if (typeof data[key] === 'object') {
        flattenedItems.push(...flattenData(data[key]));
      }
    }
    return flattenedItems;
  };

  // Function to filter items based on the search query
  const filterItems = (items, query) => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredItems = filterItems(items, searchQuery);

  return (
    <View>
      <View style={{ padding: 10, marginTop: 50, borderWidth: 1, margin: 15, borderRadius: 50 }}>
        <TextInput
          placeholder="Search Item"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <View>
        <ScrollView style={{ height: 650 }}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  padding: 10,
                  margin: 10,
                  borderRadius: 10,
                }}
              >
                <Image source={{ uri: item.image_url }} style={{ width: 100, height: 100 }} />
                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text>Price: {item.price}</Text>
              </View>
            ))
          ) : (
            <Text>No items available.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
