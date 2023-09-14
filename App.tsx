import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import AddFlowerScreen from './screens/AddFlowerScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Icon, IconRegistry } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

enableScreens();

const Tab = createBottomTabNavigator();

const HomeIcon = (props) => <Icon {...props} name="home-outline" width={24} height={24} />;
const AddFlowerIcon = (props) => <Icon {...props} name="plus-outline" width={24} height={24} />;

const App: React.FC = () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light}}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                return <HomeIcon fill={color} />;
              } else if (route.name === 'Add') {
                return <AddFlowerIcon fill={color} />;
              }
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Add" component={AddFlowerScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
