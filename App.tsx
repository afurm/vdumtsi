import React from 'react';
import {enableScreens} from 'react-native-screens'; // Importing enableScreens
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddFlowerScreen from './screens/AddFlowerScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';

// Use the screens optimizations
enableScreens();

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddFlower" component={AddFlowerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
