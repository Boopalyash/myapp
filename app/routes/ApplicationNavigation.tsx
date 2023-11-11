import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import BottomNavigation from './BottomNavigation';
import BookingIdScreen from '../screens/BookingIdScreen';
import AddAddressSettingScreen from '../screens/AddAddressSettingScreen';
import ManageBranchSettingScreen from '../screens/ManageBranchSettingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchTestLabScreen from '../screens/SearchTestLabScreen';
import AddManageMembersSettingScreen from '../screens/AddManageMembersSettingScree';
import EmergencyAlertScreen from '../screens/EmergencyAlertScreen';
import EditAddressScreen from '../screens/EditAddressScreen';
import EditMembersScreen from '../screens/EditMembersScreen';
import HealthTipsDetailScreen from '../screens/HealthTipsDetailsScreen';
import UploadPrescriptionScreen from '../screens/UploadPrescriptionScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import WalletScreen from '../screens/WalletScreen';
import PaymentFailureScreen from '../screens/PaymentFailureScreen';
import ScannerScreen from '../screens/ScannerScreen';

const stack = createStackNavigator();

const ApplicationNavigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="Login" component={LoginScreen} />
        <stack.Screen name="SignUp" component={SignUpScreen} />
        <stack.Screen name="Bottom" component={BottomNavigation} />
        <stack.Screen name="BookingId" component={BookingIdScreen} />
        <stack.Screen name="SearchTest" component={SearchTestLabScreen} />
        <stack.Screen name="Profile" component={ProfileScreen} />
        <stack.Screen name="forgetpassword" component={ForgetPasswordScreen} />
        <stack.Screen
          name="ManageBranch"
          component={ManageBranchSettingScreen}
        />
        <stack.Screen name="AddAddress" component={AddAddressSettingScreen} />
        <stack.Screen name="SosAlert" component={EmergencyAlertScreen} />
        <stack.Screen
          name="AddMember"
          component={AddManageMembersSettingScreen}
        />
        <stack.Screen name="EditAddress" component={EditAddressScreen} />
        <stack.Screen name="EditMember" component={EditMembersScreen} />
        <stack.Screen name="HealthTips" component={HealthTipsDetailScreen} />
        <stack.Screen
          name="UploadDescription"
          component={UploadPrescriptionScreen}
        />
        <stack.Screen name="Notification" component={NotificationScreen} />
        <stack.Screen name="Wallet" component={WalletScreen} />
        <stack.Screen name="PaymentFailure" component={PaymentFailureScreen} />
        <stack.Screen name="Scanner" component={ScannerScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};
export default ApplicationNavigation;
