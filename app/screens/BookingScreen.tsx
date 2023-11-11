// imports
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/Store';
import moment from 'moment';
// components and utilities
import {useSamyakBookingListPostMutation} from '../redux/service/BookingListPostService';

const BookingScreen = ({navigation}: any) => {
  const route = useRoute();
  const userDetails = route.params;
  const dispatch = useDispatch();

  // API functions
  const [bookingAPIReq] = useSamyakBookingListPostMutation();

  const handlePaynow = (dueAmount: number) => {
    navigation.navigate('Wallet', {dueAmount});
  };

  useEffect(() => {
    bookingAPIReq(userDetails);
  }, [userDetails, bookingAPIReq, dispatch]);

  const bookingData = useSelector(
    (state: RootState) => state.bookingList.samyakDetailsBookingListPost,
  );

  const CardItem = ({item}: any) => {
    const formattedBookingDate = moment(item.Booking_Date, 'YYYY/MM/DD').format(
      'MMMM',
    );
    const formattedBookingDateAndYear = moment(
      item.Booking_Date,
      'YYYY/MM/DD',
    ).format('D, YYYY');
    const formattedBookingTime = moment(item.Booking_Time, 'h:mmA').format(
      'hh:mm A',
    );

    // Card render
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BookingId', {userDetails: item});
        }}>
        <View
          style={[
            styles.CardContainer,
            {backgroundColor: item.BookingType_ColorCode},
          ]}>
          <View style={styles.Column1}>
            <Text style={styles.CardTextFrontMonth}>
              {formattedBookingDate}
            </Text>
            <Text style={styles.CardTextFrontDate}>
              {formattedBookingDateAndYear}
            </Text>
            <View style={styles.TimeView}>
              <Text style={styles.CardTextFrontTime}>
                {formattedBookingTime}
              </Text>
            </View>
          </View>
          <View style={styles.Column2}>
            <Text style={styles.CardTextName}>{item.Pt_Name}</Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  source={require('../assets/images/booking_id_img.png')}
                  style={styles.BookIdImg}
                />
              </View>
              <View>
                <Text style={styles.CardTextNumber}>{item.Booking_No}</Text>
              </View>
            </View>

            <View style={styles.ButtonView}>
              <Text style={styles.ButtonCollection}>
                {item.Booking_Status_Desc}
              </Text>
            </View>
          </View>
          <View style={styles.Column3}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  source={require('../assets/images/location.png')}
                  style={styles.LocationImg}
                />
              </View>
              <View>
                <Text style={styles.PlaceText}>{item.Place}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              {item.Paid_Amount === 0.0 ? ( // Check if Paid_Amount is 0.0
                <TouchableOpacity onPress={() => handlePaynow(item.Due_Amount)}>
                  <View style={styles.ButtonPayNowView}>
                    <Text style={styles.ButtonPayNow}>Pay Now</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <></> // Render nothing if Paid_Amount is not 0.0
              )}
              <View style={styles.NextArrowContainer}>
                <Image
                  source={require('../assets/images/nextArrow.png')}
                  style={styles.NextArrowImg}
                />
              </View>
            </View>

            <View style={styles.PhoneView}>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <TouchableOpacity>
                    <Image
                      source={require('../assets/images/callIcon.png')}
                      style={styles.callIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.PhoneNumber}>{item.Pt_Mobile_No}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Main render
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.BookingText}>Bookings</Text>
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
              <View style={styles.circle}>
                <Text style={styles.circleText}>RA</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          data={bookingData[0]?.Booking_Detail}
          keyExtractor={item => item.Booking_No}
          renderItem={({item}) => <CardItem item={item} />}
          ListEmptyComponent={() => {
            return (
              <View style={{alignSelf: 'center'}}>
                <Text>No Data Found</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  text: {
    fontSize: 20,
    color: 'black',
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
  CardContainer: {
    marginVertical: 10,
    borderRadius: 30,
    alignSelf: 'center',
    width: '90%',
    height: 130,
    flexDirection: 'row',
  },
  mapImage: {
    width: 20,
    height: 20,
  },
  Column1: {
    flexDirection: 'column',
    backgroundColor: '#3c3636',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'space-between',
    padding: 10,
  },
  Column2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    width: '38%',
  },
  Column3: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    width: '38%',
  },
  CardTextFrontMonth: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  CardTextFrontDate: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  CardTextFrontTime: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  TimeView: {
    backgroundColor: '#676767',
  },
  CardTextName: {
    // fontSize: 16,
  },
  CardTextNumber: {
    fontSize: 14,
    left: 10,
    color: '#8c8c8c',
  },
  ButtonView: {
    backgroundColor: '#f8c55c',
    padding: 6,
    borderRadius: 30,
  },
  ButtonCollection: {
    fontSize: 10,
    color: 'white',
    alignSelf: 'center',
  },
  BookIdImg: {
    width: 15,
    height: 15,
  },
  LocationImg: {
    width: 22,
    height: 22,
  },
  ButtonPayNowView: {
    backgroundColor: '#0f73ca',
    padding: 6,
    borderRadius: 5,
  },
  ButtonPayNow: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 12,
  },
  NextArrowContainer: {
    width: 22,
    alignItems: 'flex-end',
    flex: 1,
  },
  NextArrowImg: {
    tintColor: 'black',
  },
  PlaceText: {
    left: 5,
    color: 'red',
  },
  PhoneView: {
    width: 100,
    backgroundColor: '#bbbbbb',
    borderRadius: 25,
    justifyContent: 'center',
  },
  callIcon: {
    backgroundColor: '#676767',
    borderRadius: 50,
    padding: 12,
    tintColor: 'white',
  },
  PhoneNumber: {
    fontSize: 10,
    left: 5,
    top: 5,
    color: 'white',
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
  Row1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  Row2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  Row3: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
});

