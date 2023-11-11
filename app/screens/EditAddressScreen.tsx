import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useSamyakUpdateAddressPostMutation} from '../redux/service/UpdateAddressService';
import {useRoute} from '@react-navigation/native';
import {useSamyakAddressPostMutation} from '../redux/service/ManageAddressPostService';

const EditAddressScreen = ({navigation}: any) => {
  const route = useRoute();
  const editData = route.params;

  const [address, setAddress] = useState(editData?.item?.Address_Type_Desc);
  const [street, setStreet] = useState(editData?.item?.Street);
  const [place, setPlace] = useState(editData?.item?.Place);
  const [city, setCity] = useState(editData?.item?.City);
  const [state, setState] = useState(editData?.item?.State);
  const [pincode, setPincode] = useState(editData?.item?.PinCode);
  const [landmark, setLandmark] = useState(editData?.item?.Landmark);
  const [longitude, setLongitude] = useState(editData?.item?.Longitude);
  const [latitude, setLatitude] = useState(editData?.item?.Latitude);

  const [getAddressAPIReq] = useSamyakAddressPostMutation();
  const [updateAddressAPIReq, updateAddressAPIRes] =
    useSamyakUpdateAddressPostMutation();
  console.log(updateAddressAPIRes, 'editAddressData');
  const showAlert = (title, message) => {
    Alert.alert(title, message, [], {cancelable: false});
  };
  const handleUpdate = async () => {
    let updateAddressObj = {
      Address_Type: '02',
      Street: street,
      Place: place,
      City: city,
      State: state,
      Pincode: pincode,
      Latitude: latitude,
      Longitude: longitude,
      Username: '9849390103',
      Landmark: landmark,
    };
    await updateAddressAPIReq(updateAddressObj);
  };

  useEffect(() => {
    if (updateAddressAPIRes.isSuccess) {
      console.log('success');
      showAlert('Success', 'Address Updated Successfully');

      const showAddressObj = {
        userName: '9849390103',
      };
      getAddressAPIReq(showAddressObj);
      navigation.navigate('ManageAddress');
    } else if (updateAddressAPIRes.isError) {
      showAlert('Error', updateAddressAPIRes?.error?.data?.Message[0]?.Message);
    }
  }, [updateAddressAPIRes]);

  const handleCross = () => {
    navigation.navigate('ManageAddress');
  };

  return (
    <ScrollView style={styles.MainContainer}>
      <View style={styles.AddMemberView}>
        <View>
          <Text style={styles.headerText}>Edit Address</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleCross}>
            <Image source={require('../assets/images/black_cross.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.MapContainer}>
        <View style={styles.MapView}>
          <Text style={styles.MapText}>Select location on map</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/locationArrow.png')}
            style={{tintColor: 'white', right: 30}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Address Type"
          onChangeText={setAddress}
          value={address}
        />
        {/* <TouchableOpacity style={styles.touchableContainer}>
          <Image
            source={require('../assets/images/downArrow.png')}
            style={styles.downArrow}
          />
        </TouchableOpacity> */}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Street"
          onChangeText={setStreet}
          value={street}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Place"
          onChangeText={setPlace}
          value={place}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="City"
          onChangeText={setCity}
          value={city}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="State"
          onChangeText={setState}
          value={state}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          onChangeText={setPincode}
          value={pincode}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Landmark (optional)"
          onChangeText={setLandmark}
          value={landmark}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          onChangeText={setLongitude}
          value={longitude}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          onChangeText={setLatitude}
          value={latitude}
        />
      </View>

      <TouchableOpacity onPress={handleUpdate}>
        <View style={styles.SubmitButtonView}>
          <Text style={styles.ButtonText}>Update</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default EditAddressScreen;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#eef3fd',
  },
  AddMemberView: {
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 30,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: 20,
    color: '#a19b9b',
  },
  MapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 10,
  },
  MapView: {
    backgroundColor: '#7e72ff',
    padding: 15,
    width: '90%',
    borderRadius: 10,
  },
  MapText: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 50,
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  downArrow: {
    width: 12,
    height: 12,
    position: 'absolute',
    right: 30,
    tintColor: '#9e9e9e',
  },
  touchableContainer: {
    marginTop: 35,
  },
  SubmitButtonView: {
    width: '90%',
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#1e75c0',
    padding: 15,
    margin: 15,
  },
  ButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
  },
  dropdownButton: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 50,
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  dropdown: {
    marginTop: 5,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
