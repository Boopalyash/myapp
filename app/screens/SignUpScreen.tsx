import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const SignUpScreen = ({navigation}: any) => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleFullNameChange = ({text}: any) => {
    setFullName(text);
  };

  const handleDobChange = ({text}: any) => {
    setDob(text);
  };

  const handleEmailChange = ({text}: any) => {
    setEmail(text);
  };

  const handlePhoneNumberChange = ({text}: any) => {
    setPhoneNumber(text);
  };

  const handleReferralCodeChange = ({text}: any) => {
    setReferralCode(text);
  };

  const handleCheckboxToggle = () => {
    setIsChecked(prevState => !prevState);
  };

  const handlesignUp = () => {
    navigation.navigate('Login');
  };

  const handleLeftChevron = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleLeftChevron}>
          <Image
            source={require('../assets/images/left_chevron.png')}
            style={styles.ChevronImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.text}>Registration</Text>
      </View>
      <ScrollView style={styles.card}>
        <Image
          source={require('../assets/images/Samyak_Logo.png')}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Full Name"
          onChangeText={handleFullNameChange}
          value={fullName}
        />

        <Text style={styles.inputLabel}>DOB</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Date of Birth"
          onChangeText={handleDobChange}
          value={dob}
        />

        <Text style={styles.inputLabel}>Email (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email (Optional)"
          onChangeText={handleEmailChange}
          value={email}
        />

        <Text style={styles.inputLabel}>Phone Number / User Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Phone Number / User Name"
          onChangeText={handlePhoneNumberChange}
          value={phoneNumber}
        />

        <Text style={styles.inputLabel}>Referral Code (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Referral Code (Optional)"
          onChangeText={handleReferralCodeChange}
          value={referralCode}
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={handleCheckboxToggle}>
            <View style={styles.checkbox}>
              {isChecked && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.checkboxLabel}>
              I Agree to the Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handlesignUp} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.VersionView}>
          <Text>Version:0.0.1(12)</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f9a929',
    height: 300,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  ChevronImage: {
    width: 20,
    height: 20,
    top: 65,
  },
  text: {
    top: 60,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    left: 100,
  },
  card: {
    top: 120,
    position: 'absolute',
    backgroundColor: 'white',
    width: 380,
    height: 750,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 40,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: '#000',
  },
  checkboxLabel: {
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
    color: 'blue',
  },
  loginButton: {
    backgroundColor: '#f9a929',
    paddingVertical: 16,
    paddingHorizontal: 130,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  loginButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  VersionView: {
    paddingVertical: 10,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
});

export default SignUpScreen;
