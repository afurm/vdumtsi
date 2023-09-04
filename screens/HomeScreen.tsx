import React, {useCallback, useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {Flower} from '../utils/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native'; // Import the hook
import CustomButton from '../components/common/Button';

type Props = {
  navigation: StackNavigationProp<any, 'Home'>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [selectedFlowers, setSelectedFlowers] = useState<
    {flower: Flower; quantity: number}[]
  >([]);

  const selectFlower = (selectedFlower: Flower) => {
    const existing = selectedFlowers.find(
      item => item.flower.id === selectedFlower.id,
    );

    if (existing) {
      setSelectedFlowers(prev =>
        prev.map(item =>
          item.flower.id === selectedFlower.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      );
    } else {
      setSelectedFlowers(prev => [
        ...prev,
        {flower: selectedFlower, quantity: 1},
      ]);
    }
  };

  const deselectFlower = (selectedFlower: Flower) => {
    const existing = selectedFlowers.find(
      item => item.flower.id === selectedFlower.id,
    );

    if (existing && existing.quantity > 1) {
      setSelectedFlowers(prev =>
        prev.map(item =>
          item.flower.id === selectedFlower.id
            ? {...item, quantity: item.quantity - 1}
            : item,
        ),
      );
    } else if (existing && existing.quantity === 1) {
      setSelectedFlowers(prev =>
        prev.filter(item => item.flower.id !== selectedFlower.id),
      );
    }
  };

  const calculateTotalPrice = useCallback(() => {
    return selectedFlowers
      .reduce(
        (sum, item) => sum + parseFloat(item.flower.price) * item.quantity,
        0,
      )
      .toFixed(2);
  }, [selectedFlowers]);

  const fetchFlowersFromStorage = async () => {
    try {
      const storedFlowers = await AsyncStorage.getItem('flowerData');
      if (storedFlowers) {
        setFlowers(JSON.parse(storedFlowers));
      }
    } catch (error) {
      console.error('Failed to fetch the flowers from storage', error);
    }
  };

  const deleteFlower = async (flowerId: string) => {
    // Remove flower from local state
    const updatedFlowers = flowers.filter(flower => flower.id !== flowerId);
    setFlowers(updatedFlowers);

    // Update AsyncStorage
    try {
      await AsyncStorage.setItem('flowerData', JSON.stringify(updatedFlowers));
    } catch (error) {
      console.error('Failed to delete the flower from storage', error);
    }
  };

  const getSelectedFlowerQuantity = (flowerId: string) => {
    const found = selectedFlowers.find(item => item.flower.id === flowerId);
    return found ? found.quantity : 0;
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchFlowersFromStorage(); // This will be invoked every time the screen is focused
      calculateTotalPrice();
      return () => {}; // Cleanup function (optional)
    }, [calculateTotalPrice]),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.totalPriceText}>
        Total Price: ${calculateTotalPrice()}
      </Text>
      <CustomButton
        title="Add Flower"
        style={styles.addButton}
        onPress={() => navigation.navigate('AddFlower')}
      />
      <FlatList
        data={flowers}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text style={styles.flowerDetails}>
              {item.name} - {item.description} - ${item.price}
            </Text>
            <View style={styles.selectionContainer}>
              <CustomButton
                title="+"
                onPress={() => selectFlower(item)}
                style={styles.changeQuantityButton}
              />
              <Text style={styles.quantityText}>
                {getSelectedFlowerQuantity(item.id)}
              </Text>
              <CustomButton
                title="-"
                onPress={() => deselectFlower(item)}
                style={styles.changeQuantityButton}
              />
              <CustomButton
                title="Delete"
                onPress={() => deleteFlower(item.id)}
                style={styles.deleteButton}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Lighter background
    padding: 10,
  },
  listItem: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5, // Rounded corners
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  flowerDetails: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityText: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  changeQuantityButton: {
    backgroundColor: '#4CAF50', // Green color for increasing/decreasing
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336', // Red color for delete
    padding: 10,
    borderRadius: 5,
    marginLeft: 20,
  },
  addButton: {
    backgroundColor: '#3F51B5', // Blue color for adding
    marginVertical: 15,
    padding: 10,
    borderRadius: 5,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default HomeScreen;
