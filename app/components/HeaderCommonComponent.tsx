import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const HeaderCommonComponentScreen = ({navigation, text}: any) => {
  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.SettingsText}>{text}</Text>
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
  );
};
export default HeaderCommonComponentScreen;
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
  },
  imageRow: {
    flexDirection: 'row',
  },
  image: {
    width: 25,
    height: 25,
    marginLeft: 20,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    top: -3,
    marginLeft: 20,
  },
  circleText: {
    color: 'black',
    fontSize: 10,
  },
});
