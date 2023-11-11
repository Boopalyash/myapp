import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UploadPrescriptionScreen = ({navigation}: any) => {
  const [imgUrl, setImgUrl] = useState('');

  const openCameraLib = async () => {
    const result = await launchCamera({saveToPhotos: true});
    if (!result.didCancel) {
      setImgUrl(result?.assets[0]?.uri);
      AsyncStorage.setItem('images', result?.assets[0]?.uri);
      console.log('Camera Result:', result);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      setImgUrl(result?.assets[0]?.uri);
      console.log('Gallery Result:', result);
    }
  };


  const handleCross = () => {
    navigation.navigate('Lab');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Upload Prescription</Text>
        <TouchableOpacity onPress={handleCross}>
          <Image source={require('../assets/images/black_cross.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.failureContainer}>
          <View style={styles.exclamationCircle}>
            <Text style={styles.exclamationText}>!</Text>
          </View>
          <Text style={styles.failureText}>BROWSE FILES HERE</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            Take a picture or Browse files here
          </Text>
          <Text style={[styles.mainText, styles.centeredText]}>
            or browse your device
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={openGallery}>
            <Text style={styles.buttonText}>BROWSE FILES</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>or</Text>
          <TouchableOpacity style={styles.button} onPress={openCameraLib}>
            <Text style={styles.buttonText}>CLICK A PICTURE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef3fd',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    color: '#1e75c0',
  },
  content: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'black',
    padding: 10,
    alignSelf: 'center',
    width: '90%',
    height: '80%',
    backgroundColor: '#dae5f8',
  },
  failureContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  exclamationCircle: {
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c60606',
    borderWidth: 2,
  },
  exclamationText: {
    color: '#c60606',
    fontSize: 40,
  },
  textContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 18,
  },
  centeredText: {
    textAlign: 'center',
  },
  buttonsContainer: {
    alignSelf: 'center',
    marginTop: 30,
    width: '60%',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  orText: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  failureText: {
    fontSize: 22,
    marginTop: 20,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: 130,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageGallery: {
    width: 50,
    height: 50,
  },
});

export default UploadPrescriptionScreen;
