import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const PaymentFailureScreen = ({navigation}: any) => {
  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleHome = () => {
    navigation.navigate('Bookings');
  };


  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.BookingText}>Payment Failure</Text>
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
      <View style={styles.failureContainer}>
        <Text style={styles.failureText}>Transaction Failure</Text>
        <View style={styles.exclamationCircle}>
          <Text style={styles.exclamationText}>!</Text>
        </View>
      </View>
      <View style={{marginTop: 20, alignSelf: 'center', paddingHorizontal: 20}}>
        <Text style={{fontSize: 18}}>
          Your Payment was not completed.Amount will be refunded if it is
          debited.You can retry or cancel this order
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 50,
        }}>
        <TouchableOpacity onPress={handleHome}>
          <View
            style={{
              backgroundColor: '#676767',
              padding: 15,
              width: 180,
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', alignSelf: 'center'}}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity >
          <View
            style={{
              backgroundColor: '#676767',
              padding: 15,
              width: 180,
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', alignSelf: 'center'}}>Retry</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: 'orange',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 10,
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
  failureContainer: {
    alignItems: 'center',
    marginTop: 150,
  },
  failureText: {
    fontSize: 20,
  },
  exclamationCircle: {
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderColor: '#c60606',
    borderWidth: 2,
  },
  exclamationText: {
    color: '#c60606',
    fontSize: 40,
  },
});

export default PaymentFailureScreen;
