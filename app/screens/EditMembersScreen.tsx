import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useSamyakEditGenderPostMutation} from '../redux/service/EditGenderService';
import {useSamyakRelationshipPostMutation} from '../redux/service/RelationshipService';
import {useSamyakTitlePostMutation} from '../redux/service/TitleService';
import {Calendar} from 'react-native-calendars';
import {useRoute} from '@react-navigation/native';
import {useSamyakEditPatientPostMutation} from '../redux/service/EditPatientService';
import {useSamyakManageMembersListPostMutation} from '../redux/service/ManageMemberListService';

const EditMembersScreen = ({navigation}: any) => {
  const route = useRoute();
  const editData = route.params;
  const [phoneNumber, setPhoneNumber] = useState(editData?.item?.Pt_Mobile_No);
  const [title, setTitle] = useState(editData?.item?.Pt_Title_Desc);
  const [titleCode, setTitleCode] = useState(editData?.item?.Pt_Title_Code);
  const [fullName, setFullName] = useState(editData?.item?.Pt_Name);
  const [sex, setSex] = useState(editData?.item?.Pt_Gender);
  const [patientRelation, setPatientRelation] = useState(
    editData?.item?.RelationShip_Name,
  );
  const [patientRelationCode, setPatientRelationCode] = useState(
    editData?.item?.RelationShip_Code,
  );
  const [selectedDate, setSelectedDate] = useState(editData?.item?.Pt_Dob);
  const [showCalendar, setShowCalendar] = useState(false);

  // gender
  const [genderData] = useState();
  const [dropDownVisible, setDropdownVisible] = useState(false);

  // relatioship
  const [relatioshipData] = useState();
  const [dropDownVisibleRelation, setDropdownVisibleRelation] = useState(false);

  // title
  const [titleData] = useState();
  const [dropDownVisibleTitle, setDropdownVisibleTitle] = useState(false);

  // api for get gender
  const [genderAPIReq, genderAPIRes] = useSamyakEditGenderPostMutation();

  // api for relatioship
  const [relatioshipAPIReq, relatioshipAPIRes] =
    useSamyakRelationshipPostMutation();
  const [manageMembersAPIReq] = useSamyakManageMembersListPostMutation();

  // api for title
  const [titleAPIReq, titleAPIRes] = useSamyakTitlePostMutation();
  const [editMemberAPIReq, editMemberAPIRes] =
    useSamyakEditPatientPostMutation();
  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [], {cancelable: false});
  };

  useEffect(() => {
    if (editMemberAPIRes.isSuccess) {
      showAlert('Success', 'Patient Details Updated Successfully');
      const manageMembersObj = {
        userName: '9849390103',
      };
      manageMembersAPIReq(manageMembersObj);
      navigation.navigate('ManageMembers');
    } else if (editMemberAPIRes.isError) {
      showAlert('Error', editMemberAPIRes?.error?.data?.Message[0]?.Message);
    }
  }, [editMemberAPIRes]);

  // useEffect for  gender api
  useEffect(() => {
    const genderObj = {
      userName: '9849390103',
    };
    genderAPIReq(genderObj)
      .unwrap()
      .then(response => {
        if (response.SuccessFlag === 'true') {
          genderData(response.Message);
        }
      });
  }, []);

  const handleGenderArrow = () => {
    setDropdownVisible(!dropDownVisible);
  };

  // useEffect for relationship
  useEffect(() => {
    const relationshipObj = {
      userName: '9849390103',
    };
    relatioshipAPIReq(relationshipObj)
      .unwrap()
      .then(response => {
        if (response.SuccessFlag === 'true') {
          relatioshipData(response.Message);
        }
      });
  }, []);

  const handleRelationshipArrow = () => {
    setDropdownVisibleRelation(!dropDownVisibleRelation);
  };

  // useEffect for title
  useEffect(() => {
    const titleObj = {
      userName: '9849390103',
    };
    titleAPIReq(titleObj)
      .unwrap()
      .then(response => {
        if (response.SuccessFlag === 'true') {
          titleData(response.Message);
        }
      });
  }, []);

  const handleTitleArrow = () => {
    setDropdownVisibleTitle(!dropDownVisibleTitle);
  };

  const handleCross = () => {
    navigation.navigate('ManageMembers');
  };

  const handleUpdate = async () => {
    let addMemberObj = {
      Dob: selectedDate,
      Gender: sex,
      Mobile_No: phoneNumber,
      Pt_Code: editData?.item?.Pt_Code,
      Pt_Name: fullName,
      Relationship_Code: patientRelationCode,
      Title_Code: titleCode,
      UserName: 9849390103,
    };

    await editMemberAPIReq(addMemberObj);
  };

  return (
    <ScrollView style={styles.MainContainer}>
      <View style={styles.AddMemberView}>
        <Text style={styles.headerText}>Edit Member</Text>
        <TouchableOpacity onPress={handleCross}>
          <Image source={require('../assets/images/black_cross.png')} />
        </TouchableOpacity>
      </View>

      <View style={[styles.inputDrop, styles.dropdownContainer]}>
        <TextInput
          style={[styles.borderRadius]}
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
        <TouchableOpacity style={styles.touchableContainer}>
          <Image
            source={require('../assets/images/search.png')}
            style={styles.SearchImg}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.inputDrop, styles.dropdownContainer]}>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={handleTitleArrow}>
          <Text style={[styles.borderRadius]}>{title || 'Title'}</Text>
          <Image
            source={require('../assets/images/downArrow.png')}
            style={styles.downArrow}
          />
        </TouchableOpacity>
        {dropDownVisibleTitle && titleAPIRes?.isSuccess && (
          <View style={styles.dropdownCard}>
            <ScrollView>
              {titleAPIRes?.data?.Message.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setTitle(item.Title_Desc);
                      setTitleCode(item.Title_Code);
                      setDropdownVisibleTitle(false);
                    }}>
                    <Text style={styles.dropdownItem}>{item.Title_Desc}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={[styles.inputDrop, styles.dropdownContainer]}>
        <TextInput
          style={[styles.borderRadius]}
          placeholder="Name"
          onChangeText={setFullName}
          value={fullName}
        />
      </View>

      <View style={[styles.inputDrop, styles.dropdownContainer]}>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={() => setShowCalendar(true)}>
          <Text style={[styles.borderRadius]}>
            {selectedDate || 'Select DOB'}
          </Text>
          <Image
            source={require('../assets/images/calender.png')}
            style={styles.CalenderImg}
          />
        </TouchableOpacity>
        {showCalendar && (
          <Calendar
            onDayPress={day => {
              const formattedDate = `${day.year}/${day.month}/${day.day}`;
              setSelectedDate(formattedDate);
              setShowCalendar(false);
            }}
          />
        )}
      </View>

      <View style={[styles.inputDrop, styles.dropdownContainer]}>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={handleGenderArrow}>
          <Text style={[styles.borderRadius]}>{sex || 'Sex'}</Text>
          <Image
            source={require('../assets/images/downArrow.png')}
            style={styles.downArrow}
          />
        </TouchableOpacity>
        {dropDownVisible && genderAPIRes?.isSuccess && (
          <View style={styles.dropdownCard}>
            <ScrollView>
              {genderAPIRes?.data?.Message.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSex(item.Gender_Desc);
                      setDropdownVisible(false);
                    }}>
                    <Text style={styles.dropdownItem}>{item.Gender_Desc}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={[styles.inputDrop, styles.dropdownContainer]}>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={handleRelationshipArrow}>
          <Text style={[styles.borderRadius]}>
            {patientRelation || 'Patient Relation'}
          </Text>
          <Image
            source={require('../assets/images/downArrow.png')}
            style={styles.downArrow}
          />
        </TouchableOpacity>
        {dropDownVisibleRelation && relatioshipAPIRes?.isSuccess && (
          <View style={styles.dropdownCard}>
            <ScrollView>
              {relatioshipAPIRes?.data?.Message.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setPatientRelation(item.RelationShip_Desc);
                      setPatientRelationCode(item.RelationShip_Code);
                      setDropdownVisibleRelation(false);
                    }}>
                    <Text style={styles.dropdownItem}>
                      {item.RelationShip_Desc}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={handleUpdate}>
        <View style={styles.SubmitButtonView}>
          <Text style={styles.ButtonText}>Update</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditMembersScreen;

const styles = StyleSheet.create({
  MainContainer: {
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
  input: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 90,
  },
  inputDrop: {
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 50,
  },
  dropdownContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  downArrow: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
    tintColor: '#9e9e9e',
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
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownCard: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 5,
    alignSelf: 'center',
    width: '100%',
    position: 'absolute',
    zIndex: 2,
  },

  dropdownItem: {
    padding: 10,
    fontSize: 16,
    borderBottomColor: '#ccc',
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
  },
  inputContainerDob: {
    alignSelf: 'center',
    width: '90%',
  },
  SearchImg: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
    tintColor: 'black',
  },
  CalenderImg: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
    tintColor: 'red',
  },
  borderRadius: {
    borderRadius: 50,
  },
});
