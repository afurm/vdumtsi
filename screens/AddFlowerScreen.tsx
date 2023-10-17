import React, { useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFlowerScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const nameRef = useRef<Input>(null);
  const priceRef = useRef<Input>(null);

  const storeFlowerData = async (flowerData: object) => {
    try {
      const storedData = await AsyncStorage.getItem('flowerData');
      const prevData = storedData ? JSON.parse(storedData) : [];
      prevData.push(flowerData);
      await AsyncStorage.setItem('flowerData', JSON.stringify(prevData));
      Alert.alert('Success', 'Flower details saved successfully!');
      setName('');
      setPrice('');
      nameRef.current && nameRef.current.focus();
    } catch (error) {
      Alert.alert('Error', 'Failed to save the data.');
      console.error('Failed to save the data to the storage', error);
    }
  };

  const addFlower = () => {
    if (name && price) {
      const flowerData = {
        name,
        price,
        id: Math.floor(Date.now() / 1000).toString(),
      };
      storeFlowerData(flowerData);
    } else {
      Alert.alert('Error', 'Please fill in the name and price fields');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ flex: 1 }}>
        <Layout style={{ padding: 20 }}>
          <Input
            ref={nameRef}
            placeholder="Enter flower name"
            value={name}
            onChangeText={setName}
            onSubmitEditing={() => priceRef.current && priceRef.current.focus()}
            returnKeyType="next"
            style={{ marginBottom: 10 }}
          />
          <Input
            ref={priceRef}
            placeholder="Enter price"
            value={price}
            onChangeText={text => {
              if (text === '' || /^[0-9]+(\.[0-9]{0,2})?$/.test(text)) {
                setPrice(text);
              }
            }}
            keyboardType="decimal-pad"
            returnKeyType="done"
          />
          <Button appearance='outline' style={{ marginVertical: 20 }} onPress={addFlower}>
            Add Flower
          </Button>
        </Layout>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AddFlowerScreen;
