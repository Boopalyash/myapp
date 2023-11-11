import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import ManageAddressSettingsScreen from '../screens/ManageAddressSettingScreen';
import AboutSettingScreen from '../screens/AboutSettingScreen';
import ContactUsSettingScreen from '../screens/ContactUsSettingScreen';
import ManageMembersSettingScreen from '../screens/ManageMembersSettingScreen';

const stack = createStackNavigator();

const SettingNavigation = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="Settings" component={SettingsScreen} />
      <stack.Screen
        name="ManageAddress"
        component={ManageAddressSettingsScreen}
      />
      <stack.Screen name="About" component={AboutSettingScreen} />
      <stack.Screen name="Contact" component={ContactUsSettingScreen} />
      <stack.Screen
        name="ManageMembers"
        component={ManageMembersSettingScreen}
      />
    </stack.Navigator>
  );
};
export default SettingNavigation;
