import React, { useState, useContext, useEffect, useCallback } from "react";
import { SafeAreaView, View, StatusBar, FlatList, TouchableOpacity, TouchableHighlight, Dimensions, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, withSpring, withTiming, useSharedValue, useDerivedValue, runOnJS } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';
import RatingModal from './ratingApp'
import Slider from '@react-native-community/slider'
import RatingComponent from "./ratingScreen";
import Thumb from "./Thumb";
import RailSelected from "./RailSelected";
import Rail from "./Rail";
import Label from "./Label";
import Notch from "./Notch";

const bookingsList = [
    {
        id: '1',
        carImage: require('../../assets/images/cars/car5.png'),
        carBrand: 'Mercedes',
        carType: 'SUV',
        carModel: 'CLS 450 Coupe 2020',
        location: 'Thornridge Cir. Syracuse, Connecticut',
        startTrip: '15 April, 4:00 pm',
        endTrip: '17 April, 12:30 am',
        paymentMethod: 'Credit Card',
        amount: 600,
    },
    {
        id: '2',
        carImage: require('../../assets/images/cars/car3.png'),
        carBrand: 'Ford',
        carType: 'Jeep',
        carModel: 'Ford Ranger Raptor 2020',
        location: 'Preston Rd. Inglewood, Maine',
        startTrip: '17 May, 6:00 pm',
        endTrip: '19 May, 12:30 am',
        paymentMethod: 'Credit Card',
        amount: 900,
    },
    {
        id: '3',
        carImage: require('../../assets/images/cars/car4.png'),
        carBrand: 'Audi',
        carType: 'Sport',
        carModel: 'Audi Q5',
        location: 'Royal Ln. Mesa, New Jersey',
        startTrip: '15 Jun, 6:00 pm',
        endTrip: '17 Jun, 12:30 am',
        paymentMethod: 'Credit Card',
        amount: 800,
    }
];
const brandsList = [
    {
        id: '1',
        brandLogo: require('../../assets/images/brand/brand1.png'),
        brandName: 'Mercedes',
    },
    {
        id: '2',
        brandLogo: require('../../assets/images/brand/brand2.png'),
        brandName: 'Tata',
    },
    {
        id: '3',
        brandLogo: require('../../assets/images/brand/brand3.png'),
        brandName: 'Hyundai',
    },
    {
        id: '4',
        brandLogo: require('../../assets/images/brand/brand4.png'),
        brandName: 'BMW',
    },
    {
        id: '5',
        brandLogo: require('../../assets/images/brand/brand5.png'),
        brandName: 'Skoda',
    },
    {
        id: '6',
        brandLogo: require('../../assets/images/brand/brand6.png'),
        brandName: 'Mahindra',
    }
];
const carSpeciaficationsList = [
    {
        id: '1',
        specificationIcon: require('../../assets/images/icons/seat.png'),
        specification: '5 seats',
    },
    {
        id: '2',
        specificationIcon: require('../../assets/images/icons/conditioner.png'),
        specification: 'Conditioner',
    },
    {
        id: '3',
        specificationIcon: require('../../assets/images/icons/location.png'),
        specification: 'Navigation',
    },
    {
        id: '4',
        specificationIcon: require('../../assets/images/icons/USB_input.png'),
        specification: 'USB Input',
    },
    {
        id: '5',
        specificationIcon: require('../../assets/images/icons/bluetooth.png'),
        specification: 'Bluetooth',
    },
    {
        id: '6',
        specificationIcon: require('../../assets/images/icons/auto.png'),
        specification: 'Auto TX',
    },
    {
        id: '7',
        specificationIcon: require('../../assets/images/icons/auto_temp.png'),
        specification: 'Auto Temp',
    },
    {
        id: '8',
        specificationIcon: require('../../assets/images/icons/keyless.png'),
        specification: 'Keyless',
    },
];

const { width } = Dimensions.get('window');

