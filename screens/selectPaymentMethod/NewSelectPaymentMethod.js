


const PaymentCard = () => {
  const [isFlipped, setFlipped] = useState(false);
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const flipAnimation = new Animated.Value(0);

  const flipCard = () => {
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setFlipped(!isFlipped);
    });
  };

  const rotateY = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const cardBackgroundFront = 'https://simey-credit-card.netlify.app/img/bgs/default.jpg'; // Replace with your front image URL
  const cardBackgroundBack = 'https://simey-credit-card.netlify.app/img/bgs/default.jpg'; // Replace with your back image URL
  return (
    <View style={styles.cardContainer}>
      <Animated.View
        style={[
          styles.card,
          { transform: [{ rotateY }] },
          { backfaceVisibility: 'hidden' },
        ]}
      >


        {!isFlipped && (
          <ImageBackground source={ require ('../../assets/background.png')  } style={styles.cardBackground}>
            <LinearGradient
              // colors={['#0045c7', '#ff2c7d']}
              colors={['rgba(0, 69, 199, 0.85)', 'rgba(255, 44, 125, 0.85)']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.gradient}
            >

              <View style={{ borderRadius: 15 }}>
                {/* Front side of the card */}
                {/* <Image source={{
                  uri:
                    'https://png.pngtree.com/png-clipart/20210606/original/pngtree-sport-car-logo-vector-png-image_6398339.jpg', // Replace with your app logo's URL
                }} style={styles.logo} /> */}
                <View style={{top:10,color:'white',right:10,fontSize:20,alignSelf:'flex-end'}}>
                  <Text>
                    Paypal
                  </Text>
                </View>
                <Image source={{
                  uri:
                    'https://i.ibb.co/G9pDnYJ/chip.png', // Replace with your app logo's URL
                }} style={styles.logo} />
                <View style={styles.cardNumberContainer}>
                  <TextInput
                    style={{fontSize:24,color:'white'}}
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(text)}
                  />
                </View>
                <View style={styles.cardNameContainer}>
                  {/* <Text style={styles.cardLabel}>Cardholder Name</Text> */}
                  <TextInput
                    style={styles.cardInputName}
                    placeholder="John Doe"
                    value={cardType}
                    onChangeText={(text) => setCardType(text)}
                  />
                  {/* <Text style={styles.cardLabel}>Expiration Date</Text> */}
                  <TextInput
                    style={styles.cardInputDate}
                    placeholder="MM / YY"
                    value={expirationDate}
                    onChangeText={(text) => setExpirationDate(text)}
                  />
                </View>
              </View>

            </LinearGradient>
          </ImageBackground>

        )}
        {isFlipped && (
          <ImageBackground source={{ uri: 'https://i.ibb.co/PYss3yv/map.png' }} style={styles.cardBackground}>
            {/* <ImageBackground source={{ uri: 'https://simey-credit-card.netlify.app/img/bgs/default.jpg' }} style={styles.cardBackground}> */}

       
              <View style={styles.cardNumberContainer} >
                {/* Back side of the card */}
                <View style={styles.cardVerificationContainer}>
                  <Text style={styles.cardLabel}>Verification Code</Text>
                  <TextInput
                    style={styles.cardInput}
                    placeholder="CVV / CVC"
                    value={verificationCode}
                    onChangeText={(text) => setVerificationCode(text)}
                  />
                </View>
              </View>
          </ImageBackground>
        )}

      </Animated.View>
      <TouchableOpacity onPress={flipCard}>
        <Text style={styles.flipButton}>{isFlipped ? 'Flip Back' : 'Flip Card'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    borderRadius: 15,
  },
  cardBackground: {
    flex: 1,
    borderRadius: 15,
  },
  gradient: {
    flex: 1,
    borderRadius: 15,
  },
  card: {
    width: 400,
    height: 250,
    borderRadius: 15,
    padding: 20,
  },
  logo: {
    width: 62,
    height: 42,
    top: 20,
    left: 30,
    // alignSelf: 'flex-end', // Adjust the position of the logo
  },
  cardNumberContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardNameContainer: {
    width: '80%',
    top:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContainer: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  expirationContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    width: 30
  },
  cardVerificationContainer: {
    flexDirection: 'column',
    marginVertical: 20,
  },
  cardLabel: {
    fontSize: 14,
    color: 'white', // Color of label text
  },
  cardInputName: {
    fontSize: 16,
    color: 'white',
    marginLeft: 18,
    borderColor:'gray',
    borderWidth:1,
    borderRadius:20,
    // Color of input text
    // borderBottomColor: 'white', // Color of input underline
    // borderBottomWidth: 1,
    width: 150,
  },
  cardInputDate: {
    fontSize: 14,
     // Color of input text
    // borderBottomColor: 'white', // Color of input underline
    // borderBottomWidth: 1,
    width: 61,
    borderColor:'white',
    borderWidth:1,
    borderRadius:20,
  },
  flipButton: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default PaymentCard;
