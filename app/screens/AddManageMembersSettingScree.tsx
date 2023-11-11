// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import {useSamyakAddMemberListPostMutation} from '../redux/service/AddMemberListService';
// import {useSamyakManageMembersListPostMutation} from '../redux/service/ManageMemberListService';

// const AddManageMembersSettingScreen = ({navigation}: any) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [title, setTitle] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [dob, setDOB] = useState('');
//   const [sex, setSex] = useState('');
//   const [patientRelation, setPatientRelation] = useState('');
//   const [manageMembersAPIReq] = useSamyakManageMembersListPostMutation();
//   const [addMemberAPIReq, addMemberAPIRes] =
//     useSamyakAddMemberListPostMutation();

//   const handleSubmit = async () => {
//     if (fullName !== '') {
//       let addMemberObj = {
//         Dob: dob,
//         Gender: sex,
//         Link_Pt_Code: '',
//         Mobile_No: phoneNumber,
//         Pt_Name: fullName,
//         Relationship_Code: patientRelation,
//         Title_Code: title,
//         UserName: 7358722588,
//       };
//       await addMemberAPIReq(addMemberObj);
//     }
//   };
//   const showAlert = (title: string, message: string) => {
//     Alert.alert(title, message, [], {cancelable: false});
//   };

//   useEffect(() => {
//     if (addMemberAPIRes.isSuccess) {
//       showAlert('Success', addMemberAPIRes?.data?.Message[0]?.Description);
//       const manageMembersObj = {
//         userName: '7358722588',
//       };
//       manageMembersAPIReq(manageMembersObj);
//       navigation.navigate('ManageMembers');
//     } else if (addMemberAPIRes.isError) {
//       showAlert('Error', addMemberAPIRes?.error?.data?.Message[0]?.Message);
//     }
//   }, [addMemberAPIRes]);

//   const handleCross = () => {
//     navigation.navigate('ManageMembers');
//   };

//   return (
//     <View style={styles.MainContainer}>
//       <View style={styles.AddMemberView}>
//         <View>
//           <Text style={styles.headerText}>Add Member</Text>
//         </View>
//         <View>
//           <TouchableOpacity onPress={handleCross}>
//             <Image source={require('../assets/images/black_cross.png')} />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Phone Number"
//           onChangeText={setPhoneNumber}
//           value={phoneNumber}
//         />
//         <TouchableOpacity style={styles.touchableContainer}>
//           <Image
//             source={require('../assets/images/search.png')}
//             style={styles.SearchImg}
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Title"
//           onChangeText={setTitle}
//           value={title}
//         />
//         <TouchableOpacity style={styles.touchableContainer}>
//           <Image
//             source={require('../assets/images/downArrow.png')}
//             style={styles.downArrow}
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           onChangeText={setFullName}
//           value={fullName}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Select DOB"
//           onChangeText={setDOB}
//           value={dob}
//         />
//         <TouchableOpacity style={styles.touchableContainer}>
//           <Image
//             source={require('../assets/images/calender.png')}
//             style={styles.CalenderImg}
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Sex"
//           onChangeText={setSex}
//           value={sex}
//         />
//         <TouchableOpacity style={styles.touchableContainer}>
//           <Image
//             source={require('../assets/images/downArrow.png')}
//             style={styles.downArrow}
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Patient Relation"
//           onChangeText={setPatientRelation}
//           value={patientRelation}
//         />
//         <TouchableOpacity style={styles.touchableContainer}>
//           <Image
//             source={require('../assets/images/downArrow.png')}
//             style={styles.downArrow}
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity onPress={handleSubmit}>
//         <View style={styles.SubmitButtonView}>
//           <Text style={styles.ButtonText}>Submit</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default AddManageMembersSettingScreen;

