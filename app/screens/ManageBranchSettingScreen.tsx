import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-paper';
import HeaderCommonComponentScreen from '../components/HeaderCommonComponent';
import {useSamyakManageBranchPostMutation} from '../redux/service/ManageBranchPostService';
import {useSamyakDefaultBranchPostMutation} from '../redux/service/DefaultBranchService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageBranchSettingScreen = ({navigation}: any) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] =
    useState('Select Branch');
  const [branchData, setBranchData] = useState([]);
  const cardRef = useRef(null);

  const [manageBranchAPIReq] = useSamyakManageBranchPostMutation();
  const [defaultManageBranchAPIReq, defaultManageBranchAPIRes] =
    useSamyakDefaultBranchPostMutation();

  useEffect(() => {
    const manageBranchObj = {
      userName: '9849390103',
    };

    manageBranchAPIReq(manageBranchObj)
      .unwrap()
      .then(response => {
        if (response.SuccessFlag === 'true') {
          setBranchData(response.Message);
        }
      });
  }, []);

  useEffect(() => {
    if (defaultManageBranchAPIRes?.isSuccess) {
    }
  }, [defaultManageBranchAPIRes]);

  const openDropdown = () => {
    setShowOptions(true);
  };

  const closeDropdown = () => {
    setShowOptions(false);
  };

  const handleOptionSelect = (
    option: string,
    number: string,
    index: number,
  ) => {
    setSelectedOptionIndex(option);
    closeDropdown();
    const defaultBranchobj = {
      userName: '9849390103',
      Default_Firm_No: number,
    };
    defaultManageBranchAPIReq(defaultBranchobj);
    AsyncStorage.setItem('selectedBranch', number);
  };

  const handleArrowImagePress = () => {
    openDropdown();
  };

  const handleButtonPress = () => {
    navigation.navigate('Settings');
  };

  const handleOverlayPress = () => {
    closeDropdown();
  };

  return (
    <View style={styles.MainContainer}>
      <View>
        <HeaderCommonComponentScreen text={'Manage Branch'} />
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.selectTextContainer}>
          <Text style={styles.selectText}>Select Branch</Text>
        </View>

        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={handleArrowImagePress}>
          <Text style={styles.inputText}>{selectedOptionIndex}</Text>
          <Image
            source={require('../assets/images/downArrow.png')}
            style={styles.arrowImage}
          />
        </TouchableOpacity>
      </ScrollView>

      {showOptions && (
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <View style={styles.overlay}>
            <Card elevation={4} style={styles.card} ref={cardRef}>
              <FlatList
                data={branchData}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() =>
                      handleOptionSelect(item.Branch_Name, item.Firm_No, index)
                    }
                    style={[
                      styles.option,
                      selectedOptionIndex === index && styles.selectedOption,
                    ]}>
                    <Text style={{color: 'orange'}}>{item.Branch_Name}</Text>
                  </TouchableOpacity>
                )}
              />
            </Card>
          </View>
        </TouchableWithoutFeedback>
      )}

      <View style={styles.BackButtonView}>
        <TouchableOpacity style={styles.buttons} onPress={handleButtonPress}>
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

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#f2f6fd',
  },
  selectedOption: {
    backgroundColor: '#E0E0E0',
    padding: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputText: {
    flex: 1,
  },
  arrowImage: {
    width: 12,
    height: 12,
    tintColor: '#9e9e9e',
  },
  contentContainer: {
    marginTop: 120,
    padding: 10,
  },
  selectTextContainer: {
    marginBottom: 10,
  },
  selectText: {
    fontSize: 18,
    color: '#747577',
  },
  option: {
    padding: 20,
    borderBottomColor: '#747577',
  },
  overlay: {
    position: 'absolute',
    top: 220,
    left: 10,
    right: 10,
    bottom: 150,
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
  scrollableList: {
    borderTopWidth: 1,
    borderTopColor: '#747577',
    paddingHorizontal: 10,
  },
  card: {
    maxHeight: 280,
    backgroundColor: 'white',
  },
});

export default ManageBranchSettingScreen;
