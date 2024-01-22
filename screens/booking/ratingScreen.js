import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import { StoreReview } from 'expo';
import { Notifications } from 'expo';
import Modal from 'react-native-modal';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
const RatingComponent = () => {
  const [ratings, setRatings] = useState([0, 0, 0, 0, 0]);
  const [averageRating, setAverageRating] = useState(0);
  const [isModalVisible, setModalVisible] = useState(true);
  const handleStarRating = (rating, questionIndex) => {
    const newRatings = [...ratings];
    newRatings[questionIndex] = rating;
    setRatings(newRatings);

    // Calculate the average rating
    const totalRating = newRatings.reduce((sum, value) => sum + value, 0);
    const newAverageRating = totalRating / newRatings.length;
    setAverageRating(newAverageRating);
  };
  const [nextRate, setNextRate] = useState(false)
  const handleSendRating = async () => {
    // Handle sending ratings to your server or performing other actions
    setNextRate(true)

    // Request an app review
    const isAvailable = await StoreReview.isAvailableAsync();
    if (isAvailable) {
      await StoreReview.requestReview();
    } else {
      console.log('App review is not available on this device.');
    }
  };
  const [selectedRating, setSelectedRating] = useState(0);
  const [showSendButton, setShowSendButton] = useState(false);
  const handleRating = (rating) => {
    setSelectedRating(rating);
    setShowSendButton(true);
  };

  const scheduleNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Sale is over!',
        body: 'Rate your experience now.',
      },
      trigger: { seconds: 10 }, // Schedule the notification for 10 seconds from now
    });
  };
  const Question = ['Agency cusomer satisfaction', 'car quality', 'Pricing', 'Compliance with contractual commitments', 'Servise client']
  return (
    <View>
      <Modal isVisible={isModalVisible} style={styles.modal}>
        {!nextRate ?
          <View style={styles.modalContent}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ marginBottom: 20, ...Fonts.blackColor16Medium }}>
                Rate This Agency
              </Text>
            </View>

            {ratings.map((rating, index) => (
              <View key={index} style={styles.questionContainer}>
                <Text style={{ ...Fonts.grayColor14Regular }}>{Question[index]} :</Text>
                <View style={{ top: 15, left: '35%', alignItems: 'center', alignContent: "center", backgroundColor: Colors.primaryColor, borderRadius: 15, height: 30, width: 150, paddingTop: 5 }}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={rating}
                    selectedStar={(rating) => handleStarRating(rating, index)}
                    starSize={20}
                    fullStarColor="gold" // Set the color for filled stars
                    emptyStarColor="white"
                  />
                </View>
              </View>
            ))}
            <View style={styles.averageRatingContainer}>
              {/* <Text style={{ ...Fonts.blackColor16Medium }}>Average Rating : </Text> */}
              <StarRating
                disabled={true}
                maxStars={5}
                rating={averageRating}
                fullStarColor="gold" // Set the color for filled stars
                emptyStarColor="gray"
                starSize={30}
              />
              {/* <Text style={styles.averageRatingText}>{averageRating.toFixed(2)}</Text> */}

              <View style={styles.nextContainer}>
                <TouchableOpacity onPress={handleSendRating} style={styles.buttonContainer}>
                  <MaterialIcons name="navigate-next" size={28} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* TEST */}
          </View>
          :
          <View style={styles.modalContentSecond}>
            <MaterialCommunityIcons name="close-thick" size={24} color="grey" style={styles.closeIcon}
              onPress={() => setModalVisible(false)} />
            {/* Close icon in the top-right corner */}
            {/* <Icon
            name="close"
            size={25}
            color="black"
            style={styles.closeIcon}
            onPress={handleCloseModal}
          /> */}
            {/* App logo in the top-center */}
            <Text style={styles.heading}>Rate Our App</Text>
            <Image source={{
              uri:
                'https://png.pngtree.com/png-clipart/20210606/original/pngtree-sport-car-logo-vector-png-image_6398339.jpg', // Replace with your app logo's URL
            }} style={styles.appLogo} />
            
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
              <Button title="Send Rating" onPress={handleSendRating} style={{ backgroundColor: Colors.primaryColor, borderRadius: 15, with: "20%", top: 10 }} />
            )}
          </View>
        }
      </Modal>
    </View>
  )
};
const styles = StyleSheet.create({
  modal: {
    margin: 10, // Remove the margin for full-screen modal
  },
  modalContent: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  modalContentSecond: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
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
  questionContainer: {
    marginBottom: 16, // Adjust the spacing between questions
  },
  averageRatingContainer: {
    marginTop: 20, // Adjust the spacing above average rating
    alignItems: 'center',
  },
  averageRatingText: {
    marginTop: 5, // Adjust the spacing between average rating and text
  },
  nextContainer: {
    width: '100%',
    alignItems: 'flex-end',

  },
  buttonContainer: {
    width: '10%',
    alignItems: 'center',
    // Adjust the spacing between buttons
    borderRadius: 15,
    backgroundColor: Colors.primaryColor,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default RatingComponent;
