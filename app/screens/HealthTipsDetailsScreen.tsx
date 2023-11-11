import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const HealthTipsDetailScreen = ({route, navigation}: any) => {
  const {healthTipData} = route.params;

  const handleCross = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{marginTop: 30, marginLeft: 10}}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
            {healthTipData.Health_Title}
          </Text>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '400'}}>
            {healthTipData.Updated_Date}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleCross}
          style={{alignSelf: 'flex-end', paddingHorizontal: 20}}>
          <Image source={require('../assets/images/black_cross.png')} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 0.95,
          backgroundColor: '#e1ebf9',
          marginHorizontal: 10,
          marginTop: 20,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text style={styles.description}>{healthTipData.Health_Desc}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  description: {
    fontSize: 16,
  },
});

export default HealthTipsDetailScreen;
