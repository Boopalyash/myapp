import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import HeaderCommonComponentScreen from '../components/HeaderCommonComponent';
import {useSamyakAddressPostMutation} from '../redux/service/ManageAddressPostService';
import {useSamyakDeleteAddressPostMutation} from '../redux/service/DeleteAddressService';
import {useSelector} from 'react-redux';
import {useSamyakDefaultBranchPostMutation} from '../redux/service/DefaultBranchService';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageAddressSettingsScreen = ({navigation}: any) => {
  const [getAddressAPIReq, getAddressAPIRes] = useSamyakAddressPostMutation();
  const [deleteAddressAPIReq, deleteAddressAPIRes] =
    useSamyakDeleteAddressPostMutation();
  const [addresData, setAddressData] = useState([]);
  const [selectedbranch, setSelectedBranch] = useState('RT-MAIN(PORUR)');
  const [defaultManageBranchAPIReq, defaultManageBranchAPIRes] =
    useSamyakDefaultBranchPostMutation();

  const addressSelector = useSelector(
    (state: RootState) =>
      state.getAddressPost.samyakAddressDetailsPost[0]?.User_Address,
  );
  console.log(addressSelector, 'addressData');
  const showAddressObj = {
    userName: '9849390103',
  };
  console.log(deleteAddressAPIRes, 'deleteAddressAPIRes');

  useEffect(() => {
    if (deleteAddressAPIRes?.isSuccess) {
      showAlert('Success', deleteAddressAPIRes?.data?.Status_Description);
      getAddressAPIReq(showAddressObj);
    } else if (deleteAddressAPIRes?.isError) {
      showAlert('Error', deleteAddressAPIRes?.error?.data?.Message[0]?.Message);
    }
  }, [deleteAddressAPIRes]);

  const showAlert = (title, message) => {
    Alert.alert(title, message, [], {cancelable: false});
  };

  useEffect(() => {
    getAddressAPIReq(showAddressObj);
  }, []);
  useEffect(() => {
    if (getAddressAPIRes?.isSuccess) {
      console.log('value setted');

      setAddressData(getAddressAPIRes?.data?.Message[0]?.User_Address);
    }
  }, [getAddressAPIRes, addressSelector]);
  const handleDelete = item => {
    let credentials = {
      UserName: '9849390103',
      Address_Type: '01',
    };
    deleteAddressAPIReq(credentials);
  };

  const handleAdd = () => {
    navigation.navigate('AddAddress');
  };

  const handleEdit = item => {
    navigation.navigate('EditAddress', {item});
  };

  const handleButtonPresss = () => {
    navigation.navigate('Settings');
  };

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('selectedBranch')
        .then(value => {
          if (value) {
            defaultManageBranchAPIReq({
              userName: '9849390103',
              Default_Firm_No: value,
            });
          }
        })
        .catch(error => console.error('Error ', error));
      return () => {
        console.log('Screen is unfocused');
      };
    }, []),
  );

  useEffect(() => {
    if (defaultManageBranchAPIRes?.isSuccess) {
      setSelectedBranch(
        defaultManageBranchAPIRes?.data?.Message[0]?.Branch_Name,
      );
    }
  }, [defaultManageBranchAPIRes]);

  const renderAddressItem = ({item}: any) => {
    return (
      <View style={{backgroundColor: '#f7f7f7', margin: 10, padding: 10}}>
        <View style={styles.HomeView}>
          <View style={{left: 10}}>
            <Text style={{color: '#2f2f2f'}}>{item?.Address_Type_Desc}</Text>
          </View>
          <View style={{left: 140}}>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Image
                source={require('../assets/images/edit.png')}
                style={styles.EditImg}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Image
              source={require('../assets/images/delete.png')}
              style={styles.DeleteImg}
            />
          </TouchableOpacity>
        </View>

        <View style={{left: 10, marginTop: 10}}>
          <Text style={{color: '#2a2a2a'}}>{item?.Full_Address}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.MainContainer}>
      <View>
        <HeaderCommonComponentScreen text={'Manage Address'} />
      </View>

      <View style={styles.LocationView}>
        <Image
          source={require('../assets/images/location.png')}
          style={styles.LocationImg}
        />
        <Text>{selectedbranch}</Text>
      </View>

      <View style={{alignSelf: 'flex-end', paddingHorizontal: 20}}>
        <TouchableOpacity onPress={handleAdd}>
          <Text style={{fontSize: 18, color: '#1e75c0'}}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={addresData}
        renderItem={renderAddressItem}
        keyExtractor={item => item.id}
      />

      <View style={styles.BackButtonView}>
        <TouchableOpacity style={styles.buttons} onPress={handleButtonPresss}>
          <Image
            source={require('../assets/images/backArrowBlack.png')}
            style={styles.buttonImages}
          />
          <Text style={styles.buttonTexts}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ManageAddressSettingsScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fafbfb',
  },
  LocationView: {
    flexDirection: 'row',
    marginTop: 100,
    alignSelf: 'flex-end',
    right: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  LocationImg: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  BackButtonView: {
    width: '30%',
    left: 30,
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#676767',
    borderRadius: 15,
    padding: 15,
  },
  buttonImages: {
    width: 20,
    height: 20,
    tintColor: 'white',
    right: 15,
  },
  buttonTexts: {
    color: 'white',
    fontSize: 20,
  },
  HomeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  EditImg: {
    width: 15,
    height: 15,
    tintColor: '#b6d8fa',
  },
  DeleteImg: {
    width: 15,
    height: 15,
    tintColor: '#d83737',
  },
});
