import React, { useRef, useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFlowerScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');

   // References for the input fields
   const nameRef = useRef<Input>(null);
   const descriptionRef = useRef<Input>(null);
   const priceRef = useRef<Input>(null);

  const storeFlowerData = async (flowerData: object) => {
    try {
      const storedData = await AsyncStorage.getItem('flowerData');
      const prevData = storedData ? JSON.parse(storedData) : [];
      prevData.push(flowerData);
      await AsyncStorage.setItem('flowerData', JSON.stringify(prevData));
    } catch (error) {
      console.error('Failed to save the data to the storage', error);
    }
  };

  const addFlower = () => {
    if (name && price) {
      const flowerData = {
        name,
        description,
        price,
        id: Math.floor(Date.now() / 1000).toString(),
      };
      storeFlowerData(flowerData);
      Alert.alert('Success', 'Flower details saved successfully!');
      // Blur the input fields
      nameRef.current && nameRef.current.blur();
      descriptionRef.current && descriptionRef.current.blur();
      priceRef.current && priceRef.current.blur();
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Layout style={{ padding: 20, flex: 1 }}>
      <Input
        ref={nameRef} 
        placeholder="Flower Name"
        value={name}
        onChangeText={setName}
      />
      <Input
        ref={descriptionRef}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ marginVertical: 10 }}
      />
      <Input
        ref={descriptionRef}
        placeholder="Price"
        value={price}
        onChangeText={text => {
          if (text === '' || /^[0-9]+(\.[0-9]{0,2})?$/.test(text)) {
            setPrice(text);
          }
        }}
        keyboardType="number-pad"
      />
      <Button style={{ marginVertical: 20 }} onPress={addFlower}>
        Add Flower
      </Button>
    </Layout>
    </TouchableWithoutFeedback>
  );
};

export default AddFlowerScreen;
