import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useSamyakTestTrendsPostMutation} from '../redux/service/TestTrendsTest';
import {useSamyakTrendsPatientListPostMutation} from '../redux/service/TrendsPatientList';
import {useSamyakManageMembersListPostMutation} from '../redux/service/ManageMemberListService';
import {useSamyakDefaultBranchPostMutation} from '../redux/service/DefaultBranchService';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation-locker';
import {LineChart} from 'react-native-chart-kit';

const TestTrendsScreen = ({navigation}: any) => {
  const [setTestData] = useState([]);
  const [setPatientListData] = useState([]);
  const [displayGraph, setDisplayGraph] = useState(true);
  const [showPatientDropDown, setShowPatientDropDown] = useState(false);
  const [selectedPatientList, setSelectedPatientlist] = useState('');
  const [showTestDropDown, setShowTestDropDown] = useState(false);
  const [selectedTestList, setSelectedTestlList] = useState('');
  const [selectedImage, setSelectedImage] = useState('graph');
  const [selectedbranch, setSelectedBranch] = useState('RT-MAIN(PORUR)');
  const [currentOrientation, setCurrentOrientation] = useState('PORTRAIT');

  // api for to display branch
  const [defaultManageBranchAPIReq, defaultManageBranchAPIRes] =
    useSamyakDefaultBranchPostMutation();
  // api for to display patient list
  const [manageMembersAPIReq, manageMembersAPIRes] =
    useSamyakManageMembersListPostMutation();
  // Api for to display ref_value
  const [testTrendsAPIReq, testTrendsAPIRes] =
    useSamyakTestTrendsPostMutation();
  // Api for to display Patient test
  const [patientListAPIReq, patientListAPIRes] =
    useSamyakTrendsPatientListPostMutation();

  const manageMembersObj = {
    userName: '9849390103',
  };

  // useEffect for ref_value
  useEffect(() => {
    const testTrendsTestObj = {
      userName: '9849390103',
      Pt_Code: '0100511265',
      Test_Code: '000245',
      Test_Sub_Code: '',
    };
    testTrendsAPIReq(testTrendsTestObj)
      .unwrap()
      .then(response => {
        if (response.SuccessFlag === 'true') {
          setTestData(response.Message);
        }
      });
  }, [testTrendsAPIReq]);

  const handleArrowImagePress = (_index: any) => {
    setShowTestDropDown(prevState => !prevState);
  };

  // useEffect for Patient
  useEffect(() => {
    const trendsPatientListObj = {
      userName: '9849390103',
      Pt_Code: '0100511265',
    };
    patientListAPIReq(trendsPatientListObj)
      .unwrap()
      .then(response => {
        console.log(response, 'patientList)');
        if (response.SuccessFlag === 'true') {
          setPatientListData(response.Message);
        }
      });
  }, []);

  const handlePatientArrow = (index: any) => {
    manageMembersAPIReq(manageMembersObj);
    setShowPatientDropDown(prevState => !prevState);
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleGraphImagePress = () => {
    setDisplayGraph(true);
    setSelectedImage('graph');
  };

  const handleTableImagePress = () => {
    setDisplayGraph(false);
    setSelectedImage('table');
  };

  const selectedPatient = (item: React.SetStateAction<string>) => {
    setSelectedPatientlist(item);
    setShowPatientDropDown(false);
  };

  const selectTest = (item: React.SetStateAction<string>) => {
    setSelectedTestlList(item);
    setShowTestDropDown(false);
  };

  // to display branch
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

  const toggleOrientation = () => {
    if (currentOrientation === 'PORTRAIT') {
      Orientation.lockToLandscape();
      setCurrentOrientation('LANDSCAPE');
    } else {
      Orientation.lockToPortrait();
      setCurrentOrientation('PORTRAIT');
    }
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.BookingText}>Test Trends</Text>
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

      <ScrollView>
        <View style={styles.LocationView}>
          <Image
            source={require('../assets/images/location.png')}
            style={styles.LocationImg}
          />
          <Text>{selectedbranch}</Text>
        </View>

        <View style={styles.SelectPatientView}>
          <Text style={styles.SelectPatientText}>Select Patient</Text>
          <TouchableOpacity onPress={handlePatientArrow}>
            <Image
              source={require('../assets/images/downArrow.png')}
              style={styles.DownArrowImg}
            />
          </TouchableOpacity>
        </View>

        {Object.keys(selectedPatientList).length > 0 && (
          <View style={styles.cardView}>
            <View style={styles.textContainer}>
              <Text>
                {selectedPatientList?.Pt_Name} ,
                {selectedPatientList?.Pt_First_Age}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text>{selectedPatientList?.Pt_Gender}</Text>
            </View>
            <Text>{selectedPatientList?.RelationShip_Name}</Text>
          </View>
        )}

        {showPatientDropDown && (
          <View style={styles.dropdownContainer}>
            <ScrollView style={styles.dropdownScrollView}>
              {manageMembersAPIRes?.data?.Message[0]?.Patient_Detail?.map(
                (item: {
                  id: React.Key | null | undefined;
                  Pt_Name:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                  Pt_First_Age:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                }) => (
                  <TouchableOpacity
                    onPress={() => selectedPatient(item)}
                    key={item.id}>
                    <Card style={styles.card}>
                      <Card.Content>
                        <Text>Name: {item.Pt_Name}</Text>
                        <Text>Age: {item.Pt_First_Age}</Text>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                ),
              )}
            </ScrollView>
          </View>
        )}

        <View style={{backgroundColor: '#f1f1f1', padding: 8, margin: 15}}>
          <View style={styles.SelectPatientView1}>
            <Text style={styles.SelectPatientText1}>Select Test</Text>
            <TouchableOpacity onPress={handleArrowImagePress}>
              <Image
                source={require('../assets/images/downArrow.png')}
                style={styles.DownArrowImg1}
              />
            </TouchableOpacity>
          </View>
          {Object.keys(selectedTestList).length > 0 && (
            <View style={{marginTop: 5, left: 10}}>
              <Text>{selectedTestList?.Test_Name} </Text>
            </View>
          )}
        </View>

        {showTestDropDown && (
          <ScrollView
            style={[
              styles.dropdownContainer,
              {alignSelf: 'center', width: '90%', marginTop: 300},
            ]}>
            {patientListAPIRes?.data?.Message.map(
              (item: {
                id: React.Key | null | undefined;
                Test_Name:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
              }) => (
                <TouchableOpacity
                  onPress={() => selectTest(item)}
                  key={item.id}>
                  <Card style={styles.card}>
                    <Card.Content>
                      <Text>{item.Test_Name}</Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ),
            )}
          </ScrollView>
        )}

        <View style={{flexDirection: 'row', alignSelf: 'flex-end', right: 20}}>
          <TouchableOpacity onPress={handleGraphImagePress}>
            <View
              style={{
                backgroundColor:
                  selectedImage === 'graph' ? '#3399ff' : 'transparent',
                right: 10,
                padding: 5,
              }}>
              <Image
                source={require('../assets/images/graphImage.png')}
                style={{width: 40, height: 40}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTableImagePress}>
            <View
              style={{
                backgroundColor:
                  selectedImage === 'table' ? '#3399ff' : 'transparent',
              }}>
              <Image
                source={require('../assets/images/tableImage.png')}
                style={{width: 50, height: 50}}
              />
            </View>
          </TouchableOpacity>
        </View>

        {displayGraph ? (
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    data: [0.0, 40, 80, 120, 160, 200],
                  },
                ],
              }}
              width={350}
              height={220}
              yAxisLabel="$"
              chartConfig={{
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
            />
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 100,
                marginTop: 20,
              }}>
              <Text style={{fontSize: 20}}>Date</Text>
              <Text style={{fontSize: 20}}>Result</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 70,
                justifyContent: 'space-between',
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'black',
                padding: 15,
                width: '90%',
                alignSelf: 'center',
              }}>
              {testTrendsAPIRes?.isSuccess &&
                testTrendsAPIRes?.data?.Code === 200 &&
                testTrendsAPIRes?.data?.Message[0]?.Result_Detail?.map(
                  (item: {
                    Sid_Date:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    Result:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => {
                    return (
                      <>
                        <Text>{item?.Sid_Date}</Text>
                        <Text>{item?.Result}</Text>
                      </>
                    );
                  },
                )}
            </View>

            <View style={{marginTop: 20, left: 20}}>
              {testTrendsAPIRes?.isSuccess &&
                testTrendsAPIRes?.data?.Code === 200 &&
                testTrendsAPIRes?.data?.Message.map(
                  (item: {
                    Ref_value:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => {
                    return (
                      <Text style={{marginTop: 10, fontSize: 14}}>
                        {item.Ref_value}
                      </Text>
                    );
                  },
                )}
            </View>
          </View>
        )}
        <View style={{flexDirection: 'row', alignSelf: 'flex-end', right: 20}}>
          <TouchableOpacity onPress={toggleOrientation}>
            <View
              style={{
                alignSelf: 'flex-end',
                right: 20,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Image
                source={require('../assets/images/rotation.png')}
                style={{width: 40, height: 40}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default TestTrendsScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fafbfb',
  },
  container: {
    height: 80,
    backgroundColor: 'orange',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 10,
  },
  BookingText: {
    fontSize: 20,
    color: 'white',
  },
  imageRow: {
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 20,
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
  SelectPatientView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  SelectPatientText: {
    fontSize: 20,
  },
  DownArrowImg: {
    width: 20,
    height: 20,
  },
  SelectPatientView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  SelectPatientText1: {
    fontSize: 16,
    color: '#60b450',
  },
  DownArrowImg1: {
    width: 20,
    height: 20,
  },
  cardView: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'grey',
    margin: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  textContainer: {
    borderRightWidth: 1,
    borderRightColor: 'gray',
    paddingRight: 20,
  },

  SelectPatientTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  TestOption: {
    fontSize: 16,
    color: '#60b450',
    paddingVertical: 8,
    paddingHorizontal: 10,
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
  card: {
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
    marginTop: 5,
  },
  dropdownContainer: {
    // position: 'relative',
    // zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  dropdownScrollView: {
    alignSelf: 'center',
    width: '90%',
    marginTop: 50,
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
