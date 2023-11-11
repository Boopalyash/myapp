import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LabScreen from '../screens/LabScreen';

const stack = createStackNavigator();

const LabNavigation = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="Lab" component={LabScreen} />
    </stack.Navigator>
  );
};

export default LabNavigation;
