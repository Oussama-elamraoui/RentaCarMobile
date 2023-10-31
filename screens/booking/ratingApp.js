import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use the appropriate icon library

const RatingModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showSendButton, setShowSendButton] = useState(false);

  const handleRating = (rating) => {
    setSelectedRating(rating);
    setShowSendButton(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSendRating = () => {
    // Implement the logic to send the rating to your server or perform other actions
    // Reset the selected rating and hide the Send button
    setSelectedRating(0);
    setShowSendButton(false);
    setModalVisible(false);
  };

  return (
    <View>
      <Button title="Rate App" onPress={() => setModalVisible(true)} />
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          {/* Close icon in the top-right corner */}
          <Icon
            name="close"
            size={25}
            color="black"
            style={styles.closeIcon}
            onPress={handleCloseModal}
          />
          {/* App logo in the top-center */}
          <Image  source={{
              uri:
                'https://png.pngtree.com/png-clipart/20210606/original/pngtree-sport-car-logo-vector-png-image_6398339.jpg', // Replace with your app logo's URL
            }} style={styles.appLogo} />
          <Text style={styles.heading}>Rate Our App</Text>
          {/* Star rating */}
          <StarRating
            maxStars={5}
            rating={selectedRating}
            fullStarColor="gold"
            emptyStarColor="gray"
            starSize={40}
            selectedStar={handleRating}
          />
          {/* Send Rating button */}
          {showSendButton && (
            <Button title="Send Rating" onPress={handleSendRating} />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  appLogo: {
    width: 100,
    height: 100,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default RatingModal;
