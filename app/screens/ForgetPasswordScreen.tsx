import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import {useSamyakForgetPasswordPostMutation} from '../redux/service/ForgetPasswordService';

const ForgetPasswordScreen = ({navigation}: any) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const toastStyle = {
    backgroundColor: 'red',
    color: 'white',
  };
  const [forgetPasswordReq, forgetPasswordRes] =
    useSamyakForgetPasswordPostMutation();

  const showToast = message => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      toastStyle,
    );
  };

  const handleMobileNumberChange = text => {
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(text)) {
      setMobileNumber(text);
    }
  };

  const handleOTP = () => {
    forgetPasswordReq({
      userName: '9849390103',
      Mobile_No: mobileNumber,
    });
  };

  useEffect(() => {
    if (forgetPasswordRes.isSuccess) {
      showToast('Successfully OTP sent to your mobile number');
    } else if (forgetPasswordRes.isError && forgetPasswordRes.error.data) {
      showToast(forgetPasswordRes.error.data.Message[0].Message);
    }
  }, [forgetPasswordRes]);

  return (
    <View>
      <View style={styles.container}>
        <View>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/left_chevron.png')}
              style={styles.ChevronImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>Reset Password</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Image
          source={require('../assets/images/Samyak_Logo.png')}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Mobile Number"
          onChangeText={handleMobileNumberChange}
          keyboardType="numeric"
          value={mobileNumber}
        />

        <View>
          <TouchableOpacity style={styles.loginButton} onPress={handleOTP}>
            <Text style={styles.loginButtonText}>Get OTP</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View style={styles.BackToView}>
            <Text style={styles.BackToText}>Back to Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f9a929',
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  ChevronImage: {
    width: 20,
    height: 20,
    top: 40,
    left: 20,
  },
  text: {
    top: 35,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    left: 90,
  },
  card: {
    top: 80,
    position: 'absolute',
    backgroundColor: 'white',
    width: 360,
    height: 600,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    overflow: 'hidden',
  },
  inputLabel: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 40,
  },
  input: {
    width: 300,
    alignSelf: 'center',
    borderRadius: 30,
    padding: 15,
    backgroundColor: '#e0e0e0',
    marginTop: 10,
  },
  cardImage: {
    top: 10,
    width: 250,
    height: 125,
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: '#f9a929',
    paddingVertical: 16,
    paddingHorizontal: 110,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  BackToView: {
    alignSelf: 'center',
    marginTop: 20,
  },
  BackToText: {
    fontSize: 18,
  },
});

export default ForgetPasswordScreen;
