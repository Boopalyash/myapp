// imports
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// components and utilities
import {useSamyakLoginPostMutation} from '../redux/service/OauthService';
import {useSamyakBookingListPostMutation} from '../redux/service/BookingListPostService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  // state value
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isError, setIsError] = useState(false);
  const [userDetails] = useState<any>();
  const [loading, setLoading] = useState(false);

  // Api functions
  const [loginAPIReq, LoginAPIRes] = useSamyakLoginPostMutation();
  const [bookingAPIReq] = useSamyakBookingListPostMutation();

  useEffect(() => {
    setLoading(LoginAPIRes.isLoading);
    if (LoginAPIRes.isSuccess) {
      navigation.navigate('Bottom', {
        userDetails,
      });
    } else if (LoginAPIRes.isError) {
      const errorMessage = LoginAPIRes.error?.data?.Message[0]?.Message;
      setIsError(true);
      showAlert('Error', errorMessage);
    }
  }, [LoginAPIRes]);

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [], {cancelable: false});
  };

  // onClick Function
  const handleLogIn = async () => {
    setUserNameError('');
    setPasswordError('');
    setIsError(false);

    if (!userName || userName.length === 0) {
      setUserNameError('Mobile Number is required');
    } else if (userName.length < 10) {
      setUserNameError('Mobile Number must be at least 10 characters');
    } else if (!password || password.length === 0) {
      setPasswordError('Password is required');
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      let loginReqObj = {
        userName: userName,
        password: password,
      };
      loginAPIReq(loginReqObj);
      bookingAPIReq(loginReqObj);
    }
    AsyncStorage.clear();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleRegister = () => {
    navigation.navigate('SignUp');
  };

  // Initial render
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
      </View>
      <View style={styles.card}>
        <Image
          source={require('../assets/images/Samyak_Logo.png')}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Mobile Number"
          onChangeText={text => setUserName(text)}
          value={userName}
          keyboardType="numeric"
        />
        {userNameError ? (
          <Text style={styles.errorText}>{userNameError}</Text>
        ) : null}

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text style={styles.errorText}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </Text>
        </TouchableOpacity>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <TouchableOpacity onPress={() => navigation.navigate('forgetpassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogIn} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {isError ? (
          <Text style={styles.errorText}>Invalid username or password</Text>
        ) : null}

        <View style={styles.VersionView}>
          <View>
            <Text>Version:0.0.1(12)</Text>
          </View>
          <View>
            <Text>Powered by SUKRAA</Text>
          </View>
        </View>

        <View style={styles.TermsView}>
          <TouchableOpacity>
            <Text style={styles.TermsText}>Terms and conditions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.DontView}>
          <View>
            <Text>Don't have an account?</Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleRegister}>
              <Text>Register here</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
      </View>
    </View>
  );
};
export default LoginScreen;

// styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f9a929',
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    top: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  card: {
    top: 80,
    position: 'absolute',
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
  },
  inputLabel: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 40,
  },
  input: {
    width: '80%',
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
  forgotPasswordText: {
    textAlign: 'right',
    marginVertical: 20,
    right: 40,
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#f9a929',
    paddingVertical: 20,
    paddingHorizontal: 120,
    borderRadius: 20,
    alignSelf: 'center',
  },
  loginButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  VersionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    marginTop: 15,
  },
  TermsView: {
    alignSelf: 'center',
    marginTop: 10,
  },
  TermsText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  DontView: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    alignSelf: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
