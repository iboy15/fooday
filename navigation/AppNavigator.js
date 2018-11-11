import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator,createStackNavigator,TabNavigator,createBottomTabNavigator } from 'react-navigation';
import AboutScreen from '../screens/AboutScreen';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

import CategoryScreen from '../screens/CategoryScreen';
import DetailsScreen from '../screens/DetailsScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import MapsScreen from '../screens/MapsScreen';
import EventsScreen from '../screens/EventsScreen';


export const StacNav = createStackNavigator ({
  Home : {
    screen : HomeScreen,
    
  },
  Details : {
    screen : DetailsScreen,
  },
  Maps: {
    screen: MapsScreen,
    navigationOptions: {
      tabBarVisible: false,
  }
  },
  Events: {
    screen: EventsScreen,
  },
  Category: {
    screen: CategoryScreen,
  },
  Restaurant: {
    screen: RestaurantScreen,
  }
})


export const Tabs = createBottomTabNavigator({
  
  HomeScreen: {
    screen: StacNav,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle'
          }
        />
      ),
    },

  },



  About: {
    screen: AboutScreen,
    navigationOptions: {
      tabBarLabel: 'Abouts',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
        />
      ),
    },
  },
});