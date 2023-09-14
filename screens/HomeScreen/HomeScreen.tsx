import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Text, Layout, Divider } from '@ui-kitten/components';
import { useFlowerSelection } from './hooks/useFlowerSelection';
import { useFlowerStorage } from './hooks/useFlowerStorage';
import { useTotalPrice } from './hooks/useTotalPrice';

type Props = {
  navigation: StackNavigationProp<any, 'Home'>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedFlowers, selectFlower, deselectFlower, getSelectedFlowerQuantity } = useFlowerSelection();
  const { flowers, fetchFlowersFromStorage, deleteFlower } = useFlowerStorage()
  const calculateTotalPrice = useTotalPrice(selectedFlowers)

  useFocusEffect(
    React.useCallback(() => {
      fetchFlowersFromStorage();
      calculateTotalPrice;
      return () => {};
    }, [calculateTotalPrice]),
  );

  return (
    <Layout style={styles.container}>
      <Text category="h5" style={styles.totalPriceText}>
        Total Price: ${calculateTotalPrice}
      </Text>
      <FlatList
        data={flowers}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <Layout level="1" style={styles.listItem}>
            <Text category="h6">
              {item.name} - {item.description} - ${item.price}
            </Text>
            <View style={styles.selectionContainer}>
              <Button onPress={() => selectFlower(item)} size="tiny" style={styles.changeQuantityButton}>
                +
              </Button>
              <Text style={styles.quantityText}>
                {getSelectedFlowerQuantity(item.id)}
              </Text>
              <Button onPress={() => deselectFlower(item)} size="tiny" style={styles.changeQuantityButton}>
                -
              </Button>
              <Button onPress={() => deleteFlower(item.id)} size="tiny" status="danger" style={styles.deleteButton}>
                Delete
              </Button>
            </View>
          </Layout>
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    padding: 15,
    marginBottom: 10,
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  quantityText: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  changeQuantityButton: {
    marginHorizontal: 5,
  },
  deleteButton: {
    marginLeft: 20,
  },
  totalPriceText: {
    marginBottom: 15,
  },
});

export default HomeScreen;
