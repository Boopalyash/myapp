import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
} from 'react-native';

const WalletScreen = ({navigation, route}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {dueAmount} = route.params;

  const handlePaymentLink = (paymentUrl: string) => {
    Linking.openURL(paymentUrl).catch(err =>
      console.error('Failed to open URL: ', err),
    );
  };

  const handleLeftChevron = () => {
    setIsModalVisible(true);
  };

  const closeModal = (shouldNavigate: boolean) => {
    setIsModalVisible(false);
    if (shouldNavigate) {
      navigation.navigate('PaymentFailure');
    }
  };

  const handleScanner = () => {
    navigation.navigate('Scanner');
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={handleLeftChevron}>
        <Image
          source={require('../assets/images/left_chevron.png')}
          style={styles.Left_chevron}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => closeModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Cancel Payment</Text>
            <Text style={{fontSize: 12, color: 'blue'}}>
              Do you really want to cancel the payment. Are you sure?
            </Text>
            <View style={styles.buttonContainer1}>
              <TouchableOpacity
                onPress={() => closeModal(false)}
                style={styles.button}>
                <Text style={styles.buttonText1}>NO</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => closeModal(true)}
                style={styles.button}>
                <Text style={styles.buttonText1}>YES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.PaypalContainer}>
        <View style={styles.RowContainer}>
          <Image
            source={require('../assets/images/paypal.png')}
            style={styles.PaypalImg}
          />
          <View style={styles.TextColumn}>
            <Text style={styles.PayText}>pay</Text>
            <Text style={styles.AmountText}>$ {dueAmount}.00</Text>
          </View>
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={handleScanner}>
            <Text style={styles.ButtonText}>View Details</Text>
            <Image
              source={require('../assets/images/addCart.png')}
              style={styles.ButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.CardContainer}>
        <Text style={styles.PaymentOptiontext}>PAYMENT OPTIONS</Text>

        <View style={styles.CreditCardView}>
          <View style={styles.CreditCardRowView}>
            <Image
              source={require('../assets/images/creditCard.png')}
              style={styles.CreditCardImg}
            />
            <View style={styles.TextColumn}>
              <Text style={styles.CreditText1}>Cards (credit/debit)</Text>
              <Text style={styles.DebitText1}>
                pay using credit or debit card
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handlePaymentLink('https://indianbank.in/en/')}>
              <Image
                source={require('../assets/images/nextArrow.png')}
                style={styles.NextArrowIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.CreditCardView}>
          <View style={styles.CreditCardRowView}>
            <Image
              source={require('../assets/images/netBanking.png')}
              style={styles.CreditCardImg}
            />
            <View style={styles.TextColumn}>
              <Text style={styles.CreditText2}>Net Banking</Text>
              <Text style={styles.DebitText2}>
                pay using any of 40+ supported banks
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                handlePaymentLink(
                  'https://sandbox.paymentgateway.com/netbanking/pay',
                )
              }>
              <Image
                source={require('../assets/images/nextArrow.png')}
                style={styles.NextArrowIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.CreditCardView}>
          <View style={styles.CreditCardRowView}>
            <Image
              source={require('../assets/images/upi.png')}
              style={styles.CreditCardImg}
            />
            <View style={styles.TextColumn}>
              <Text style={styles.CreditText3}>UPI</Text>
              <Text style={styles.DebitText3}>
                pay using your UPI or VPA from any bank
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handlePaymentLink('https://www.bhimupi.org.in')}>
              <Image
                source={require('../assets/images/nextArrow.png')}
                style={styles.NextArrowIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.CreditCardView}>
          <View style={styles.CreditCardRowView}>
            <Image
              source={require('../assets/images/wallet.png')}
              style={styles.CreditCardImg}
            />
            <View style={styles.TextColumn}>
              <Text style={styles.CreditText4}>Wallets</Text>
              <Text style={styles.DebitText4}>
                phonePe,Paytm,YES PAY Wallet and more
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handlePaymentLink('https://paytm.com')}>
              <Image
                source={require('../assets/images/nextArrow.png')}
                style={styles.NextArrowIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default WalletScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#25272c',
  },
  Left_chevron: {
    width: 10,
    height: 10,
    tintColor: 'white',
    top: 50,
    left: 25,
  },
  PaypalContainer: {
    marginTop: 80,
    left: 20,
  },
  RowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextColumn: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  PayText: {
    color: 'white',
    fontSize: 16,
  },
  AmountText: {
    color: 'white',
    fontSize: 30,
  },
  PaypalImg: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  ButtonContainer: {
    flexDirection: 'row',
    backgroundColor: '#515256',
    borderRadius: 6,
    padding: 6,
    marginLeft: 40,
  },
  ButtonIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
    tintColor: 'white',
    alignSelf: 'center',
  },
  ButtonText: {
    color: 'white',
    fontSize: 14,
  },
  CardContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
  },
  PaymentOptiontext: {
    fontSize: 14,
    color: '#8f9dbd',
  },
  CreditCardView: {
    marginTop: 30,
  },
  CreditCardRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  CreditCardImg: {
    width: 30,
    height: 30,
  },
  CreditText: {
    color: 'black',
    fontSize: 20,
  },
  DebitText: {
    color: '#8f9dbd',
    fontSize: 14,
    marginTop: 5,
  },
  NextArrowIcon: {
    tintColor: '#c7c8cb',
    width: 16,
    height: 16,
  },
  CreditText1: {
    color: 'black',
    fontSize: 20,
    right: 40,
  },
  DebitText1: {
    color: '#8f9dbd',
    fontSize: 14,
    marginTop: 5,
    right: 40,
  },
  CreditText2: {
    color: 'black',
    fontSize: 20,
    right: 10,
  },
  DebitText2: {
    color: '#8f9dbd',
    fontSize: 14,
    marginTop: 5,
    right: 10,
  },
  CreditText3: {
    color: 'black',
    fontSize: 20,
    right: 2,
  },
  DebitText3: {
    color: '#8f9dbd',
    fontSize: 14,
    marginTop: 5,
    right: 2,
  },
  CreditText4: {
    color: 'black',
    fontSize: 20,
    right: 2,
  },
  DebitText4: {
    color: '#8f9dbd',
    fontSize: 14,
    marginTop: 5,
    right: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 300,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
});
