import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator,createStackNavigator,TabNavigator,createBottomTabNavigator } from 'react-navigation';
import LinksScreen from '../screens/LinksScreen';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

import SettingsScreen from '../screens/SettingsScreen';
import DetailsScreen from '../screens/DetailsScreen';
import RestaurantScreen from '../screens/RestaurantScreen';

export const StacNav = createStackNavigator ({
  Home : {
    screen : HomeScreen,
    
  },
  Details : {
    screen : DetailsScreen,
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
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
      ),
    },
  },
  Links: {
    screen: LinksScreen,
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

  Restaurant: {
    screen: RestaurantScreen,
    navigationOptions: {
      tabBarLabel: 'Restaurant',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant'}
        />
      ),
    },
  },
});