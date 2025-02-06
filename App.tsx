import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {ICONS} from './src/offpista/utils/Icons';
import HomeScreen from './src/offpista/screens/home/HomeScreen';
import ShortsScreen from './src/offpista/screens/shorts/ShortsScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from './src/offpista/utils/Colors';

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconComponent;

          switch (route.name) {
            case 'Home':
              iconComponent = ICONS.homeIcon(color);
              break;
            case 'Profile':
              iconComponent = ICONS.profileIcon(color);
              break;
            case 'Rewards':
              iconComponent = ICONS.rewardIcon(color);
              break;
            case 'Shorts':
              iconComponent = ICONS.shortsIcon(color);
              break;
            default:
              iconComponent = null;
          }

          return iconComponent;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'black', borderTopColor: COLORS.secondary }, // Set background color to black

      })}>
      <Tab.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
      <Tab.Screen options={{headerShown: false}}  name="Shorts" component={ShortsScreen} />
      <Tab.Screen options={{headerShown: false}} name="Profile" component={ShortsScreen} />
      <Tab.Screen options={{headerShown: false}} name="Rewards" component={ShortsScreen} />
    </Tab.Navigator>
  );
};

// Main App Component
export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}