// const styles = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     backgroundColor: '#eef3fd',
//   },
//   AddMemberView: {
//     flexDirection: 'row',
//     marginTop: 60,
//     marginBottom: 30,
//     justifyContent: 'space-between',
//     paddingHorizontal: 30,
//   },
//   headerText: {
//     fontSize: 20,
//     color: '#a19b9b',
//   },
//   input: {
//     width: '90%',
//     alignSelf: 'center',
//     borderRadius: 50,
//     padding: 20,
//     backgroundColor: 'white',
//     margin: 15,
//   },
//   inputContainer: {
//     position: 'relative',
//     flexDirection: 'row',
//     alignSelf: 'center',
//   },
//   downArrow: {
//     width: 15,
//     height: 15,
//     position: 'absolute',
//     right: 30,
//     alignSelf: 'center',
//     tintColor: '#9e9e9e',
//   },
//   SearchImg: {
//     width: 20,
//     height: 20,
//     position: 'absolute',
//     right: 30,
//     alignSelf: 'center',
//     tintColor: 'black',
//   },
//   CalenderImg: {
//     width: 20,
//     height: 20,
//     position: 'absolute',
//     right: 30,
//     alignSelf: 'center',
//     tintColor: 'red',
//   },
//   SubmitButtonView: {
//     width: '90%',
//     borderRadius: 50,
//     alignSelf: 'center',
//     backgroundColor: '#1e75c0',
//     padding: 15,
//     margin: 15,
//   },
//   ButtonText: {
//     color: 'white',
//     alignSelf: 'center',
//     fontSize: 20,
//   },
//   touchableContainer: {
//     marginTop: 35,
//   },
// });

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
import {useSamyakManageMembersListPostMutation} from '../redux/service/ManageMemberListService';
import {useSamyakAddMemberListPostMutation} from '../redux/service/AddMemberListService';

const AddManageMembersSettingScreen = ({navigation}: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [title, setTitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [sex, setSex] = useState('');
  const [patientRelation, setPatientRelation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [patientRelationCode, setPatientRelationCode] = useState('');
  const [titleCode, setTitleCode] = useState('');
  const padZero = num => (num < 10 ? `0${num}` : `${num}`);
  const [manageMembersAPIReq] = useSamyakManageMembersListPostMutation();

  // api for add members
  const [addMemberAPIReq, addMemberAPIRes] =
    useSamyakAddMemberListPostMutation();

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

  // api for title
  const [titleAPIReq, titleAPIRes] = useSamyakTitlePostMutation();

  const handleGenderArrow = () => {
    setDropdownVisible(!dropDownVisible);
  };

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

  const handleTitleArrow = () => {
    setDropdownVisibleTitle(!dropDownVisibleTitle);
  };

  const handleSubmit = async () => {
    if (fullName !== '') {
      let addMemberObj = {
        Dob: selectedDate,
        Gender: sex,
        Link_Pt_Code: '',
        Mobile_No: phoneNumber,
        Pt_Name: fullName,
        Relationship_Code: patientRelationCode,
        Title_Code: titleCode,
        UserName: 9849390103,
      };
      await addMemberAPIReq(addMemberObj);
    }
  };

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [], {cancelable: false});
  };

  useEffect(() => {
    if (addMemberAPIRes.isSuccess) {
      showAlert('Success', addMemberAPIRes?.data?.Message[0]?.Description);
      const manageMembersObj = {
        userName: '9849390103',
      };
      manageMembersAPIReq(manageMembersObj);
      navigation.navigate('ManageMembers');
    } else if (addMemberAPIRes.isError) {
      showAlert('Error', addMemberAPIRes?.error?.data?.Message[0]?.Message);
    }
  }, [addMemberAPIRes]);

  const handleCross = () => {
    navigation.navigate('ManageMembers');
  };

  return (
    <ScrollView style={styles.MainContainer}>
      <View style={styles.AddMemberView}>
        <Text style={styles.headerText}>Add Member</Text>
        <TouchableOpacity onPress={handleCross}>
          <Image source={require('../assets/images/black_cross.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
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

      <View style={[styles.dropdownContainer]}>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={handleTitleArrow}>
          <Text style={styles.input}>{title || 'Title'}</Text>
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setFullName}
          value={fullName}
        />
      </View>

      <View style={styles.inputContainerDob}>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={() => setShowCalendar(true)}>
          <Text style={[styles.input, styles.borderRadius]}>
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
              const formattedDate = `${day.year}/${padZero(
                day.month,
              )}/${padZero(day.day)}`;
              setSelectedDate(formattedDate);
              setShowCalendar(false);
            }}
          />
        )}
      </View>

      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={handleGenderArrow}>
          <Text style={[styles.input, styles.borderRadius]}>
            {sex || 'Sex'}
          </Text>
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
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={handleRelationshipArrow}>
          <Text style={[styles.input, styles.borderRadius]}>
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
      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.SubmitButtonView}>
          <Text style={styles.ButtonText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddManageMembersSettingScreen;

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
    borderRadius: 50,
  },
  inputDropdown: {
    borderRadius: 50,
    backgroundColor: 'white',
    height: '8%',
    width: '85%',
  },

  dropdownContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  downArrow: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 30,
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
    width: '90%',
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
    right: 30,
    tintColor: 'black',
  },
  CalenderImg: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 30,
    tintColor: 'red',
  },
  borderRadius: {
    borderRadius: 50,
  },
});