const BookingScreen = ({ navigation }) => {
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const rowSwipeAnimatedValues = {};
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [modalRebooking, setModalRebooking] = useState(false);
    const toggleBottomSheet = () => {
        setBottomSheetVisible(!bottomSheetVisible);
    }
    const toggleModalRebooking = () => {
        setModalRebooking(!modalRebooking)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {bookings()}
                {rebooking()}
                {filterButton()}
                {RatingComponent()}
                {filterSheet()}
            </View>
        </SafeAreaView>
    )

    // function vehicaleFunctionalityesSort({ icon, value }) {
    //     return (
    //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //             <Image
    //                 source={icon}
    //                 style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
    //             />
    //             <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
    //                 {value}
    //             </Text>
    //         </View>
    //     )
    // }
    function bookings() {
        const renderItem = ({ item }) => (
            <View style={styles.bookingsInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, }}>
                        <Text>
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                {item.carBrand}
                            </Text>
                            <Text>
                                {`  `}
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                {item.carType}
                            </Text>
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            {item.carModel}
                        </Text>
                    </View>
                    <Image
                        source={item.carImage}
                        style={styles.carImageStyle}
                    />
                </View>
                <View style={{ marginBottom: Sizes.fixPadding - 3.0, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="location-pin"
                        color={Colors.primaryColor}
                        size={14}
                        style={{ marginLeft: Sizes.fixPadding - 13.0, }}
                    />
                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.blackColor14Regular }}>
                        {item.location}
                    </Text>
                </View>
                <View style={{ marginBottom: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ maxWidth: width / 2.4, marginRight: Sizes.fixPadding * 3.0, }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Tirp Start
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {item.startTrip}
                        </Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Tirp End
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {item.endTrip}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Paid via {item.paymentMethod}
                        </Text>
                        <Text style={{ ...Fonts.primaryColor14Medium }}>
                            {`$`}{item.amount.toFixed(2)}
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={toggleModalRebooking}
                        style={styles.viewReceiptButtonWrapStyle}
                    >
                        <Text style={{ marginRight: Sizes.fixPadding - 5.0, ...Fonts.primaryColor14Medium }}>
                            Rebooking
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('BookingSuccessfull')}
                        style={styles.viewReceiptButtonWrapStyle}
                    >
                        <Text style={{ marginRight: Sizes.fixPadding - 5.0, ...Fonts.primaryColor14Medium }}>
                            View
                        </Text>
                        <Image
                            source={require('../../assets/images/icons/receipt.png')}
                            style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
        return (
            <FlatList
                data={bookingsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
            />
        )
    }
    function filterSheet() {

        const itemWidth = useSharedValue(0);

        const swipeComplete = (direction) => {
            if (direction === 'right') {
                // Handle swipe to delete
                // Call your delete function here
            } else if (direction === 'left') {
                // Handle swipe to next step
                // Call your next step function here
            }
        };
        const renderItem = ({ item }) => (
            <View style={styles.bookingsInfoWrapStyleSecond}>
                <View >
                    <TouchableOpacity
                        onPress={() => handleDeleteItem(item)} // Implement a function to delete the item
                        style={styles.deleteIconContainer}
                    >
                        <Feather name="delete" size={24} color="red" />
                    </TouchableOpacity>
                </View>
                <View style={styles.bookingsInfoWrapStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, }}>
                            <Text>
                                <Text style={{ ...Fonts.blackColor16Medium }}>
                                    {item.carBrand}
                                </Text>
                                <Text>
                                    {`  `}
                                </Text>
                                <Text style={{ ...Fonts.grayColor12Regular }}>
                                    {item.carType}
                                </Text>
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                {item.carModel}
                            </Text>
                        </View>
                        <Image
                            source={item.carImage}
                            style={styles.carImageStyle}
                        />
                    </View>
                    <View style={{ marginBottom: Sizes.fixPadding - 3.0, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name="location-pin"
                            color={Colors.primaryColor}
                            size={14}
                            style={{ marginLeft: Sizes.fixPadding - 13.0, }}
                        />
                        <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.blackColor14Regular }}>
                            {item.location}
                        </Text>
                    </View>
                    <View style={{ marginBottom: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ maxWidth: width / 2.4, marginRight: Sizes.fixPadding * 3.0, }}>
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                Tirp Start
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                {item.startTrip}
                            </Text>
                        </View>

                        <View style={{ flex: 1, }}>
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                Tirp End
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                {item.endTrip}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                Paid via {item.paymentMethod}
                            </Text>
                            <Text style={{ ...Fonts.primaryColor14Medium }}>
                                {`$`}{item.amount.toFixed(2)}
                            </Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.push('BookingSuccessfull')}
                            style={styles.viewReceiptButtonWrapStyle}
                        >
                            <Text style={{ marginRight: Sizes.fixPadding - 5.0, ...Fonts.primaryColor14Medium }}>
                                Pass to Payment
                            </Text>

                            <MaterialCommunityIcons name="content-save-move" size={28} color={Colors.primaryColor} style={{ resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        )
        // const renderItem = ({ item, index }) => {
        //     const onGestureEvent = Animated.event(
        //       [{ nativeEvent: { translationX: itemWidth } }],
        //       { useNativeDriver: false }
        //     );

        //     const onHandlerStateChange = ({ nativeEvent }) => {
        //       if (nativeEvent.state === 4) {
        //         const threshold = 100; // Adjust this value as needed
        //         const direction = nativeEvent.translationX > 0 ? 'right' : 'left';

        //         if (Math.abs(nativeEvent.translationX) > threshold) {
        //           // Swipe action complete
        //           swipeComplete(direction);
        //         } else {
        //           // Snap back to the original position
        //           itemWidth.value = withSpring(0, {}, () => {});
        //         }
        //       }
        //     };

        //     return (
        //       <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
        //         <Animated.View style={{ transform: [{ translateX: itemWidth }] }}>
        //           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
        //             <Text>{item.name}</Text>
        //             <TouchableOpacity onPress={() => console.log('Clicked')}>
        //               <Text>Next</Text>
        //             </TouchableOpacity>
        //           </View>
        //         </Animated.View>
        //       </PanGestureHandler> 
        //     );
        //   };
        return (

            <Modal
                isVisible={bottomSheetVisible}
                onBackdropPress={toggleBottomSheet}
                swipeDirection={['down']}
                onSwipeComplete={toggleBottomSheet}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                propagateSwipe
                avoidKeyboard
                maxHeight={'84%'}

            >
                <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: Sizes.fixPadding + 5.0, borderTopRightRadius: Sizes.fixPadding + 5.0 }}>
                    <View style={styles.filterSheetWrapStyle}>
                        <Text style={{ textAlign: 'center', ...Fonts.whiteColor18Bold }}>
                            Pannier
                        </Text>
                    </View>
                    <FlatList
                        data={bookingsList}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
                    />

                </View>
            </Modal>
        )
    }
    function rebooking() {
        const [low, setLow] = useState()
        const [showResult, setShowResult] = useState(false)
        const [heigh, setHigh] = useState()
        const [selectedBrandIndex, setBrandIndex] = useState()
        const [sliderValue, setSliderValue] = useState(50);
        const handleValueChange = useCallback((low, high) => {
            setLow(low);
            setHigh(high);
        }, []);
        const searchResultsList = [
            {
                id: '1',
                carImage: require('../../assets/images/cars/car5.png'),
                inSaved: false,
                carBrand: 'Mercedes',
                carType: 'SUV',
                carModel: 'CLS 450 Coupe 2020',
                amountPerDay: 120,
                location: 'Thornridge Cir. Syracuse, Connecticut',
                rating: 5.0,
                seats: 5,
            },
            {
                id: '2',
                carImage: require('../../assets/images/cars/car1.png'),
                inSaved: false,
                carBrand: 'Audi',
                carType: 'Sport',
                carModel: 'Audi Q5',
                amountPerDay: 190,
                location: 'Royal Ln. Mesa, New Jersey',
                rating: 5.0,
                seats: 4,
            },
            {
                id: '3',
                carImage: require('../../assets/images/cars/car2.png'),
                inSaved: false,
                carBrand: 'Mercedes',
                carType: 'Van',
                carModel: 'Bens w176',
                amountPerDay: 180,
                location: 'Washington Ave. Manchester, Kentucky',
                rating: 5.0,
                seats: 5,
            },
            {
                id: '4',
                carImage: require('../../assets/images/cars/car3.png'),
                inSaved: true,
                carBrand: 'Ford',
                carType: 'Jeep',
                carModel: 'Ford Ranger Raptor 2020',
                amountPerDay: 170,
                location: 'W. Gray St. Utica, Pennsylvania',
                rating: 5.0,
                seats: 4,
            },
            {
                id: '5',
                carImage: require('../../assets/images/cars/car4.png'),
                inSaved: true,
                carBrand: 'Mercedes',
                carType: 'SUV',
                carModel: 'CLS 450 Coupe 2020',
                amountPerDay: 120,
                location: 'Thornridge Cir. Syracuse, Connecticut',
                rating: 5.0,
                seats: 5,
            },
            {
                id: '6',
                carImage: require('../../assets/images/cars/car5.png'),
                inSaved: false,
                carBrand: 'Audi',
                carType: 'Sport',
                carModel: 'Audi Q5',
                amountPerDay: 190,
                location: 'Royal Ln. Mesa, New Jersey',
                rating: 5.0,
                seats: 4,
            },
            {
                id: '7',
                carImage: require('../../assets/images/cars/car6.png'),
                inSaved: false,
                carBrand: 'Mercedes',
                carType: 'Van',
                carModel: 'Bens w176',
                amountPerDay: 180,
                location: 'Washington Ave. Manchester, Kentucky',
                rating: 5.0,
                seats: 5,
            },
            {
                id: '8',
                carImage: require('../../assets/images/cars/car7.png'),
                inSaved: false,
                carBrand: 'Ford',
                carType: 'Jeep',
                carModel: 'Ford Ranger Raptor 2020',
                amountPerDay: 170,
                location: 'W. Gray St. Utica, Pennsylvania',
                rating: 5.0,
                seats: 4,
            },
        ];
        function vehicaleFunctionalityesSort({ icon, value }) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={icon}
                        style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                        {value}
                    </Text>
                </View>
            )
        }
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setBrandIndex(index)}
                style={{
                    borderColor: selectedBrandIndex == index ? Colors.primaryColor : '#E6E6E6',
                    ...styles.brandAndBodyTypeInfoWrapStyle,
                    shadowColor: selectedBrandIndex == index ? Colors.primaryColor : Colors.grayColor,
                }}>
                <Image
                    source={item.brandLogo}
                    style={{ width: 50.0, height: 50.0, resizeMode: 'contain' }}
                />
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                    {item.brandName}
                </Text>
            </TouchableOpacity>
        )
        const renderItemfeatures = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setBrandIndex(index)}
                style={{
                    borderColor: selectedBrandIndex == index ? Colors.primaryColor : '#E6E6E6',
                    ...styles.brandAndBodyTypeInfoWrapStyle,
                    shadowColor: selectedBrandIndex == index ? Colors.primaryColor : Colors.grayColor,
                }}>
                <Image
                    source={item.specificationIcon}
                    style={{ width: 50.0, height: 50.0, resizeMode: 'contain' }}
                />
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                    {item.specification}
                </Text>
            </TouchableOpacity>
        )
        const renderItemSearchresult = ({ item }) => (
            <View style={styles.vehicaleInfoWrapStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, }}>
                        <Ionicons
                            name={item.inSaved ? "heart" : "heart-outline"}
                            size={18}
                            color={Colors.blackColor}
                        // onPress={() => {
                        //     updateSearchResults({ id: item.id })
                        //     updateState({ showSnackBar: true })
                        // }}
                        />
                        <Text>
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                {item.carBrand}
                            </Text>
                            <Text>
                                {' '}
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                {item.carType}
                            </Text>
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            {item.carModel}
                        </Text>
                        <Text style={{ marginVertical: Sizes.fixPadding - 8.0, }}>
                            <Text style={{ ...Fonts.primaryColor16Medium }}>
                                {`$`}{item.amountPerDay}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Regular }}>
                                { } | day
                            </Text>
                        </Text>
                    </View>
                    <View style={{ width: 150.0, height: 70.0, }}>
                        <Image
                            source={item.carImage}
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="location-pin"
                        color={Colors.grayColor}
                        size={14}
                        style={{ marginLeft: Sizes.fixPadding - 13.0 }}
                    />
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                        {item.location}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        {item.rating.toFixed(1)}
                    </Text>
                    <MaterialIcons
                        name="star"
                        color={Colors.yellowColor}
                        size={14}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {vehicaleFunctionalityesSort({ icon: require('../../assets/images/icons/seat.png'), value: `${item.seats} seats` })}
                    {vehicaleFunctionalityesSort({ icon: require('../../assets/images/icons/petrolpump.png'), value: ' Petrol' })}
                    {vehicaleFunctionalityesSort({ icon: require('../../assets/images/icons/auto.png'), value: ' Auto' })}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('CarDetail', { item })}
                        style={styles.bookButtonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor16Medium }}>
                            Book
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
        return (
            <Modal
                isVisible={modalRebooking}
                onBackdropPress={toggleModalRebooking}
                swipeDirection={['down']}
                onSwipeComplete={toggleModalRebooking}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                propagateSwipe
                avoidKeyboard
                maxHeight={'55%'}

            >

                <View style={{ height: 40, backgroundColor: Colors.primaryColor, borderTopRightRadius: 15, borderTopLeftRadius: 15, width: '100%', alignItems: 'center', alignContent: 'center' }}>
                    <View style={{ height: 3, width: 30, backgroundColor: Colors.grayColor, top: 14 }}></View>
                </View>
                {showResult===false ?
                    <View style={{ backgroundColor: Colors.whiteColor, width: '100%', }}>
                        <View >
                            <Text style={{ ...Fonts.blackColor16Medium, marginLeft: 10, marginTop: 10 }}>Filters</Text>
                        </View>
                        <View style={{ paddingTop: 20, marginLeft: 15 }}>
                            <Text style={{ ...Fonts.grayColor15Medium }}>Brands</Text>
                        </View>

                        <View style={{}}>
                            <FlatList
                                data={brandsList}
                                keyExtractor={(item) => `${item.id}`}
                                renderItem={renderItem}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding, paddingRight: Sizes.fixPadding }}
                            />
                        </View>
                        <View style={{ paddingTop: 20, marginLeft: 15 }}>
                            <Text style={{ ...Fonts.grayColor15Medium }}>Price range</Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 55 }}>
                                <Text style={{ color: '#B7C4B5' }}>Low : {sliderValue}</Text>
                                <Text style={{ color: '#B7C4B5' }}>High : {sliderValue}</Text>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Slider
                                    style={{ width: 250, height: 40, }}
                                    minimumValue={0}
                                    maximumValue={100}
                                    minimumTrackTintColor={'gray'}
                                    thumbTintColor={'black'}
                                    step={1}
                                    lowerLimit={10}
                                    // upperLimit={40}
                                    tapToSeek={true}
                                    value={sliderValue}
                                    onValueChange={(value) => setSliderValue(value)}
                                />

                            </View>
                        </View>
                        <View style={{ paddingTop: 20, marginLeft: 15 }}>
                            <Text style={{ ...Fonts.grayColor15Medium }}>Features</Text>
                        </View>
                        <View style={{}}>
                            <FlatList
                                data={carSpeciaficationsList}
                                keyExtractor={(item) => `${item.id}`}
                                renderItem={renderItemfeatures}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding, paddingRight: Sizes.fixPadding }}
                            />
                        </View>
                        <View style={{ alignItems: 'center', paddingVertical: Sizes.fixPadding }}>
                            <TouchableOpacity
                                onPress={()=>setShowResult(true)}
                                style={{ alignItems: 'center', backgroundColor: Colors.primaryColor, width: 200, height: 40, borderRadius: 20, paddingVertical: Sizes.fixPadding }}
                            >
                                <Text style={{ ...Fonts.whiteColor16Medium }}>Show result</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={{ backgroundColor: Colors.whiteColor, width: '100%'}}>
                        <View style={{ flexDirection: 'row' ,justifyContent: 'center', alignItems: 'center',paddingTop: 10, }}>
                            <View style={{  borderRadius: 15, backgroundColor: 'gray' , width: '80%',justifyContent: 'center', alignItems: 'center',height: 40,}}><Text style={{ ...Fonts.whiteColor16Medium }}>Search Result</Text>
                            </View>
                            <View style={{ width: 40, borderRadius: 15, backgroundColor: 'gray',justifyContent: 'center', alignItems: 'center',height: 40 }}>
                            <TouchableOpacity
                            onPress={()=>setShowResult(false)}
                            >
                                <MaterialCommunityIcons name="filter-variant-plus" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ paddingTop: 20, marginLeft: 15 }}>
                            <Text style={{ ...Fonts.grayColor15Medium }}>Brands
                            </Text>
                        </View>

                        <View style={{}}>
                            <FlatList
                                data={brandsList}
                                keyExtractor={(item) => `${item.id}`}
                                renderItem={renderItem}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding, paddingRight: Sizes.fixPadding }}
                            />
                        </View>
                        <View style={{ paddingTop: 20, marginLeft: 15 }}>
                            <Text style={{ ...Fonts.grayColor15Medium }}>Cars</Text>
                        </View>
                        <View>
                            <FlatList
                                data={searchResultsList}
                                keyExtractor={(item) => `${item.id}`}
                                renderItem={renderItemSearchresult}
                                showsVerticalScrollIndicator={true}
                                alwaysBounceVertical={true}
                                // horizontal
                                // showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
                            />
                        </View>

                    </View>}
            </Modal>
        )
    }
    function filterButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => (setBottomSheetVisible(true))}
                style={styles.filterButtonStyle}
            >
                <MaterialCommunityIcons name="list-status" size={24} color={Colors.whiteColor} />
            </TouchableOpacity>
        )
    }
    // function pannierList() {
    //     const bookingsList = [
    //         {
    //             id: '1',
    //             carImage: require('../../assets/images/cars/car5.png'),
    //             carBrand: 'Mercedes',
    //             carType: 'SUV',
    //             carModel: 'CLS 450 Coupe 2020',
    //             location: 'Thornridge Cir. Syracuse, Connecticut',
    //             startTrip: '15 April, 4:00 pm',
    //             endTrip: '17 April, 12:30 am',
    //             paymentMethod: 'Credit Card',
    //             amount: 600,
    //         },
    //         {
    //             id: '2',
    //             carImage: require('../../assets/images/cars/car3.png'),
    //             carBrand: 'Ford',
    //             carType: 'Jeep',
    //             carModel: 'Ford Ranger Raptor 2020',
    //             location: 'Preston Rd. Inglewood, Maine',
    //             startTrip: '17 May, 6:00 pm',
    //             endTrip: '19 May, 12:30 am',
    //             paymentMethod: 'Credit Card',
    //             amount: 900,
    //         },
    //         {
    //             id: '3',
    //             carImage: require('../../assets/images/cars/car4.png'),
    //             carBrand: 'Audi',
    //             carType: 'Sport',
    //             carModel: 'Audi Q5',
    //             location: 'Royal Ln. Mesa, New Jersey',
    //             startTrip: '15 Jun, 6:00 pm',
    //             endTrip: '17 Jun, 12:30 am',
    //             paymentMethod: 'Credit Card',
    //             amount: 800,
    //         }
    //     ];
    //     const [listData, setListData] = useState(bookingsList);
    //     console.log(listData)
    //     const renderHiddenItem = (data, rowMap) => (
    //         <View style={{ alignItems: 'center', flex: 1 }}>
    //             <TouchableOpacity
    //                 activeOpacity={0.9}
    //                 style={styles.backDeleteContinerStyle}
    //                 onPress={() => deleteRow(rowMap, data.item.key)}
    //             >
    //                 <Animated.View
    //                     style={[
    //                         {
    //                             transform: [
    //                                 {
    //                                     scale: rowSwipeAnimatedValues[
    //                                         data.item.key
    //                                     ].interpolate({
    //                                         inputRange: [45, 50],
    //                                         outputRange: [0, 1],
    //                                         extrapolate: 'clamp',
    //                                     }),
    //                                 },
    //                             ],
    //                         },
    //                     ]}
    //                 >
    //                     <MaterialIcons
    //                         name="delete"
    //                         size={22}
    //                         color={Colors.whiteColor}
    //                         style={{ alignSelf: 'center' }}
    //                     />
    //                 </Animated.View>
    //             </TouchableOpacity>
    //         </View>
    //     );
    //     const renderItem = ({ item }) => (
    //         <View style={styles.bookingsInfoWrapStyle}>
    //             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    //                 <View style={{ flex: 1, }}>
    //                     <Text>
    //                         <Text style={{ ...Fonts.blackColor16Medium }}>
    //                             {item.carBrand}
    //                         </Text>
    //                         <Text>
    //                             {`  `}
    //                         </Text>
    //                         <Text style={{ ...Fonts.grayColor12Regular }}>
    //                             {item.carType}
    //                         </Text>
    //                     </Text>
    //                     <Text style={{ ...Fonts.grayColor12Regular }}>
    //                         {item.carModel}
    //                     </Text>
    //                 </View>
    //                 <Image
    //                     source={item.carImage}
    //                     style={styles.carImageStyle}
    //                 />
    //             </View>
    //             <View style={{ marginBottom: Sizes.fixPadding - 3.0, flexDirection: 'row', alignItems: 'center' }}>
    //                 <MaterialIcons
    //                     name="location-pin"
    //                     color={Colors.primaryColor}
    //                     size={14}
    //                     style={{ marginLeft: Sizes.fixPadding - 13.0, }}
    //                 />
    //                 <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.blackColor14Regular }}>
    //                     {item.location}
    //                 </Text>
    //             </View>
    //             <View style={{ marginBottom: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
    //                 <View style={{ maxWidth: width / 2.4, marginRight: Sizes.fixPadding * 3.0, }}>
    //                     <Text style={{ ...Fonts.grayColor12Regular }}>
    //                         Tirp Start
    //                     </Text>
    //                     <Text style={{ ...Fonts.blackColor14Regular }}>
    //                         {item.startTrip}
    //                     </Text>
    //                 </View>

    //                 <View style={{ flex: 1, }}>
    //                     <Text style={{ ...Fonts.grayColor12Regular }}>
    //                         Tirp End
    //                     </Text>
    //                     <Text style={{ ...Fonts.blackColor14Regular }}>
    //                         {item.endTrip}
    //                     </Text>
    //                 </View>
    //             </View>
    //             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    //                 <View>
    //                     <Text style={{ ...Fonts.grayColor12Regular }}>
    //                         Paid via {item.paymentMethod}
    //                     </Text>
    //                     <Text style={{ ...Fonts.primaryColor14Medium }}>
    //                         {`$`}{item.amount.toFixed(2)}
    //                     </Text>
    //                 </View>
    //                 <TouchableOpacity
    //                     activeOpacity={0.9}
    //                     onPress={() => navigation.push('BookingSuccessfull')}
    //                     style={styles.viewReceiptButtonWrapStyle}
    //                 >
    //                     <Text style={{ marginRight: Sizes.fixPadding - 5.0, ...Fonts.primaryColor14Medium }}>
    //                         View
    //                     </Text>
    //                     <Image
    //                         source={require('../../assets/images/icons/receipt.png')}
    //                         style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
    //                     />
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     )
    //     Array(bookingsList.length + 1)
    //         .fill('')
    //         .forEach((_, i) => {
    //             rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    //         });
    //     const deleteRow = (rowMap, rowKey) => {
    //         closeRow(rowMap, rowKey);
    //         const newData = [...listData];
    //         const prevIndex = listData.findIndex(item => item.key === rowKey);
    //         newData.splice(prevIndex, 1);
    //         setShowSnackBar(true);
    //         setListData(newData);
    //     };
    //     const onSwipeValueChange = swipeData => {
    //         const { key, value } = swipeData;
    //         rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    //     };
    //     return (
    //         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
    //             <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
    //             <View style={{ flex: 1 }}>
    //                 {header()}
    //                 <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
    //                     {bookingsList.length == 0 ?
    //                         <>
    //                             {noFavoriteItemsInfo()}
    //                         </>
    //                         :
    //                         <SwipeListView
    //                             data={listData}
    //                             renderItem={renderItem}
    //                             renderHiddenItem={renderHiddenItem}
    //                             rightOpenValue={-60}
    //                             onSwipeValueChange={onSwipeValueChange}
    //                             useNativeDriver={false}
    //                             showsVerticalScrollIndicator={false}
    //                             contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0, }}
    //                         />
    //                     }
    //                     <Snackbar
    //                         style={styles.snackBarStyle}
    //                         visible={showSnackBar}
    //                         onDismiss={() => setShowSnackBar(false)}
    //                     >
    //                         Item Remove From Saved.
    //                     </Snackbar>
    //                 </View>
    //             </View>
    //         </SafeAreaView>
    //     );
    // }
    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    My Booking
                </Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    deleteIconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        padding: 0,  // Ensure it appears above other content

    },
    brandAndBodyTypeInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 2.0,
        borderWidth: 1.0,
        width: 80.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Sizes.fixPadding,
    },
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
    },
    vehicaleInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    viewReceiptButtonWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: Sizes.fixPadding - 7.0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding - 5.0,
    },
    carImageStyle: {
        alignSelf: 'flex-start',
        width: 120.0,
        height: 50.0,
        resizeMode: 'contain',
        marginRight: Sizes.fixPadding - 20,
    },
    bookingsInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        overflow: 'hidden',
        marginBottom: Sizes.fixPadding,
    },
    bookingsInfoWrapStyleSecond: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        overflow: 'hidden',
        marginBottom: Sizes.fixPadding,
    },
    filterButtonStyle: {
        backgroundColor: Colors.primaryColor,
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20.0,
        left: 20.0,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
        zIndex: 5,
    },
    filterSheetWrapStyle: {
        backgroundColor: Colors.primaryColor,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding * 2.0,
    }
});

export default BookingScreen;