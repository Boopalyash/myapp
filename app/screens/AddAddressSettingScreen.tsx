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
import {useSamyakAddAddressPostMutation} from '../redux/service/ManageAddNewAddressPostService';
import {useSamyakAddressPostMutation} from '../redux/service/ManageAddressPostService';
import MapView, {Marker} from 'react-native-maps';

const AddAddressSettingScreen = ({navigation}: any) => {
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [place, setPlace] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [selectedAddressType, setSelectedAddressType] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [getAddressAPIReq, getAddressAPIRes] = useSamyakAddressPostMutation();
  const addressTypes = [
    {name: 'Home', id: '01'},
    {name: 'Work', id: '02'},
    {name: 'Others', id: '03'},
  ];

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [], {cancelable: false});
  };

  const handleAddressTypeSelect = type => {
    setSelectedAddressType(type.id);
    setAddress(type.name);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const [addAddressAPIReq, addAddressAPIRes] =
    useSamyakAddAddressPostMutation();

  const handleSubmit = async () => {
    let addAddressObj = {
      Address_Type: selectedAddressType,
      Street: street,
      Place: place,
      City: city,
      State: state,
      Pincode: pincode,
      Latitude: latitude,
      Longitude: longitude,
      Username: 9849390103,
      Landmark: '',
    };
    await addAddressAPIReq(addAddressObj);
  };

  useEffect(() => {
    if (addAddressAPIRes.isSuccess && addAddressAPIRes?.data?.Code === 200) {
      showAlert('Success', 'Address Added Successfully');
      const manageAddressObj = {
        userName: '9849390103',
      };
      getAddressAPIReq(manageAddressObj);
      navigation.navigate('ManageAddress', {getAddressAPIRes});
    } else if (addAddressAPIRes?.isError) {
      showAlert('Error', addAddressAPIRes?.error?.data?.Message[0]?.Message);
    }
  }, [addAddressAPIRes]);

  const handleCross = () => {
    navigation.navigate('ManageAddress');
  };
  const handleLocationArrowClick = () => {
    setShowMap(true);
  };

  return (
    <ScrollView style={styles.MainContainer}>
      <View style={styles.AddMemberView}>
        <View>
          <Text style={styles.headerText}>Add Address</Text>
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
        <TouchableOpacity onPress={handleLocationArrowClick}>
          <Image
            source={require('../assets/images/locationArrow.png')}
            style={{tintColor: 'white', right: 30}}
          />
        </TouchableOpacity>
      </View>
      {showMap && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 11.0967,
            longitude: 77.4304,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{latitude: 11.0967, longitude: 77.4304}}
            title="Marker Title"
            description="Marker Description"
          />
        </MapView>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Select Address Type"
          value={address}
          onFocus={toggleDropdown}
        />
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={toggleDropdown}>
          <Image
            source={require('../assets/images/downArrow.png')}
            style={styles.downArrow}
          />
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={styles.dropdown}>
            {addressTypes.map(type => (
              <TouchableOpacity
                key={type.name}
                style={styles.dropdownItem}
                onPress={() => handleAddressTypeSelect(type)}>
                <Text>{type.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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

      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.SubmitButtonView}>
          <Text style={styles.ButtonText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default AddAddressSettingScreen;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#eef3fd',
  },
  AddMemberView: {
    flexDirection: 'row',
    marginTop: 30,
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
    top: 5,
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
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdown: {
    position: 'absolute',
    marginTop: -50,
    left: 15,
    right: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  map: {
    height: 200,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
});
