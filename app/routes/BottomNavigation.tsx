import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import BookingNavigation from './BookingNavigation';
import DashBoardScreen from '../screens/DashBoardScreen';
import TestTrendsScreen from '../screens/TestTrendsScreen';
import SettingNavigation from './SettingNavigation';
import LabNavigation from './LabNavigation';
import {useSamyakAppSettingsPostMutation} from '../redux/service/AppSettingsService';

const Bottom = createBottomTabNavigator();

const LabIcon = ({focused}: any) => {
  return (
    <Image
      source={
        focused
          ? require('../assets/images/lab_1.png')
          : require('../assets/images/lab_0.png')
      }
      style={{width: 24, height: 28, top: 5}}
    />
  );
};

const BottomNavigation = () => {
  // api for bottom navigation
  const [appSettingsAPIReq, appSettingsAPIRes] =
    useSamyakAppSettingsPostMutation();

  // useEffect for bottom navigation text
  useEffect(() => {
    const appSettingsObj = {
      userName: '9849390103',
    };
    appSettingsAPIReq(appSettingsObj);
  }, []);

  return (
    <Bottom.Navigator screenOptions={{headerShown: false}}>
      {appSettingsAPIRes?.isSuccess ? (
        appSettingsAPIRes?.data?.Message[0]?.Menu_Items?.map(item => {
          return (
            <Bottom.Screen
              name={item?.Menu_Desc}
              component={
                item?.Menu_Desc === 'Bookings'
                  ? BookingNavigation
                  : item?.Menu_Desc === 'Consultation'
                  ? LabNavigation
                  : item?.Menu_Desc === 'Dashboard'
                  ? DashBoardScreen
                  : item?.Menu_Desc === 'Test Trends'
                  ? TestTrendsScreen
                  : item?.Menu_Desc === 'Settings'
                  ? SettingNavigation
                  : ''
              }
              options={{
                tabBarIcon: ({focused}) => (
                  <Image
                    source={
                      focused
                        ? {uri: item.Selected_Tab_Icon_Url}
                        : {uri: item.Tab_Icon_url}
                    }
                    style={{
                      width: 20,
                      height: 20,
                      // top: 5,
                      resizeMode: 'contain',
                    }}
                  />
                ),
                tabBarLabelStyle: {
                  fontSize: 12,
                  fontWeight: 'bold',
                  // top: 5,
                  color: 'grey',
                },
              }}
            />
          );
        })
      ) : (
        <Bottom.Screen
          name="Lab"
          component={LabNavigation}
          options={{
            tabBarIcon: ({focused}) => <LabIcon focused={focused} />,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
              // top: 5,
              color: 'grey',
            },
          }}
        />
      )}
    </Bottom.Navigator>
  );
};
export default BottomNavigation;
