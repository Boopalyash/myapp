import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useSamyakNotificationListPostMutation} from '../redux/service/NotificationListService';

const NotificationScreen = ({navigation}: any) => {
  // api for notification list
  const [notificationListAPIReq, notificationListAPIRes] =
    useSamyakNotificationListPostMutation();

  const [notificationData, setNotificationData] = useState([]);
  const [isContentVisible, setIsContentVisible] = useState(true);

  // useEffect to display the list of notifications
  useEffect(() => {
    const notificationListObj = {
      userName: '9849390103',
    };
    notificationListAPIReq(notificationListObj);
  }, []);

  useEffect(() => {
    if (notificationListAPIRes?.isSuccess) {
      setNotificationData(
        notificationListAPIRes?.data?.Message[0]?.Notification_List || [],
      );
    }
  }, [notificationListAPIRes]);

  const handleCross = () => {
    navigation.navigate('Settings');
  };

  const handleMarkAllAsRead = () => {
    Alert.alert(
      'Info',
      'Are you sure that you want to mark all notification as read?',
      [
        {
          text: 'Yes',
          onPress: () => setIsContentVisible(false),
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const handleClear = () => {
    Alert.alert(
      'Info',
      'Are you sure that you want to clear all notifications?',
      [
        {
          text: 'Yes',
          onPress: () => {
            setNotificationData([]);
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
    );
  };

  const handleViewMore = (message: string) => {
    Alert.alert('View More', message);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.AddMemberView}>
        <Text style={styles.headerText}>Notification</Text>
        <TouchableOpacity onPress={handleCross}>
          <Image source={require('../assets/images/black_cross.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />

      {/* Clear all and Mark all as Read options */}
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          paddingHorizontal: 10,
          marginTop: 15,
        }}>
        <Text style={{color: '#0645ad', right: 15}} onPress={handleClear}>
          Clear all
        </Text>
        <Text style={{color: '#0645ad'}} onPress={handleMarkAllAsRead}>
          Mark all as Read
        </Text>
      </View>

      {/* ScrollView for notifications */}
      <ScrollView style={{backgroundColor: '#f0f5fe', padding: 10}}>
        {/* Displaying notifications */}
        {notificationData.map((item: any, index: number) => {
          const showDate =
            index === 0 ||
            item.Notify_Date !== notificationData[index - 1]?.Notify_Date;
          const isLastItem = index === notificationData.length - 1;

          return (
            <View
              key={item?.Notification_Id}
              style={{
                backgroundColor: isContentVisible ? '#e0e0e0' : 'transparent',
                marginBottom: isLastItem ? 30 : 0,
                padding: 10,
                marginTop: 10,
              }}>
              {showDate && <Text> Date: {item?.Notify_Date}</Text>}
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{flex: 1}}>
                  {item?.Notify_Message}
                </Text>
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: 'black',
                      alignItems: 'center',
                      padding: 5,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: 'white'}}>Older</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>{item?.Time_Diff_Desc}</Text>
                <TouchableOpacity
                  onPress={() => handleViewMore(item?.Notify_Message)}>
                  <Text style={{color: '#0645ad', right: 70}}>View More</Text>
                </TouchableOpacity>
              </View>

              {isLastItem && <View style={{marginBottom: 30}} />}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f5fe',
  },
  AddMemberView: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: 20,
  },
  separator: {
    borderBottomWidth: 0.5,
    width: '100%',
  },
});

export default NotificationScreen;
