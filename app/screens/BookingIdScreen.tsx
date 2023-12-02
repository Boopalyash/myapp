import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {Rating} from 'react-native-ratings';
import {useSamyakDefaultBranchPostMutation} from '../redux/service/DefaultBranchService';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSamyakReviewPostMutation} from '../redux/service/ReviewService';
import {useSamyakRatingPostMutation} from '../redux/service/RatingService';

const BookingIdScreen = ({navigation}: any) => {
  const route = useRoute();
  const userDetails = route.params;
  const [selectedbranch, setSelectedBranch] = useState('RT-MAIN(PORUR)');
  const [setReview] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [userRating, setUserRating] = useState(0);

  // to display the branch
  const [defaultManageBranchAPIReq, defaultManageBranchAPIRes] =
    useSamyakDefaultBranchPostMutation();

  // to display the review
  const [reviewAPIReq, reviewAPIRes] = useSamyakReviewPostMutation();

  // to display the ratings
  const [ratingAPIReq, ratingAPIRes] = useSamyakRatingPostMutation();

  const handleButtonPresss = () => {
    navigation.navigate('Bookings');
  };

  const formattedBookingDate = moment(
    userDetails?.userDetails?.Booking_Date,
    'YYYY/MM/DD',
  );

  const dayOfWeek = formattedBookingDate.format('dddd');

  const formattedBookingTime = moment(
    userDetails?.userDetails?.Booking_Time,
    'h:mmA',
  ).format('hh:mm A');

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

  // to display review
  const handlePostReview = () => {
    const reviewData = {
      userName: '9849390103',
      Post_Review: reviewText,
      Booking_Type: 'W',
      Booking_No: userDetails?.userDetails?.Booking_No,
      Firm_No: '01',
      Booking_Date: formattedBookingDate.format('YYYY/MM/DD'),
    };
    reviewAPIReq(reviewData);
  };

  // to display rating
  // const handleRatingCompleted = (rating: number) => {
  //   setUserRating(rating);
  //   saveRatingToAsyncStorage(rating);
  // };

  const saveRatingToAsyncStorage = async (bookingId, rating) => {
    try {
      await AsyncStorage.setItem(`userRating_${bookingId}`, rating.toString());
    } catch (error) {
      console.log('Error saving rating to AsyncStorage:', error);
    }
  };

  const getRatingFromAsyncStorage = async bookingId => {
    try {
      const storedRating = await AsyncStorage.getItem(
        `userRating_${bookingId}`,
      );
      if (storedRating !== null) {
        setUserRating(parseFloat(storedRating));
      }
    } catch (error) {
      console.log('Error retrieving rating from AsyncStorage:', error);
    }
  };

  const handleRatingCompleted = (rating: number) => {
    setUserRating(rating);
    saveRatingToAsyncStorage(userDetails?.userDetails?.Booking_No, rating);
  };

  // Use effect to fetch and set the rating from AsyncStorage when the component mounts
  useEffect(() => {
    const bookingId = userDetails?.userDetails?.Booking_No;
    if (bookingId) {
      getRatingFromAsyncStorage(bookingId);
    }
  }, []);

  const handlePostRating = async () => {
    if (userRating === 0) {
      Alert.alert('Error', 'Please select a rating before submitting.', [
        {text: 'OK'},
      ]);
    } else {
      const ratingData = {
        userName: '9849390103',
        Booking_Type: 'H',
        Booking_No: userDetails?.userDetails?.Booking_No,
        Firm_No: '01',
        Booking_Date: formattedBookingDate.format('YYYY/MM/DD'),
        Rating_Type: 'P',
        Rating_No: userRating.toString(),
      };
      ratingAPIReq(ratingData);
    }
  };
  useEffect(() => {
    if (ratingAPIRes?.isSuccess && ratingAPIRes?.data?.Code === 200) {
      Alert.alert('Success', ratingAPIRes?.data?.Message[0]?.Message, [
        {text: 'OK'},
      ]);
    } else if (ratingAPIRes?.isError) {
      Alert.alert('Error', 'Failed to update rating', [{text: 'OK'}]);
    }
  }, [ratingAPIRes]);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.BookingText}>
            Booking ID: {userDetails?.userDetails?.Booking_No}
          </Text>
          <View style={styles.imageRow}>
            <Image
              source={require('../assets/images/alarm.png')}
              style={styles.image}
            />
            <Image
              source={require('../assets/images/bellwhite.png')}
              style={styles.image}
            />
            <TouchableOpacity>
              <View style={styles.Circle}>
                <Text style={styles.CircleText}>RA</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.LocationView}>
          <Image
            source={require('../assets/images/location.png')}
            style={styles.LocationImg}
          />
          <Text>{selectedbranch}</Text>
        </View>

        <View style={{left: 20}}>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
              color: '#797979',
              fontWeight: 'bold',
            }}>
            Booking Type: {userDetails?.userDetails?.Booking_Type_Desc}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
              color: '#797979',
              fontWeight: 'bold',
            }}>
            Booking ID: {userDetails?.userDetails?.Booking_No}
          </Text>
          <Text style={{fontSize: 14, color: '#797979'}}>
            {dayOfWeek}, {formattedBookingDate.format('MMMM D YYYY')},
            {formattedBookingTime}
          </Text>
        </View>

        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>RA</Text>
          </View>
          <View style={{left: 25}}>
            <Text style={{fontSize: 18, marginBottom: 10, color: '#7d7d7d'}}>
              {userDetails?.userDetails?.Pt_Name},
              {userDetails?.userDetails?.Pt_First_Age}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/images/gender.png')}
                style={{width: 35, height: 30}}
              />
              <Text style={{left: 20, fontSize: 20, color: '#797979'}}>
                {userDetails?.userDetails?.Pt_Gender}
              </Text>
              <Image
                source={require('../assets/images/mobile.png')}
                style={{width: 30, height: 30, left: 40}}
              />
            </View>
          </View>
        </View>

        <View style={styles.PaymentCashView}>
          <Text style={{fontSize: 18, color: 'white'}}>
            Payment to be done by cash
          </Text>
        </View>

        <View style={styles.AllocatedView}>
          <Text style={{fontSize: 18, color: 'white'}}>
            {userDetails?.userDetails?.Booking_Status_Desc}
          </Text>
        </View>

        <View style={styles.LipidView}>
          <Text style={{color: '#676767'}}>LIPID PROFILE</Text>
          <Text style={{color: '#696969'}}>
            INR {userDetails?.userDetails?.Due_Amount}
          </Text>
        </View>

        <View style={styles.AmoutPayableView}>
          <Text style={{color: '#3a5ba1'}}>Amount Payable</Text>
          <Text style={{color: '#6c6c6c'}}>
            INR {userDetails?.userDetails?.Due_Amount}
          </Text>
        </View>

        <View style={styles.Star}>
          <Text style={{color: '#696969', alignSelf: 'center'}}>
            How would you like to rate the phlebotomist?
          </Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={20}
            showRating
            startingValue={userRating}
            onFinishRating={handleRatingCompleted}
          />
          <TouchableOpacity onPress={handlePostRating}>
            <View style={styles.RatingView}>
              <Text style={{color: 'black', top: 5, alignSelf: 'center'}}>
                Submit Rating
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.outerView}>
          <Text style={{left: 10, fontWeight: 'bold'}}>Post your review</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.innerView}>
              <TextInput
                style={styles.input}
                placeholder="Write your review here"
                multiline
                value={reviewText}
                onChangeText={text => setReviewText(text)}
              />
            </View>
            <TouchableOpacity onPress={handlePostReview}>
              <View style={styles.PostView}>
                <Text style={{color: 'black'}}>Post</Text>
              </View>
            </TouchableOpacity>
          </View>

          {reviewAPIRes?.isSuccess && reviewAPIRes?.data?.Code === 200 && (
            <View>
              {reviewAPIRes?.data?.Message?.map((item: any, index: number) => (
                <Text style={{marginTop: 10, fontSize: 14}} key={index}>
                  {item.Message}
                </Text>
              ))}
            </View>
          )}
          {setReview.map((reviewMessage, index) => (
            <Text style={{marginTop: 10, fontSize: 14}} key={index}>
              {reviewMessage}
            </Text>
          ))}
        </View>

        <View
          style={{
            left: 20,
            alignSelf: 'flex-start',
          }}>
          <TouchableOpacity style={styles.buttons} onPress={handleButtonPresss}>
            <Image
              source={require('../assets/images/backArrowBlack.png')}
              style={styles.buttonImages}
            />
            <Text style={styles.buttonTexts}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#ffffff',
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
    width: 25,
    height: 25,
    marginLeft: 20,
    marginTop: 3,
  },
  LocationView: {
    flexDirection: 'row',
    marginTop: 20,
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
  circleContainer: {
    left: 20,
    marginTop: 20,
    flexDirection: 'row',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  circleText: {
    color: 'black',
    fontSize: 16,
  },
  PaymentCashView: {
    alignSelf: 'center',
    marginTop: 5,
    backgroundColor: '#5aa218',
    padding: 4,
    borderRadius: 10,
  },
  AllocatedView: {
    alignSelf: 'center',
    marginTop: 5,
    backgroundColor: '#f2b94b',
    padding: 4,
    borderRadius: 10,
  },
  LipidView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
    padding: 10,
    margin: 15,
  },
  Star: {
    backgroundColor: '#f7f7f7',
    padding: 10,
    margin: 15,
  },
  AmoutPayableView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    margin: 15,
    paddingVertical: 10,
    padding: 10,
    marginTop: -20,
  },
  outerView: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    margin: 15,
  },
  innerView: {
    padding: 5,
    borderRadius: 10,
  },
  input: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  PostView: {
    backgroundColor: '#dddbdb',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    left: 5,
  },
  RatingView: {
    backgroundColor: '#dddbdb',
    height: 30,
    marginTop: 10,
    borderRadius: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#676767',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },

  buttonImages: {
    width: 20,
    height: 20,
    tintColor: 'white',
    right: 10,
  },
  buttonTexts: {
    color: 'white',
    fontSize: 20,
  },
  Circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  CircleText: {
    color: 'black',
    fontSize: 10,
  },
  scrollViewContainer: {
    flex: 1,
  },
});

export default BookingIdScreen;
