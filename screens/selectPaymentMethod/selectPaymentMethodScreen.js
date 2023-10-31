import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { ImageBackground, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import FlipCard from 'react-native-flip-card';
const paymentMethodsList = [
    {
        id: '1',
        paymentMethodIcon: require('../../assets/images/paymentMethods/credit_card.png'),
        paymentMethod: 'Credit Card',
    },
    {
        id: '2',
        paymentMethodIcon: require('../../assets/images/paymentMethods/paypal.png'),
        paymentMethod: 'Paypal',
    },
    {
        id: '3',
        paymentMethodIcon: require('../../assets/images/paymentMethods/google_pay.png'),
        paymentMethod: 'Google Pay',
    },
    {
        id: '4',
        paymentMethodIcon: require('../../assets/images/paymentMethods/stripe.png'),
        paymentMethod: 'Stripe',
    },
    {
        id: '5',
        paymentMethodIcon: require('../../assets/images/paymentMethods/payU.png'),
        paymentMethod: 'PayU Money',
    },
];

const SelectPaymentMethodScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedPaymentMethodIndex: 0,
        cardNumber: '',
        nameOfCard: '',
        expiryDate: '',
        securityCode: '',
    })
    const [isFlipped, setFlipped] = useState(false);
    const toggleFlipback = () => {
        setFlipped(true);
    };
    const toggleFlipFront = () => {
        setFlipped(false);
    };

    const [imagePaymentMethod, setImagePaymentMethod] = useState('')
    const updateState = (data) => setState((state) => ({ ...state, ...data }))


    const {
        selectedPaymentMethodIndex,
        cardNumber,
        nameOfCard,
        expiryDate,
        securityCode,
    } = state;
    const handleExpirationDateChange = (text) => {
        // Remove any non-numeric characters
        const numericText = text.replace(/[^0-9]/g, '');

        // Format the date as MM/YY
        if (numericText.length <= 4) {
            let formattedDate = numericText;
            if (numericText.length > 2) {
                formattedDate = numericText.slice(0, 2) + '/' + numericText.slice(2);
            }
            updateState({ expiryDate: formattedDate })
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {paymentMethodsInfo()}
                            {PaymentCard()}
                            {cardDetailsInfo()}
                            {continueButton()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Confirmation')}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function cardDetailsInfo() {
        return (
            <View>
                {cardNumberInfo()}
                {nameOfCardInfo()}
                {expiryDateAndSecurityCodeInfo()}
            </View>
        )
    }

    function expiryDateAndSecurityCodeInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', }}>
                <View style={{ flex: 1, marginRight: Sizes.fixPadding - 5.0, }}>
                    <TextInput
                        placeholder="MM/YY"
                        placeholderTextColor={'gray'}
                        value={expiryDate}
                        onChangeText={handleExpirationDateChange }
                        selectionColor={Colors.primaryColor}
                        style={styles.textFieldStyle}
                        onFocus={toggleFlipFront}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, }}>
                    <TextInput
                        placeholderTextColor={'gray'}
                        placeholder="CVV/CVC"
                        value={securityCode}
                        onChangeText={(value) => updateState({ securityCode: value })}
                        selectionColor={Colors.primaryColor}
                        style={styles.textFieldStyle}
                        keyboardType="numeric"
                        onFocus={toggleFlipback}
                    />
                </View>
            </View>
        )
    }

    function nameOfCardInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <TextInput
                    placeholderTextColor={'gray'}
                    value={nameOfCard}
                    onChangeText={(value) => updateState({ nameOfCard: value })}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    onFocus={toggleFlipFront}
                />
            </View>
        )
    }

    function cardNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>

                <TextInput
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChangeText={(value) => updateState({ cardNumber: value })}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    keyboardType="numeric"
                    onFocus={toggleFlipFront}
                    placeholderTextColor={'gray'}
                />
            </View>
        )
    }

    function paymentMethodsInfo() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => (updateState({ selectedPaymentMethodIndex: index }), setImagePaymentMethod(item.paymentMethodIcon))}
                style={{
                    ...styles.paymentMethodInfoWrapStyle,
                    shadowColor: selectedPaymentMethodIndex == index ? Colors.primaryColor : Colors.grayColor,
                    backgroundColor: selectedPaymentMethodIndex == index ? Colors.primaryColor : Colors.whiteColor,
                }}

            >
                <Image
                    source={item.paymentMethodIcon}
                    style={{ width: 40.0, height: 40.0, resizeMode: 'contain', marginBottom: Sizes.fixPadding + 2.0, }}
                />
                <Text numberOfLines={1} style={selectedPaymentMethodIndex == index ? { ...Fonts.whiteColor15Regular } : { ...Fonts.blackColor15Regular }}>
                    {item.paymentMethod}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View>
                <FlatList
                    data={paymentMethodsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: Sizes.fixPadding * 2.0,
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingRight: Sizes.fixPadding,
                    }}
                />
            </View>
        )
    }
    function PaymentCard() {
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
            })

            console.log(isFlipped)
        };

        const rotateY = flipAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        });


        return (
            <View style={styles.cardContainer}>
                <FlipCard
                    style={[styles.card]}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={isFlipped}
                    clickable={false}
                >

                    <ImageBackground source={require('../../assets/background.png')} imageStyle={{ borderRadius: 15 }} style={[styles.cardBackground]}>
                        <View style={{ borderRadius: 15 }}>

                            <View style={{ top: 12, right: 15, alignSelf: 'flex-end' }}>
                                <Image source={imagePaymentMethod} style={{ height: 20, width: 30, }} />
                                {/* <Text style={{ fontSize: 20, color: 'white',fontFamily: 'monospace' }}>
                                        Paypal
                                    </Text> */}
                            </View>
                            <Image source={{
                                uri:
                                    'https://i.ibb.co/G9pDnYJ/chip.png', // Replace with your app logo's URL
                            }} style={styles.logo} />

                            <FontAwesome5
                                name="wifi"
                                size={30}
                                color="gray"
                                style={{
                                    position: 'absolute',
                                    alignSelf: 'flex-end',
                                    top: 60,
                                    right: 30,
                                    transform: [
                                        { rotate: '90deg' }, // Rotate the icon 45 degrees
                                        { skewX: '45deg' }, // Skew the icon horizontally by 45 degrees
                                    ],
                                }}// Flip horizontally
                            />
                            <View style={styles.cardNumberContainer}>
                                <TextInput
                                    style={{ fontSize: 24, color: 'white' }}
                                    placeholder="1234 5678 9012 3456"
                                    value={state.cardNumber}
                                    onChangeText={(text) => setCardNumber(text)}
                                    placeholderTextColor={'gray'}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.cardNameContainer}>
                                {/* <Text style={styles.cardLabel}>Cardholder Name</Text> */}
                                <TextInput
                                    placeholderTextColor="gray"
                                    style={styles.cardInputName}
                                    placeholder="Name"
                                    value={state.nameOfCard}
                                    editable={false}

                                />
                                {/* <Text style={styles.cardLabel}>Expiration Date</Text> */}
                                <TextInput
                                    style={styles.cardInputDate}
                                    placeholderTextColor="gray"
                                    placeholder="MM/YY"
                                    value={state.expiryDate}
                                    keyboardType="numeric"
                                    editable={false}
                                />
                            </View>
                        </View>

                        {/* </LinearGradient> */}
                    </ImageBackground>
                    <ImageBackground source={require('../../assets/background.png')} imageStyle={{ borderRadius: 15 }} style={[styles.cardBackground]}>
                        <View style={{ backgroundColor: 'black', borderWidth: 0.5, borderColor: 'white', top: 20, width: '100%', height: 40 }}></View>
                        <View style={{ top: 70, alignItems: 'center' }} >
                            {/* Back side of the card */}
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../assets/tape.png')} style={{ height: 27, width: '60%' }} />

                                <TextInput
                                    style={{ border: 1, borderColor: "white", backgroundColor: 'white' }}
                                    placeholder="CVV/CVC"
                                    value={state.securityCode}

                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                    </ImageBackground>
                </FlipCard>
            </View>
        );
    };
    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => navigation.pop()}
                    style={{ position: 'absolute', left: 20.0, zIndex: 1 }}
                />
                <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor18Bold }}>
                    Select Payment Method
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
    },
    paymentMethodInfoWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: 100.0,
        alignItems: 'center',
        elevation: 3.0,
        paddingTop: Sizes.fixPadding + 10.0,
        marginRight: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding + 2.0,
    },
    textFieldStyle: {
        ...Fonts.blackColor15Regular,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        padding: Sizes.fixPadding + 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding - 5.0,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
    },
    cardContainer: {
        alignItems: 'center',
        borderRadius: 15,

    },
    cardBackground: {
        flex: 1,
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
        top: 25,

    },
    cardNameContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 40,
        left: 25,
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
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        padding: 6,
        paddingLeft: 8,
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
        width: 68,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        padding: 6,
        color: '#C0C0C0',

    },
    flipButton: {
        color: 'black',
        marginTop: 10,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});

export default SelectPaymentMethodScreen;
