import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Text, Layout, Divider, Icon, Input } from '@ui-kitten/components';
import { useFlowerSelection } from './hooks/useFlowerSelection';
import { useFlowerStorage } from './hooks/useFlowerStorage';
import { useTotalPrice } from './hooks/useTotalPrice';
import { Flower } from '../../utils/types';

type Props = {
  navigation: StackNavigationProp<any, 'Home'>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedFlowers, selectFlower, deselectFlower, getSelectedFlowerQuantity } = useFlowerSelection();
  const { flowers, fetchFlowersFromStorage, deleteFlower, setFlowers } = useFlowerStorage();
  const calculateTotalPrice = useTotalPrice(selectedFlowers);
  const [searchValue, setSearchValue] = useState('')
  const [filteredFlowers, setFilteredFlowers] = useState<Flower[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchFlowersFromStorage();
      setFilteredFlowers(flowers);
      calculateTotalPrice;
      return () => {};
    }, [calculateTotalPrice]),
  );

  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredFlowers(flowers);
    } else {
      setFilteredFlowers(flowers.filter(f => f.name.toLowerCase().includes(searchValue.toLowerCase())));
    }
  }, [searchValue, flowers]);

  const confirmDelete = (id: string) => {
    Alert.alert(
      "Delete Flower",
      "Are you sure you want to delete this flower?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => deleteFlower(id) }
      ]
    );
  }

  return (
    <Layout style={styles.container}>
      <Input placeholder='search' value={searchValue}
             onChangeText={nextValue => setSearchValue(nextValue)}
             style={{marginBottom: 10}}/>
      <Text category="h5" style={styles.totalPriceText}>
        Total Price: ${calculateTotalPrice}
      </Text>
      <FlatList
        data={filteredFlowers}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <Layout level="1" style={styles.listItem}>
            <Text category="h6">
              {item.name} - ${item.price}
            </Text>
            <View style={styles.selectionContainer}>
              <Button onPress={() => selectFlower(item)} size="tiny" accessoryLeft={(props) => <Icon {...props} name="plus-outline" />}></Button>
              <Text style={styles.quantityText}>
                {getSelectedFlowerQuantity(item.id)}
              </Text>
              <Button onPress={() => deselectFlower(item)} size="tiny" accessoryLeft={(props) => <Icon {...props} name="minus-outline" />}></Button>
              <Button onPress={() => confirmDelete(item.id)} size="tiny" status="danger" accessoryLeft={(props) => <Icon {...props} name="trash-outline" />}></Button>
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
