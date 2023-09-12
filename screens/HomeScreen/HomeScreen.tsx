import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native'; // Import the hook
import CustomButton from '../../components/common/Button';
import { useFlowerSelection } from './hooks/useFlowerSelection';
import { useFlowerStorage } from './hooks/useFlowerStorage';
import { useTotalPrice } from './hooks/useTotalPrice';

type Props = {
  navigation: StackNavigationProp<any, 'Home'>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const { selectedFlowers, selectFlower, deselectFlower, getSelectedFlowerQuantity } = useFlowerSelection();
  const { flowers, fetchFlowersFromStorage, deleteFlower } = useFlowerStorage()
  const calculateTotalPrice = useTotalPrice(selectedFlowers)

  useFocusEffect(
    React.useCallback(() => {
      fetchFlowersFromStorage(); // This will be invoked every time the screen is focused
      calculateTotalPrice;
      return () => {}; // Cleanup function (optional)
    }, [calculateTotalPrice]),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.totalPriceText}>
        Total Price: ${calculateTotalPrice}
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
