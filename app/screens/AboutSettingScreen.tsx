//imports
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import HTMLRender from 'react-native-render-html';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// components and utilities
import {useSamyakDefaultBranchPostMutation} from '../redux/service/DefaultBranchService';

const AboutSettingScreen = ({navigation}: any) => {
  const [selectedbranch, setSelectedBranch] = useState('RT-MAIN(PORUR)');
  // api
  const [defaultManageBranchAPIReq, defaultManageBranchAPIRes] =
    useSamyakDefaultBranchPostMutation();
  const aboutUsData = useSelector(
    (state: RootState) => state.aboutUs.samyakDetailsAboutUsPost,
  );

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleButtonPresss = () => {
    navigation.navigate('Settings');
  };

  // useEffect for default Branch
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('selectedBranch')
        .then(value => {
          if (value) {
            defaultManageBranchAPIReq({
              userName: '9849390103',
              Default_Firm_No: value,
            });
          }
        })
        .catch(error => console.error('Error ', error));
      return () => {
        console.log('Screen is unfocused');
      };
    }, []),
  );

  useEffect(() => {
    if (defaultManageBranchAPIRes?.isSuccess) {
      setSelectedBranch(
        defaultManageBranchAPIRes?.data?.Message[0]?.Branch_Name,
      );
    }
  }, [defaultManageBranchAPIRes]);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.BookingText}>About</Text>
          <View style={styles.imageRow}>
            <Image
              source={require('../assets/images/alarm.png')}
              style={styles.image}
            />
            <Image
              source={require('../assets/images/bellwhite.png')}
              style={styles.image}
            />
            <TouchableOpacity onPress={handleProfile}>
              <View style={styles.circle}>
                <Text style={styles.circleText}>RA</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{backgroundColor: '#fafbfb'}}>
        <View style={styles.LocationView}>
          <Image
            source={require('../assets/images/location.png')}
            style={styles.LocationImg}
          />
          <Text>{selectedbranch}</Text>
        </View>
      </View>

      <ScrollView>
        <Image
          source={require('../assets/images/Samyak_Logo.png')}
          style={styles.Logo}
          resizeMode="contain"
        />

        <View style={{alignSelf: 'center', marginTop: 20}}>
          <Text style={{fontSize: 30, fontWeight: 400}}>
            {aboutUsData?.Message[0]?.Client_Name}
          </Text>
        </View>

        <View style={{marginTop: 20, paddingHorizontal: 15}}>
          <HTMLRender
            source={{html: aboutUsData?.Message[0]?.Client_Description}}
          />
        </View>

        <View style={{marginTop: 20, paddingHorizontal: 15}}>
          <Text>{aboutUsData?.Message[0]?.Client_Location}</Text>
        </View>

        <View style={{paddingHorizontal: 15}}>
          <View
            style={{
              backgroundColor: '#ffa500',
              marginTop: 20,
              padding: 20,
            }}>
            <Text style={{alignSelf: 'center', color: 'white', fontSize: 18}}>
              {aboutUsData?.Message[0]?.Client_Web_Address}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.BackButtonView}>
        <TouchableOpacity style={styles.buttons} onPress={handleButtonPresss}>
          <Image
            source={require('../assets/images/backArrowBlack.png')}
            style={styles.buttonImages}
          />
          <Text style={styles.buttonTexts}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutSettingScreen;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    height: 100,
    backgroundColor: 'orange',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 30,
  },
  BookingText: {
    fontSize: 20,
    color: 'white',
  },
  imageRow: {
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },
  LocationView: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'flex-end',
    right: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  LocationImg: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  circleText: {
    color: 'black',
    fontSize: 10,
  },
  Logo: {
    alignSelf: 'center',
    marginTop: 20,
  },
  BackButtonView: {
    width: '30%',
    left: 15,
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#676767',
    borderRadius: 15,
    padding: 15,
  },
  buttonImages: {
    width: 20,
    height: 20,
    tintColor: 'white',
    right: 15,
  },
  buttonTexts: {
    color: 'white',
    fontSize: 20,
  },
});
