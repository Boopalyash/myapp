import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSamyakContactUsPostMutation} from '../redux/service/ContactUsService';
import {useSamyakAboutUsPostMutation} from '../redux/service/AboutUsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useSamyakDefaultBranchPostMutation} from '../redux/service/DefaultBranchService';
import {useSamyakNotificationCountPostMutation} from '../redux/service/NotificationCountService';

const SettingsScreen = ({navigation}: any) => {
  const [contactUsAPIReq] = useSamyakContactUsPostMutation();
  const [aboutUsAPIReq] = useSamyakAboutUsPostMutation();
  const [notificationAPIReq, notificationAPIRes] =
    useSamyakNotificationCountPostMutation();
  const [selectedbranch, setSelectedBranch] = useState('RT-MAIN(PORUR)');
  const [defaultManageBranchAPIReq, defaultManageBranchAPIRes] =
    useSamyakDefaultBranchPostMutation();

  // To display the contactUs screen
  useEffect(() => {
    const contactUsObj = {
      userName: '9849390103',
    };
    contactUsAPIReq(contactUsObj);
  }, []);

  // To display the aboutUs screen
  useEffect(() => {
    const aboutUsObj = {
      userName: '9849390103',
    };
    aboutUsAPIReq(aboutUsObj);
  }, []);

  // To display the notificationCount
  useEffect(() => {
    const notificationCountObj = {
      userName: '9849390103',
    };
    notificationAPIReq(notificationCountObj);
  }, []);

  // useEffect to display the branch
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

  const settingsData = [
    {
      id: '1',
      backgroundColor: '#696a6d',
      icon: require('../assets/images/code-branch1.png'),
      text: 'Manage Branch',
    },
    {
      id: '2',
      backgroundColor: '#1e564a',
      icon: require('../assets/images/username.png'),
      text: 'Manage Members',
    },
    {
      id: '3',
      backgroundColor: '#af794e',
      icon: require('../assets/images/location.png'),
      text: 'Manage Address',
    },
    {
      id: '4',
      backgroundColor: '#172073',
      icon: require('../assets/images/about.png'),
      text: 'About',
    },
    {
      id: '5',
      backgroundColor: '#ef9724',
      icon: require('../assets/images/callIcon.png'),
      text: 'Contact Us',
    },
    {
      id: '6',
      backgroundColor: '#e92e40',
      icon: require('../assets/images/sign-out.png'),
      text: 'Logout',
    },
  ];
  const handleSettingItemPress = (item: any) => {
    switch (item.text) {
      case 'Manage Branch':
        navigation.navigate('ManageBranch');
        break;
      case 'Manage Address':
        navigation.navigate('ManageAddress');
        break;
      case 'About':
        navigation.navigate('About');
        break;
      case 'Contact Us':
        navigation.navigate('Contact');
        break;
      case 'Manage Members':
        navigation.navigate('ManageMembers');
        break;
      case 'Logout':
        navigation.navigate('Login');
        break;

      default:
        break;
    }
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleBell = () => {
    navigation.navigate('Notification');
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => handleSettingItemPress(item)}>
      <View style={styles.itemContainer}>
        <View
          style={{
            backgroundColor: item.backgroundColor,
            padding: 10,
            borderRadius: 8,
          }}>
          <Image source={item.icon} style={styles.CodeBranchImg} />
        </View>
        <Text style={{marginLeft: 20, flex: 1}}>{item.text}</Text>
        <Image
          source={require('../assets/images/nextArrow.png')}
          style={styles.ArrowImg}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.SettingsText}>Settings</Text>
        <View style={styles.imageRow}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/alarm.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBell}>
            <Image
              source={require('../assets/images/bellwhite.png')}
              style={styles.image}
            />
          </TouchableOpacity>

          {notificationAPIRes?.isSuccess &&
            notificationAPIRes?.data?.Message[0]?.Notify_Count >= 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {notificationAPIRes?.data?.Message[0]?.Notify_Count}
                </Text>
              </View>
            )}
          <TouchableOpacity onPress={handleProfile}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>RA</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.LocationView}>
        <Image
          source={require('../assets/images/location.png')}
          style={styles.LocationImg}
        />
        <Text>{selectedbranch}</Text>
      </View>

      <FlatList
        data={settingsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 80,
    backgroundColor: 'orange',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SettingsText: {
    fontSize: 20,
    color: 'white',
    // top: 10,
  },
  imageRow: {
    flexDirection: 'row',
  },
  image: {
    width: 25,
    height: 25,
    marginLeft: 20,
    // marginRight: 20,
    // top: 20,
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  CodeBranchImg: {
    width: 25,
    height: 25,
    tintColor: 'white',
    resizeMode: 'contain',
  },
  ArrowImg: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: 'black',
    fontSize: 10,
  },
  notificationBadge: {
    backgroundColor: 'red',
    borderRadius: 100,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
    top: -15,
  },
  notificationBadgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
