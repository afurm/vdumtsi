import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import CustomButton from '../components/common/Button';
import CustomTextInput from '../components/common/TextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFlowerScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');

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
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <View style={{padding: 20, backgroundColor: 'white', flex: 1}}>
      <CustomTextInput
        placeholder="Flower Name"
        value={name}
        onChangeText={setName}
      />
      <CustomTextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <CustomTextInput
        placeholder="Price"
        value={price}
        onChangeText={text => {
          // Use a regex to check if the text is only numbers (with or without decimals)
          if (text === '' || /^[0-9]+(\.[0-9]{0,2})?$/.test(text)) {
            setPrice(text);
          }
        }}
        keyboardType="number-pad"
      />

      <CustomButton title="Add Flower" onPress={addFlower} />
    </View>
  );
};

export default AddFlowerScreen;
