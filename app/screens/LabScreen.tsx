import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {Calendar} from 'react-native-calendars';
import {RadioButton} from 'react-native-paper';
import {useSamyakDefaultBranchPostMutation} from '../redux/service/DefaultBranchService';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSamyakLabChooseBonePostMutation} from '../redux/service/LabChoosePackageBone';
import {useSamyakBookTypePostMutation} from '../redux/service/BookTypeService';
import {useSamyakSpecialPackagePostMutation} from '../redux/service/SpecialPackageService';
import {useSamyakAddressPostMutation} from '../redux/service/ManageAddressPostService';
import {useSamyakRelationshipPostMutation} from '../redux/service/RelationshipService';
import {useSamyakBookDayWisePostMutation} from '../redux/service/BookDayWiseService';

const LabScreen = ({navigation}: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showChooseTestView, setShowChooseTestView] = useState(true);
  const [showPreferredOptionView, setShowPreferredOptionView] = useState(false);
  const [showChoosePatientView, setShowChoosePatientView] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [selectedbranch, setSelectedBranch] = useState('RT-MAIN(PORUR)');
  const [setSpecialPackage] = useState([]);
  const [setBoneData] = useState([]);
  const [bookTypeData, setBookTypeData] = useState();
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [cartItems, setCartItems] = useState('');
  const [badgeCount, setBadgeCount] = useState(cartItems.length);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const padZero = (num: any) => (num < 10 ? `0${num}` : `${num}`);
  const [image, setImage] = useState<string>('');

  // api for branch
  const [defaultManageBranchAPIReq, defaultManageBranchAPIRes] =
    useSamyakDefaultBranchPostMutation();

  // api for  bone profile in stepper 1
  const [boneAPIReq, boneAPIRes] = useSamyakLabChooseBonePostMutation();

  // api for bookType in stepper 2
  const [booktypeAPIReq, booktypeAPIRes] = useSamyakBookTypePostMutation();

  //api for special package in stepper 1
  const [specialPackageAPIReq, specialPackageAPIRes] =
    useSamyakSpecialPackagePostMutation();

  //api for show address in stepper 3
  const [getAddressAPIReq, getAddressAPIRes] = useSamyakAddressPostMutation();

  //api for show patient relation in stepper 3
  const [relatioshipAPIReq, relatioshipAPIRes] =
    useSamyakRelationshipPostMutation();

  const [dayWiseApiReq] = useSamyakBookDayWisePostMutation();
  useEffect(() => {
    setShowChooseTestView(currentStep === 1);
    setShowPreferredOptionView(currentStep === 2);
    setShowChoosePatientView(currentStep === 3);
    setShowBookingDetails(currentStep === 4);

    const bookTypeObj = {
      userName: '9849390103',
    };
    if (currentStep === 2) {
      booktypeAPIReq(bookTypeObj);
    }
    if (currentStep === 3) {
      getAddressAPIReq(bookTypeObj);
      relatioshipAPIReq(bookTypeObj);
    }
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const isBookingDetailsVisible = currentStep === 4;

  const handleButtonPress = () => {
    navigation.navigate('UploadDescription');
  };

  const handleSearch = () => {
    navigation.navigate('SearchTest');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleButtonPresssBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  // to display the branch
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
      return () => {};
    }, [defaultManageBranchAPIReq]),
  );

  useEffect(() => {
    if (defaultManageBranchAPIRes?.isSuccess) {
      setSelectedBranch(
        defaultManageBranchAPIRes?.data?.Message[0]?.Branch_Name,
      );
    }
  }, [defaultManageBranchAPIRes]);

  // useEffect for special package
  useEffect(() => {
    const specialPackageObj = {
      userName: '9849390103',
    };
    specialPackageAPIReq(specialPackageObj)
      .unwrap()
      .then(response => {
        if (response.SuccessFlag === 'true') {
          setSpecialPackage(response.Message);
        }
      });
  }, []);

  // useEffect for bone profile
  useEffect(() => {
    const boneObj = {
      userName: '9849390103',
      // Service_Code: 'P00360',
      Service_Code: 'P00082',
    };
    boneAPIReq(boneObj)
      .unwrap()
      .then(response => {
        if (response.SuccessFlag === 'true') {
          setBoneData(response.Message);
        }
      });
  }, []);

  const handleArrowDownPress = () => {
    setIsDataVisible(prevState => !prevState);
  };

  const handleBook = () => {
    if (isInCart) {
      setBadgeCount(prevCount => Math.max(0, prevCount - 1));
    } else {
      setBadgeCount(prevCount => prevCount + 1);
    }
    setIsInCart(prev => !prev);
  };

  const getButtonText = () => {
    return isInCart ? 'Remove from Cart' : 'Add to Cart';
  };

  // useEffect for segmentcontrol index
  useEffect(() => {
    setShowCalendar(false);
    setSelectedIndex('');
  }, [currentStep]);
  useEffect(() => {
    if (booktypeAPIRes?.isSuccess) {
      const typeOfBookingArray = booktypeAPIRes?.data?.Message.map(
        (booking: any) => booking.Type_Of_Booking,
      );
      setBookTypeData(typeOfBookingArray);
    }
  }, [booktypeAPIRes]);

  const handleCartClick = () => {
    if (badgeCount > 0) {
      setModalVisible(true);
    } else {
      Alert.alert('Cart', 'Cart is Empty');
    }
  };

  const handleRemoveItemClick = () => {
    if (badgeCount > 0) {
      setCartItems([]);
      setBadgeCount(0);
    }

    setModalVisible(false);
  };

  const handleAddAddress = () => {
    navigation.navigate('AddAddress');
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem('images');
        if (storedImage) {
          setImage(storedImage);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  const handleDeleteImage = async () => {
    try {
      await AsyncStorage.removeItem('images');
      setImage('');
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <View style={styles.MainContainer}>
      {/* lab Test view */}
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.BookingText}>Lab Test</Text>
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

      {/* location view */}
      <ScrollView>
        <View style={styles.LocationView}>
          <Image
            source={require('../assets/images/location.png')}
            style={styles.LocationImg}
          />
          <Text>{selectedbranch}</Text>
        </View>

        {/* stepper View */}
        <View style={styles.stepperContainer}>
          <View style={styles.stepContainer}>
            <TouchableOpacity
              style={[styles.step, currentStep >= 1 && styles.activeStep]}>
              <Text
                style={[
                  styles.stepText,
                  currentStep === 1 && styles.activeStepText,
                ]}>
                1
              </Text>
            </TouchableOpacity>
            <Text style={styles.stepDescription}>Lab Test</Text>
          </View>

          <View style={styles.stepContainer}>
            <TouchableOpacity
              style={[styles.step, currentStep >= 2 && styles.activeStep]}>
              <Text
                style={[
                  styles.stepText,
                  currentStep === 2 && styles.activeStepText,
                ]}>
                2
              </Text>
            </TouchableOpacity>
            <Text style={styles.stepDescription}>Book</Text>
          </View>

          <View style={styles.stepContainer}>
            <TouchableOpacity
              style={[styles.step, currentStep >= 3 && styles.activeStep]}>
              <Text
                style={[
                  styles.stepText,
                  currentStep === 3 && styles.activeStepText,
                ]}>
                3
              </Text>
            </TouchableOpacity>
            <Text style={styles.stepDescription}>Patient info</Text>
          </View>

          <View style={styles.stepContainer}>
            <TouchableOpacity
              style={[styles.step, currentStep >= 4 && styles.activeStep]}>
              <Text
                style={[
                  styles.stepText,
                  currentStep === 4 && styles.activeStepText,
                ]}>
                4
              </Text>
            </TouchableOpacity>
            <Text style={styles.stepDescription}>Payment</Text>
          </View>
        </View>

        {/* stepper 1 */}
        {showChooseTestView && (
          <View>
            <View style={styles.ChooseTestView}>
              <View>
                <Text style={{fontSize: 20}}>Choose test</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Text
                    style={{
                      right: 20,
                      fontSize: 12,
                      marginTop: 5,
                      color: '#b9c5a0',
                    }}>
                    Cart value
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize: 20, color: '#3478c1'}}>INR 0</Text>
                </View>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={handleSearch}>
                <Image
                  source={require('../assets/images/search.png')}
                  style={styles.searchIcon}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.inputText}
                placeholder="Select Test"
                placeholderTextColor="#b9c5a0"
              />
              <TouchableOpacity onPress={handleCartClick}>
                <Image
                  source={require('../assets/images/addCart.png')}
                  style={styles.CartIcon}
                />
              </TouchableOpacity>
              {badgeCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>{badgeCount}</Text>
                </View>
              )}
              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                      {badgeCount === 0 ? (
                        <View style={styles.emptyCartContainer}>
                          <Text style={styles.emptyCartText}>
                            Cart is Empty
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.testItemContainer}>
                          <Text style={styles.testName}>
                            BONE PROFILE(MINI)
                          </Text>
                          <Text style={styles.testPrice}>INR 1</Text>
                          <TouchableOpacity onPress={handleRemoveItemClick}>
                            <View style={styles.addToCartContainer1}>
                              <Image
                                source={require('../assets/images/addCart.png')}
                                style={styles.CartIcon}
                              />
                              <Text style={styles.addToCartText}>Remove</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}

                      {badgeCount > 0 && (
                        <View style={styles.bottomTextContainer}>
                          <Text style={styles.bottomText}>
                            Total Cart Value INR 0
                          </Text>
                        </View>
                      )}

                      {badgeCount > 0 && (
                        <TouchableOpacity
                          onPress={() => setModalVisible(false)}>
                          <View style={styles.SubmitButtonView}>
                            <Text style={styles.ButtonText}>Proceed</Text>
                          </View>
                        </TouchableOpacity>
                      )}

                      {badgeCount > 0 && (
                        <View style={{marginLeft: 10, marginBottom: 280}}>
                          <Text style={{color: '#fd1a1b'}}>
                            Note:*-Indicates Non Discounted Test
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </Modal>
            </View>

            <View>
              {image !== '' && (
                <View style={styles.imageContainer}>
                  <Image source={{uri: image}} style={styles.imageGallery} />
                  <TouchableOpacity
                    onPress={handleDeleteImage}
                    style={styles.deleteButton}>
                    <Image
                      source={require('../assets/images/black_cross.png')}
                      style={{width: 8, height: 8, tintColor: 'white'}}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View
              style={{
                marginTop: 20,
                width: '60%',
                alignSelf: 'flex-end',
                right: 20,
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleButtonPress}>
                <Image
                  source={require('../assets/images/up_arrow.png')}
                  style={styles.buttonImage}
                />
                <Text style={styles.buttonText}>Upload Prescription</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.PackageOfferText}>Choose Package</Text>

            <View>
              <View style={styles.SquareCard}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 16,
                  }}>
                  <Text>
                    {specialPackageAPIRes?.data?.Message[0]?.Service_Name}
                  </Text>
                  <Text style={{color: '#3478c1', left: 40}}>
                    NPR {specialPackageAPIRes?.data?.Message[0]?.Amount}
                  </Text>
                  <TouchableOpacity onPress={handleArrowDownPress}>
                    <Image
                      source={require('../assets/images/arrowDown.png')}
                      style={{tintColor: 'black', width: 15, height: 15}}
                    />
                  </TouchableOpacity>
                </View>
                {isDataVisible && (
                  <View style={{left: 20}}>
                    <TouchableOpacity onPress={handleBook}>
                      <View
                        style={{
                          backgroundColor: 'blue',
                          padding: 8,
                          width: 200,
                          borderRadius: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: 'white',
                            alignSelf: 'center',
                          }}>
                          {getButtonText()}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {boneAPIRes?.isSuccess &&
                      boneAPIRes?.data?.Code === 200 &&
                      boneAPIRes?.data?.Message &&
                      boneAPIRes?.data?.Message[0]?.Service_Detail?.map(
                        (item: any) => (
                          <Text
                            style={{marginTop: 10, fontSize: 14}}
                            key={item.Test_Code}>
                            {item.Test_Name}
                          </Text>
                        ),
                      )}
                  </View>
                )}
              </View>
            </View>

            <View
              style={{
                marginTop: 10,
                alignSelf: 'flex-end',
                right: 30,
              }}>
              <TouchableOpacity style={styles.buttons} onPress={handleNext}>
                <Text style={styles.buttonTexts}>Next</Text>
                <Image
                  source={require('../assets/images/nextArrow.png')}
                  style={styles.buttonImages}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* stepper 2 */}
        {showPreferredOptionView && (
          <View>
            <View style={styles.PreferredOptionView}>
              <Text style={{fontSize: 20}}>Preferred Option</Text>
            </View>

            <View>
              <SegmentedControlTab
                values={bookTypeData}
                selectedIndex={selectedIndex}
                onTabPress={index => {
                  setSelectedIndex(index);
                  setShowCalendar(true);
                }}
                tabsContainerStyle={styles.tabContainer}
                tabStyle={styles.tabStyle}
                activeTabStyle={
                  (selectedIndex === 0 || selectedIndex === 1) &&
                  styles.activeTabStyle
                }
                tabTextStyle={styles.tabTextStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
              />
            </View>

            {selectedIndex === '' && (
              <View>
                <View style={{left: 20, marginTop: 10}}>
                  <Text>Test in Cart</Text>
                </View>

                <View style={styles.LipidView}>
                  <Text style={{color: '#676767'}}>BONE PROFILE(MINI)</Text>
                  <Text style={{color: '#696969'}}>INR 1.00</Text>
                </View>

                <View style={styles.AmoutPayableView}>
                  <Text style={{color: '#3a5ba1'}}>Sub Total</Text>
                  <Text style={{color: '#6c6c6c'}}>INR 1.00</Text>
                </View>

                <View
                  style={{
                    left: 20,
                    alignSelf: 'flex-start',
                  }}>
                  <TouchableOpacity
                    style={styles.buttons}
                    onPress={handleButtonPresssBack}>
                    <Image
                      source={require('../assets/images/backArrowBlack.png')}
                      style={styles.buttonImages}
                    />
                    <Text style={styles.buttonTexts}>Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {showCalendar && (
              <View>
                <View style={{marginTop: 15, marginLeft: 15}}>
                  <Text style={{fontSize: 18, fontWeight: '300'}}>
                    Choose date and time
                  </Text>
                </View>

                <View style={styles.inputContainer1}>
                  <TextInput
                    style={styles.inputText1}
                    value={selectedDate}
                    placeholder="Select Date"
                    placeholderTextColor="#b9c5a0"
                    editable={true}
                    onChangeText={() => {}}
                  />
                  <TouchableOpacity onPress={handleCalendarToggle}>
                    <Image
                      source={require('../assets/images/calender.png')}
                      style={styles.CalenderIcon}
                    />
                  </TouchableOpacity>
                </View>

                {showCalendar && (
                  <Calendar
                    onDayPress={day => {
                      const formattedDate = `${day.year}/${padZero(
                        day.month,
                      )}/${padZero(day.day)}`;
                      setSelectedDate(formattedDate);
                      // setShowCalendar(false);
                      dayWiseApiReq({
                        userName: '9849390103',
                        Type_Of_Booking: selectedIndex === 0 ? 'H' : 'W',
                        Date_Of_Booking: formattedDate,
                      });
                    }}
                    theme={{
                      backgroundColor: '#ffffff',
                      calendarBackground: '#ffffff',
                      textSectionTitleColor: '#b6c1cd',
                      selectedDayBackgroundColor: '#00adf5',
                      selectedDayTextColor: '#ffffff',
                      todayTextColor: '#00adf5',
                      dayTextColor: '#2d4150',
                      textDisabledColor: '#d9e',
                    }}
                  />
                )}
                {console.log(selectedIndex)}
                <View style={styles.BackNextButtonView}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={handlePrev}>
                    <Image
                      source={require('../assets/images/backArrowBlack.png')}
                      style={styles.buttonImagess}
                    />
                    <Text style={styles.buttonTexts}>Back</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}>
                    <Text style={styles.buttonTexts}>Next</Text>
                    <Image
                      source={require('../assets/images/nextArrow.png')}
                      style={styles.buttonImagesss}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {/* stepper 3 */}
        {showChoosePatientView && (
          <View style={{backgroundColor: '#ffffff'}}>
            <View style={styles.ChoosePatientView}>
              <Text style={{fontSize: 20}}>Choose Patient</Text>
              <TouchableOpacity>
                <Text style={{color: '#0f97f5', fontSize: 20}}>Add</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row'}}>
                {relatioshipAPIRes?.isSuccess &&
                  relatioshipAPIRes?.data?.Message?.map((item: any) => {
                    return (
                      <View
                        style={{...styles.ImgView, marginLeft: 10}}
                        key={item?.RelationShip_Id}>
                        <Image
                          source={require('../assets/images/human.png')}
                          style={styles.ImgStyle}
                        />
                        <Text style={{left: 10, alignSelf: 'center'}}>
                          {item?.RelationShip_Desc}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            </ScrollView>

            <View style={styles.ChooseAddressView}>
              <Text style={{fontSize: 20}}>Choose Address</Text>
              <TouchableOpacity onPress={handleAddAddress}>
                <Text style={{color: '#0f97f5', fontSize: 20}}>Add</Text>
              </TouchableOpacity>
            </View>

            {getAddressAPIRes?.isSuccess &&
              getAddressAPIRes?.data?.Message[0]?.User_Address?.map(
                (item: any) => {
                  return (
                    <View style={styles.AddressView}>
                      <Text>{item?.Address_Type_Desc}</Text>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                        }}>
                        <Text style={{flex: 1}}>{item?.Full_Address}</Text>
                        <TouchableOpacity>
                          <View style={styles.DotView} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                },
              )}

            <View style={styles.BackNextButtonView}>
              <TouchableOpacity style={styles.backButton} onPress={handlePrev}>
                <Image
                  source={require('../assets/images/backArrowBlack.png')}
                  style={styles.buttonImagess}
                />
                <Text style={styles.buttonTexts}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.buttonTexts}>Next</Text>
                <Image
                  source={require('../assets/images/nextArrow.png')}
                  style={styles.buttonImagesss}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* stepper 4 */}
        {showBookingDetails && isBookingDetailsVisible && (
          <View style={{backgroundColor: '#fbfbfb'}}>
            <View style={{marginTop: 15, paddingHorizontal: 10}}>
              <Text style={{fontSize: 18}}>Booking Details</Text>
            </View>
            <View style={styles.AddressViewDetails}>
              <Text style={{color: '#676767', fontWeight: 'bold'}}>
                MR.RAMANI
              </Text>
              <Text style={{marginTop: 10, color: '#6a6a6a'}}>
                2/21, Rajeswari Nagar, Porur, Chennai, Tamil Nadu, 60016
              </Text>
              <Text style={{marginTop: 10, color: '#6a6a6a'}}>7358722588</Text>
            </View>

            <View style={styles.HomeView}>
              <Text style={{color: '#676767'}}>HOME</Text>
              <View style={{left: 50}}>
                <Text style={{color: '#676767'}}>11/08/2023</Text>
              </View>
              <Text style={{color: '#676767'}}>12.00PM</Text>
            </View>

            <View style={{paddingHorizontal: 10, marginTop: 20}}>
              <Text style={{fontSize: 18, color: '#9d9d9d'}}>Voucher Code</Text>
            </View>

            <View style={styles.inputContainer2}>
              <TextInput
                style={styles.input}
                placeholder="Enter Voucher Code"
                placeholderTextColor={'#7a7a7a'}
                onChangeText={setVoucherCode}
                value={voucherCode}
              />
              <View style={styles.ChooseView}>
                <TouchableOpacity>
                  <Text style={{color: 'white'}}>Choose</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{paddingHorizontal: 10, marginTop: 20}}>
              <Text style={{fontSize: 18, color: '#9d9d9d'}}>Payment Mode</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <View style={styles.OnlinePaymentView}>
                <TouchableOpacity onPress={() => setPaymentMethod('online')}>
                  <View
                    style={[
                      styles.radioButtonContainer,
                      {
                        backgroundColor:
                          paymentMethod === 'online' ? 'red' : 'transparent',
                      },
                    ]}>
                    <RadioButton
                      value="online"
                      status={
                        paymentMethod === 'online' ? 'checked' : 'unchecked'
                      }
                      onPress={() => setPaymentMethod('online')}
                      color="yellow"
                    />
                  </View>
                </TouchableOpacity>
                <Text style={{left: 10}}>Online Payment</Text>
              </View>

              <View style={styles.OnlinePaymentView}>
                <TouchableOpacity onPress={() => setPaymentMethod('cash')}>
                  <View
                    style={[
                      styles.radioButtonContainer,
                      {
                        backgroundColor:
                          paymentMethod === 'cash' ? 'yellow' : 'transparent',
                      },
                    ]}>
                    <RadioButton
                      value="cash"
                      status={
                        paymentMethod === 'cash' ? 'checked' : 'unchecked'
                      }
                      onPress={() => setPaymentMethod('cash')}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
                <Text style={{left: 10}}>Cash Payment</Text>
              </View>
            </View>

            <View style={styles.BackNextButtonView}>
              <TouchableOpacity style={styles.backButton} onPress={handlePrev}>
                <Image
                  source={require('../assets/images/backArrowBlack.png')}
                  style={styles.buttonImagess}
                />
                <Text style={styles.buttonTexts}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.buttonTexts}>Next</Text>
                <Image
                  source={require('../assets/images/nextArrow.png')}
                  style={styles.buttonImagesss}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LabScreen;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#fafbfb',
    flex: 1,
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
    marginTop: 5,
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
    marginTop: 10,
    alignSelf: 'flex-end',
    right: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  LocationImg: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    padding: 20,
    backgroundColor: '#f3f3f3',
  },
  stepContainer: {
    alignItems: 'center',
  },
  step: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  stepText: {
    fontSize: 16,
  },
  activeStep: {
    backgroundColor: '#666666',
  },
  activeStepText: {
    color: 'white',
  },
  stepDescription: {
    marginTop: 5,
  },

  ChooseTestView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  inputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#eaeaea',
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'grey',
    // marginTop: 15,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: 'black',
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingVertical: 5,
  },
  inputText1: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  CartIcon: {
    width: 25,
    height: 25,
    tintColor: 'black',
  },
  CalenderIcon: {
    width: 30,
    height: 30,
    tintColor: 'black',
    right: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8ecf2',
    borderRadius: 30,
    padding: 20,
  },
  buttonImage: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: '#2e5b9e',
  },
  buttonText: {
    color: '#2c579f',
    fontSize: 16,
  },
  PackageOfferText: {
    fontSize: 20,
    marginLeft: 20,
    color: 'black',
    marginTop: 30,
  },
  SquareCard: {
    width: '90%',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    marginTop: 10,
    borderColor: '#eaeaea',
    borderRadius: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#676767',
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
  },
  buttonImages: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  buttonImagess: {
    width: 16,
    height: 16,
    tintColor: 'white',
    right: 15,
  },
  buttonImagesss: {
    width: 16,
    height: 16,
    tintColor: 'white',
    left: 15,
  },
  buttonTexts: {
    color: 'white',
    fontSize: 20,
  },
  PreferredOptionView: {
    left: 20,
    marginTop: 20,
  },
  tabContainer: {
    height: 45,
    width: 200,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: 'grey',
    marginLeft: 15,
  },
  tabStyle: {
    borderWidth: 0,
    borderEndWidth: 0,
  },
  activeTabStyle: {
    backgroundColor: '#005dab',
  },
  tabTextStyle: {
    color: 'black',
    fontWeight: 'normal',
  },
  activeTabTextStyle: {
    color: 'white',

    fontWeight: 'bold',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 2,
  },
  circleText: {
    color: 'black',
    fontSize: 10,
  },
  calendarContainer: {
    marginTop: 10,
    padding: 5,
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#676767',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#676767',
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },

  //choose Patient stepper 3
  ChoosePatientView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  ImgView: {
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 30,
    padding: 10,
  },
  ImgStyle: {
    backgroundColor: '#d0555e',
    borderRadius: 50,
    width: 30,
    height: 30,
  },
  ChooseAddressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  AddressView: {
    backgroundColor: '#f7f7f7',
    padding: 20,
    paddingVertical: 30,
    margin: 10,
    marginTop: 20,
  },
  BackNextButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  DotView: {
    backgroundColor: 'white',
    width: 15,
    height: 15,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#acacac',
  },

  //Booking Details stepper 4
  AddressViewDetails: {
    backgroundColor: '#f7f7f7',
    padding: 20,
    paddingVertical: 20,
    margin: 10,
    marginTop: 20,
  },
  HomeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    padding: 15,
    backgroundColor: 'white',
    margin: 10,
    marginTop: -15,
  },
  inputContainer2: {
    flexDirection: 'row',
    backgroundColor: '#c5c5c5',
    borderRadius: 50,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    padding: 20,
  },
  ChooseView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#58afff',
    paddingHorizontal: 20,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 226,
  },
  OnlinePaymentView: {
    marginTop: 10,
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 150,
    borderRadius: 10,
    borderColor: '#cdcdcd',
  },
  radioButtonContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'blue',
    borderWidth: 6,
    backgroundColor: 'white',
  },
  DotViewOnline: {
    backgroundColor: 'white',
    width: 15,
    height: 15,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#58afff',
  },
  notificationBadge: {
    position: 'absolute',
    top: 3,
    right: 20,
    width: 20,
    height: 20,
  },

  notificationBadgeText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  LipidView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
    padding: 15,
    margin: 20,
  },
  AmoutPayableView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    margin: 20,
    paddingVertical: 20,
    padding: 15,
    marginTop: -25,
  },
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomTextContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  bottomText: {
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center',
  },
  SubmitButtonView: {
    backgroundColor: '#58afff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 20,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  testItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testName: {
    width: '40%',
    color: '#686868',
  },
  testPrice: {
    width: '20%',
    fontWeight: 'bold',
  },

  addToCartText: {
    marginLeft: 1,
  },
  addToCartContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#bcc0c7',
    margin: 10,
    borderRadius: 5,
  },
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
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
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