export default BookingScreen;

// <TouchableOpacity onPress={handleCard}>
//   <View style={styles.CardContainer}>
//     <View style={styles.Row1}>
//       <Text style={styles.CardTextFrontMonth}>{item.Booking_Date}</Text>
//       <Text style={styles.CardTextName}>{item.Pt_Name}</Text>
//       <View style={{flexDirection: 'row'}}>
//         <View>
//           <Image
//             source={require('../assets/images/location.png')}
//             style={styles.LocationImg}
//           />
//         </View>
//         <View>
//           <Text style={styles.PlaceText}>{item.Place}</Text>
//         </View>
//       </View>
//     </View>
//     <View style={styles.Row2}>
//       <Text style={styles.CardTextFrontMonth}>{item.Booking_Date}</Text>
//       <View style={{flexDirection: 'row'}}>
//         <View>
//           <Image
//             source={require('../assets/images/booking_id_img.png')}
//             style={styles.BookIdImg}
//           />
//         </View>
//         <View>
//           <Text style={styles.CardTextNumber}>{item.Booking_No}</Text>
//         </View>
//         <View style={{flexDirection: 'row'}}>
//           <TouchableOpacity onPress={handlePaynow}>
//             <View style={styles.ButtonPayNowView}>
//               <Text style={styles.ButtonPayNow}>Pay Now</Text>
//             </View>
//           </TouchableOpacity>
//           <View>
//             <Image
//               source={require('../assets/images/nextArrow.png')}
//               style={styles.NextArrowImg}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//     <View style={styles.Row3}>
//       <View style={styles.TimeView}>
//         <Text style={styles.CardTextFrontTime}>{item.Booking_Time}</Text>
//       </View>
//       <View style={styles.ButtonView}>
//         <Text style={styles.ButtonCollection}>{item.Report_Status}</Text>
//       </View>
//       <View style={styles.PhoneView}>
//         <View style={{flexDirection: 'row'}}>
//           <View>
//             <TouchableOpacity>
//               <Image
//                 source={require('../assets/images/callIcon.png')}
//                 style={styles.callIcon}
//               />
//             </TouchableOpacity>
//           </View>
//           <View>
//             <Text style={styles.PhoneNumber}>{item.Pt_Mobile_No}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   </View>
// </TouchableOpacity>
