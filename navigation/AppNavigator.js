import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import AboutScreen from '../screens/AboutScreen';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

import CategoryScreen from '../screens/CategoryScreen';
import DetailsScreen from '../screens/DetailsScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import MyScreen from '../screens/MyScreen';
import EventsScreen from '../screens/EventsScreen';

const tabbarVisible = (navigation) => {
  const { routes } = navigation.state;

  let showTabbar = true;
  routes.forEach((route) => {
    if (route.routeName === 'Maps' || route.routeName === 'Details' || route.routeName === 'Events' || route.routeName === 'Restaurant' || route.routeName === 'Category') {
      showTabbar = false;
    }
  });

  return showTabbar;
  };

export const StacNav = createStackNavigator ({
  Home : {
    screen : HomeScreen,
    
  },
  Details : {
    screen : DetailsScreen,
  },
   Maps: {
     screen: MyScreen,
   },
  Events: {
    screen: EventsScreen,
  },
  Category: {
    screen: CategoryScreen,
  },
  Restaurant: {
    screen: RestaurantScreen,
  },
})


export const Tabs = createMaterialBottomTabNavigator({
  
  HomeScreen: {
    screen: StacNav,
    navigationOptions: ({ navigation }) =>( {
      tabBarVisible: tabbarVisible(navigation),
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
    })

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
},
{
  initialRouteName: 'HomeScreen',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: 'white' },
},
);