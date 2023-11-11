import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import {useSamyakManageMembersListPostMutation} from '../redux/service/ManageMemberListService';
import {useSamyakDeletePatientPostMutation} from '../redux/service/DeletePatientService';
import {useSamyakDefaultBranchPostMutation} from '../redux/service/DefaultBranchService';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageMembersSettingScreen = ({navigation}: any) => {
  const [selectedbranch, setSelectedBranch] = useState('RT-MAIN(PORUR)');
  const [defaultManageBranchAPIReq, defaultManageBranchAPIRes] =
    useSamyakDefaultBranchPostMutation();
  // to show members list
  const [manageMembersAPIReq] = useSamyakManageMembersListPostMutation();
  // to delete the member list
  const [deletePatientAPIReq, deletePatientAPIRes] =
    useSamyakDeletePatientPostMutation();

  const manageMembersData = useSelector(
    (state: RootState) =>
      state.manageMemberList.samyakDetailsManageMembersListPost,
  );

  const manageMembersObj = {
    userName: '9849390103',
  };

  useEffect(() => {
    if (deletePatientAPIRes?.isSuccess) {
      showAlert('Success', deletePatientAPIRes?.data?.Message[0]?.Message);
      manageMembersAPIReq(manageMembersObj);
    } else if (deletePatientAPIRes?.isError) {
      showAlert('Error', deletePatientAPIRes?.error?.data?.Message[0]?.Message);
    }
  }, [deletePatientAPIRes]);

  const showAlert = (title, message) => {
    Alert.alert(title, message, [], {cancelable: false});
  };

  //useEffect show the members list
  useEffect(() => {
    manageMembersAPIReq(manageMembersObj);
  }, []);

  const handleDelete = item => {
    let credentials = {
      UserName: '9849390103',
      Pt_Code: item?.Pt_Code,
    };
    deletePatientAPIReq(credentials);
  };

  const handleAdd = () => {
    navigation.navigate('AddMember');
  };

  const handleProfile = () => {
    navigation.navigate('Settings');
  };

  const handleButtonPresss = () => {
    navigation.navigate('Settings');
  };

  const handleEdit = item => {
    navigation.navigate('EditMember', {item});
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

  const renderMemberItem = ({item}: any) => {
    return (
      <View style={styles.cardView}>
        <View style={styles.textContainer1}>
          <Text>
            {item.Pt_Name},{item.Pt_First_Age}
          </Text>
        </View>
        <View style={styles.textContainer2}>
          <Text>{item.Pt_Gender}</Text>
        </View>
        <View style={styles.textContainer3}>
          <Text>{item.RelationShip_Name}</Text>
        </View>
        <View style={styles.textContainer4}>
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <Image
              source={require('../assets/images/edit.png')}
              style={{width: 20, height: 20, tintColor: '#59adff'}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer5}>
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Image
              source={require('../assets/images/delete.png')}
              style={{width: 20, height: 20, tintColor: '#e12c2c'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.BookingText}>Manage Members</Text>
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
        data={manageMembersData[0]?.Patient_Detail}
        renderItem={renderMemberItem}
        keyExtractor={item => item.Pt_Code}
        contentContainerStyle={styles.flatListContent}
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

export default ManageMembersSettingScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fafbfb',
  },
  container: {
    height: 100,
    backgroundColor: 'orange',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 30,
  },
  BookingText: {
    fontSize: 20,
    color: 'white',
    top: 8,
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
  LocationView: {
    flexDirection: 'row',
    marginTop: 20,
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
  cardView: {
    backgroundColor: '#f7f7f7',
    margin: 15,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },

  BackButtonView: {
    width: '30%',
    left: 15,
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
  textContainer1: {
    borderRightWidth: 1,
    borderRightColor: 'gray',
    width: '40%',
  },
  textContainer2: {
    borderRightWidth: 1,
    borderRightColor: 'gray',
    width: '20%',
    alignItems: 'center',
  },
  textContainer3: {
    width: '20%',
    alignItems: 'center',
  },
  textContainer4: {
    width: '10%',
    alignItems: 'center',
  },
  textContainer5: {
    width: '10%',
    alignItems: 'center',
  },
  flatListContent: {
    paddingBottom: 80,
  },
});
