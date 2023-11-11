import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

const EmergencyAlertScreen = ({navigation}: any) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleYesClick = () => {
    setShowPopup(true);
  };

  const handleNoThanksClick = () => {
    setShowPopup(false);
  };

  const handleOkClick = () => {
    setShowPopup(false);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handlePress = () => {
    navigation.navigate('Bottom');
  };

  return (
    <View style={styles.container}>
      <View style={styles.BlackCrossView}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../assets/images/black_cross.png')}
            style={styles.BlackCross}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>SOS ALERT</Text>

        <View style={styles.MessageView}>
          <Text style={styles.MessageText}>
            Are you sure you want to send an emergency alert message to our
            Customer Service?
          </Text>
        </View>

        <TouchableOpacity style={styles.sendButton} onPress={handleYesClick}>
          <Text style={styles.sendButtonText}>Yes</Text>
        </TouchableOpacity>

        {/* Popup Modal */}
        <Modal visible={showPopup} animationType="slide" transparent>
          <View style={styles.popupContainer}>
            <View style={styles.popupCard}>
              <Text style={styles.popupText}>
                To continue, turn on device location, which uses Google's
                location services
              </Text>
              <View style={styles.rowButtonsContainer}>
                <TouchableOpacity onPress={handleNoThanksClick}>
                  <Text style={styles.buttonText}>No, thanks</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleOkClick}>
                  <Text style={styles.buttonText}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Confirmation Modal */}
        <Modal visible={showConfirmation} animationType="fade" transparent>
          <View style={styles.confirmationContainer}>
            <View style={styles.confirmationCard}>
              <Text style={styles.confirmationHeading}>Success</Text>
              <Text style={styles.confirmationText}>
                SOS Alert updated successfully
              </Text>
              <TouchableOpacity onPress={handleCloseConfirmation}>
                <Text style={styles.buttonText1}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default EmergencyAlertScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  BlackCrossView: {
    alignSelf: 'flex-end',
    right: 30,
  },
  BlackCross: {
    width: 20,
    height: 20,
    marginTop: 40,
  },
  card: {
    backgroundColor: 'skyblue',
    width: '95%',
    height: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    marginTop: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  MessageView: {
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  MessageText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingVertical: 16,
    paddingHorizontal: 140,
    borderRadius: 30,
    marginTop: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 4,
    width: '90%',
  },
  popupText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#737373',
  },
  rowButtonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    right: 20,
  },

  buttonText: {
    color: '#8db0d5',
    fontSize: 18,
    padding: 20,
  },
  buttonText1: {
    color: '#8db0d5',
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmationCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 4,
    width: '80%',
  },
  confirmationText: {
    fontSize: 14,
    marginBottom: 10,
  },
  confirmationHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
