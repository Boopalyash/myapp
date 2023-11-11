import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WalletScreen from '../screens/WalletScreen';
import BookingScreen from '../screens/BookingScreen';
import BookingIdScreen from '../screens/BookingIdScreen';

const stack = createStackNavigator();

const BookingNavigation = () => {
  return (
    <stack.Navigator
      initialRouteName="Bookings"
      screenOptions={{headerShown: false}}>
      <stack.Screen name="Bookings" component={BookingScreen} />
    </stack.Navigator>
  );
};

export default BookingNavigation;
