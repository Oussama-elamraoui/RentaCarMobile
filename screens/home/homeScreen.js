import React, { useState, useEffect } from "react";
import { SafeAreaView, ImageBackground, FlatList, Image, TouchableOpacity, Dimensions, ScrollView, View, StatusBar, StyleSheet, Text, TextInput } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu } from 'react-native-material-menu';
import { Calendar } from "react-native-calendars";
import { FontAwesome5 } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import GetLocation from 'react-native-get-location'
import Modal from 'react-native-modal';

const locationsList = ['4517 Washington Ave. Manchester, Kentucky',
    '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
    '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    '4140 Parker Rd. Allentown, New Mexico 31134',
    '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    '2715 Ash Dr. San Jose, South Dakota 83475',
    '8502 Preston Rd. Inglewood, Maine 98380',
    '2464 Royal Ln. Mesa, New Jersey 45463',
    '3517 W. Gray St. Utica, Pennsylvania 57867',
    '6391 Elgin St. Celina, Delaware 10299',
    '3891 Ranchview Dr. Richardson, California 62639',
];

const hotDealsList = [
    {
        id: '1',
        carImage: require('../../assets/images/cars/car1.png'),
        carBrand: 'Audi',
        amountPerDay: 70,
        carModel: 'QR7 Sport',
        location: 'Cario',
        rating: 5.0,
        discountInPercentage: 30,
    },
    {
        id: '2',
        carImage: require('../../assets/images/cars/car2.png'),
        carBrand: 'BMW',
        amountPerDay: 90,
        carModel: 'BMW i8',
        location: 'Cario',
        rating: 4.5,
        discountInPercentage: 25,
    },
    {
        id: '3',
        carImage: require('../../assets/images/cars/car3.png'),
        carBrand: 'Volvo',
        amountPerDay: 70,
        carModel: 'QR7 Sport',
        location: 'Cario',
        rating: 5.0,
        discountInPercentage: 30,
    },
    {
        id: '4',
        carImage: require('../../assets/images/cars/car4.png'),
        carBrand: 'Mercedes',
        amountPerDay: 90,
        carModel: 'Bens w176',
        location: 'Cario',
        rating: 4.5,
        discountInPercentage: 25,
    },
    {
        id: '5',
        carImage: require('../../assets/images/cars/car5.png'),
        carBrand: 'Ford',
        amountPerDay: 100,
        carModel: 'Ford Ranger Raptor 2020',
        location: 'Cario',
        rating: 4.5,
        discountInPercentage: 30,
    },
];

const latestOfferList = [
    {
        id: '1',
        offerBgImage: require('../../assets/images/offer_bg/offer_bg1.png'),
        offer: '20%',
        title: 'Cashback',
        subTitle: 'on first booking',
    },
    {
        id: '2',
        offerBgImage: require('../../assets/images/offer_bg/offer_bg2.png'),
        offer: 'FLAT 30%',
        title: 'with HDFC Bank',
        subTitle: 'net banking!',
    },
    {
        id: '3',
        offerBgImage: require('../../assets/images/offer_bg/offer_bg3.png'),
        offer: '20%',
        title: 'Book for 18hrs+ & Get',
    },
    {
        id: '4',
        offerBgImage: require('../../assets/images/offer_bg/offer_bg1.png'),
        offer: '20%',
        title: 'Cashback',
        subTitle: 'on first booking',
    },
    {
        id: '5',
        offerBgImage: require('../../assets/images/offer_bg/offer_bg2.png'),
        offer: 'FLAT 30%',
        title: 'with HDFC Bank',
        subTitle: 'net banking!',
    },
    {
        id: '6',
        offerBgImage: require('../../assets/images/offer_bg/offer_bg3.png'),
        offer: '20%',
        title: 'Book for 18hrs+ & Get',
    },
];

const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Suptember', 'October', 'November', 'December'];

const hoursList = [...range(1, 12)];

const minutesList = [...range(0, 59)];

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation, }) => {

    const [state, setState] = useState({
        selectedPickupLocation: locationsList[0],
        showPickupLocationOptions: false,
        defaultStartDate: new Date().getDate(),
        defaultEndDate: new Date().getDate() + 5,
        selectedStartDate: `${new Date().getDate()} ${monthsList[new Date().getMonth()]}`,
        selectedEndDate: `${new Date().getDate() + 5} ${monthsList[new Date().getMonth()]}`,
        currentTabIndex: 0,
        selectedStartHour: 11,
        selectedStartMinute: 0,
        selectedStartAmPm: 'AM',
        selectedEndHour: 5,
        selectedEndMinute: 0,
        selectedEndAmPm: 'PM',
        showHoursOptions: false,
        showMinutesOptions: false,
        showAmPmOptions: false,
        showStartTripEndTripSheet: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        selectedPickupLocation,
        showPickupLocationOptions,
        defaultStartDate,
        defaultEndDate,
        selectedStartDate,
        selectedEndDate,
        currentTabIndex,
        selectedStartHour,
        selectedStartMinute,
        selectedStartAmPm,
        selectedEndHour,
        selectedEndMinute,
        selectedEndAmPm,
        showHoursOptions,
        showMinutesOptions,
        showAmPmOptions,
        showStartTripEndTripSheet,
    } = state;
    const [location, setLocation] = useState(null);
    const [coordinate, setCoordinate] = useState(null);

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Please grant location permissions");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            // setLocation(currentLocation.coords);
            // console.log("Location:");

            setCoordinate({ 'latitude': currentLocation.coords.latitude, 'longitude': currentLocation.coords.longitude })
        };
        getPermissions();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {tripInfo()}
                    {hotDealsInfo()}
                    {availableCarsButton()}
                    {latestOfferInfo()}
                </ScrollView>
            </View>
            {startTripEndTripSheet()}
        </SafeAreaView >
    )

    function latestOfferInfo() {
        const renderItem = ({ item, index }) => (
            <ImageBackground
                source={item.offerBgImage}
                style={styles.latestOfferBgImageStyle}
            >
                <View style={styles.latestOfferImageShadowStyle}>
                    <View style={{ width: 1.0, height: '55%', backgroundColor: Colors.whiteColor }} />
                    <View style={{ marginLeft: Sizes.fixPadding - 5.0, }}>
                        {
                            (index + 1) % 3 == 0
                                ?
                                <>
                                    {item.title
                                        ?
                                        <Text style={{ ...Fonts.whiteColor13Medium }}>
                                            {item.title}
                                        </Text>
                                        :
                                        null
                                    }
                                    {item.offer ?
                                        <Text style={{ ...Fonts.whiteColor18Bold }}>
                                            {item.offer}
                                        </Text>
                                        : null
                                    }
                                    {
                                        item.subTitle ?
                                            <Text style={{ ...Fonts.whiteColor11Regular }}>
                                                {item.subTitle}
                                            </Text>
                                            :
                                            null
                                    }
                                </>
                                :
                                <>
                                    {item.offer ?
                                        <Text style={{ ...Fonts.whiteColor18Bold }}>
                                            {item.offer}
                                        </Text>
                                        : null
                                    }
                                    {item.title
                                        ?
                                        <Text style={{ ...Fonts.whiteColor13Medium }}>
                                            {item.title}
                                        </Text>
                                        :
                                        null
                                    }
                                    {
                                        item.subTitle ?
                                            <Text style={{ ...Fonts.whiteColor11Regular }}>
                                                {item.subTitle}
                                            </Text>
                                            :
                                            null
                                    }
                                </>
                        }
                    </View>
                </View>
            </ImageBackground>
        )
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Medium }}>
                    Latest Offers
                </Text>
                <FlatList
                    data={latestOfferList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding, paddingLeft: Sizes.fixPadding * 2.0, paddingRight: Sizes.fixPadding, }}
                />
            </View>
        )
    }

    function availableCarsButton() {
        return (
            <View style={styles.availableCarsButtonStyle}>
                <View>
                    <Text style={{ ...Fonts.whiteColor18Medium }}>
                        Available Cars
                    </Text>
                    <Text style={{ ...Fonts.whiteColor15Regular }}>
                        Long term and short term
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('AvailableCars')}
                    style={styles.availableCarsForwardIconWrapStyle}
                >
                    <MaterialIcons
                        name="arrow-forward-ios"
                        color={Colors.primaryColor}
                        size={24}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function hotDealsInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.hotDealsCarInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        {item.carBrand}
                    </Text>
                    <View style={{ marginLeft: Sizes.fixPadding + 5.0, flexDirection: 'row' }}>
                        <Text style={{ ...Fonts.primaryColor14Medium }}>
                            {`$`}{item.amountPerDay}
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            { } | day
                        </Text>
                    </View>
                </View>
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    {item.carModel}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="location-pin"
                        size={14}
                        color={Colors.grayColor}
                        style={{ marginLeft: Sizes.fixPadding - 12.0, marginRight: Sizes.fixPadding - 7.0, }}
                    />
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                        {item.location}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                        {item.rating.toFixed(1)}
                    </Text>
                    <MaterialIcons
                        name="star"
                        size={14}
                        color={Colors.yellowColor}
                        style={{ marginLeft: Sizes.fixPadding - 7.0, }}
                    />
                </View>
                <View style={styles.hotDealsOfferWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor11Bold }}>
                        30% OFF
                    </Text>
                </View>
                <View style={styles.hotDealCarImageWrapStyle}>
                    <Image
                        source={item.carImage}
                        style={{ width: '100%', height: '100%', }}
                    />
                </View>
            </View>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding * 4.0, }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Medium }}>
                    Hot Deals
                </Text>
                <FlatList
                    data={hotDealsList}
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

    function startTripEndTripSheet() {
        return (
            <Modal
                isVisible={showStartTripEndTripSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { updateState({ showStartTripEndTripSheet: false }) } }}
            >
                <View style={styles.startTripEndTripSheetWrapStyle}>
                    <View style={styles.bottomSheetTimeInfoWrapStyle}>
                        <Text style={{ marginBottom: Sizes.fixPadding + 5.0, textAlign: 'center', ...Fonts.blackColor18Bold }}>
                            Select Start Time
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ ...Fonts.primaryColor13Bold }}>
                                Start Trip
                            </Text>
                            <Text style={{ ...Fonts.primaryColor13Bold }}>
                                End Trip
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                activeOpacity={0.99}
                                onPress={() => updateState({ currentTabIndex: 0 })}
                            >
                                <Text style={{ ...Fonts.blackColor14Regular }}>
                                    {selectedStartDate},{' '}
                                    {selectedStartHour}:{selectedStartMinute.toString().length == 1 ? `0${selectedStartMinute}` : selectedStartMinute}
                                    { } {selectedStartAmPm}
                                </Text>
                                <View style={{ marginTop: Sizes.fixPadding, backgroundColor: currentTabIndex == 0 ? Colors.primaryColor : 'transparent', height: 1.5, }} />
                            </TouchableOpacity>
                            <Text style={{ alignSelf: 'flex-start', ...Fonts.grayColor14Medium }}>
                                to
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.99}
                                onPress={() => updateState({ currentTabIndex: 1 })}
                            >
                                <Text style={{ ...Fonts.blackColor14Regular }}>
                                    {selectedEndDate},{' '}
                                    {selectedEndHour}:{selectedEndMinute.toString().length == 1 ? `0${selectedEndMinute}` : selectedEndMinute}
                                    { } {selectedEndAmPm}
                                </Text>
                                <View style={{ marginTop: Sizes.fixPadding, backgroundColor: currentTabIndex == 1 ? Colors.primaryColor : 'transparent', height: 1.5, }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.grayColor13Regular }}>
                        Select Pick-up Date
                    </Text>
                    {startTripCalender({ fromIndex: currentTabIndex })}
                    <View style={styles.bottomSheetDividerStyle}/>
                    <Text style={{ marginBottom: Sizes.fixPadding, textAlign: 'center', ...Fonts.grayColor13Regular }}>
                        Select Pick-up Time
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {selectHour({ fromIndex: currentTabIndex })}
                        {selectMinute({ fromIndex: currentTabIndex })}
                        {selectAmPm({ fromIndex: currentTabIndex })}
                    </View>
                    {confirmButton()}
                </View>
            </Modal>
        )
    }

    function confirmButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ showStartTripEndTripSheet: false })}
                style={styles.confirmButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Confirm
                </Text>
            </TouchableOpacity>
        )
    }

    function selectAmPm({ fromIndex }) {
        return (
            <Menu
                visible={showAmPmOptions}
                style={{ backgroundColor: Colors.primaryColor, paddingTop: Sizes.fixPadding, maxHeight: height - 100.0, }}
                anchor={
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showAmPmOptions: true })}
                        style={{ marginHorizontal: Sizes.fixPadding * 2.5, alignItems: 'center' }}
                    >
                        <View style={{ backgroundColor: Colors.grayColor, height: 1.0, width: '100%' }} />
                        <Text style={{ marginVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding + 5.0, ...Fonts.blackColor14Regular }}>
                            {fromIndex == 0 ? selectedStartAmPm : selectedEndAmPm}
                        </Text>
                        <View style={{ backgroundColor: Colors.grayColor, height: 1.0, width: '100%' }} />
                    </TouchableOpacity>
                }
                onRequestClose={() => updateState({ showAmPmOptions: false })}
            >
                <Text
                    style={{ width: 100.0, textAlign: 'center', marginBottom: Sizes.fixPadding + 5.0, ...Fonts.whiteColor15Regular }}
                    onPress={() => {
                        fromIndex == 0
                            ?
                            updateState({ selectedStartAmPm: 'AM', showAmPmOptions: false })
                            :
                            updateState({ selectedEndAmPm: 'AM', showAmPmOptions: false })
                    }}
                >
                    AM
                </Text>
                <Text
                    style={{ width: 100.0, textAlign: 'center', marginBottom: Sizes.fixPadding + 5.0, ...Fonts.whiteColor15Regular }}
                    onPress={() => {
                        fromIndex == 0
                            ?
                            updateState({ selectedStartAmPm: 'PM', showAmPmOptions: false })
                            :
                            updateState({ selectedEndAmPm: 'PM', showAmPmOptions: false })
                    }}
                >
                    PM
                </Text>
            </Menu>
        )
    }

    function selectMinute({ fromIndex }) {
        return (
            <Menu
                visible={showMinutesOptions}
                style={{ backgroundColor: Colors.primaryColor, paddingTop: Sizes.fixPadding, maxHeight: height - 100.0, }}
                anchor={
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showMinutesOptions: true })}
                        style={{ marginHorizontal: Sizes.fixPadding * 2.5, alignItems: 'center' }}
                    >
                        <View style={{ backgroundColor: Colors.grayColor, height: 1.0, width: '100%' }} />
                        <Text style={{ marginVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding + 5.0, ...Fonts.blackColor14Regular }}>
                            {fromIndex == 0 ?
                                selectedStartMinute.toString().length == 1 ? `0${selectedStartMinute}` : selectedStartMinute
                                :
                                selectedEndMinute.toString().length == 1 ? `0${selectedEndMinute}` : selectedEndMinute
                            }
                        </Text>
                        <View style={{ backgroundColor: Colors.grayColor, height: 1.0, width: '100%' }} />
                    </TouchableOpacity>
                }
                onRequestClose={() => updateState({ showMinutesOptions: false })}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        minutesList.map((item, index) => (
                            <Text
                                key={index}
                                style={{ width: 100.0, textAlign: 'center', marginBottom: Sizes.fixPadding + 5.0, ...Fonts.whiteColor15Regular }}
                                onPress={() => {
                                    fromIndex == 0
                                        ?
                                        updateState({ selectedStartMinute: item, showMinutesOptions: false })
                                        :
                                        updateState({ selectedEndMinute: item, showMinutesOptions: false })
                                }}
                            >
                                {`${item}`}
                            </Text>
                        ))
                    }
                </ScrollView>
            </Menu>
        )
    }

    function selectHour({ fromIndex }) {
        return (
            <Menu
                visible={showHoursOptions}
                style={{ backgroundColor: Colors.primaryColor, paddingTop: Sizes.fixPadding, maxHeight: height - 100.0, }}
                anchor={
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showHoursOptions: true })}
                        style={{ marginHorizontal: Sizes.fixPadding * 2.5, alignItems: 'center' }}
                    >
                        <View style={{ backgroundColor: Colors.grayColor, height: 1.0, width: '100%' }} />
                        <Text style={{ marginVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding + 5.0, ...Fonts.blackColor14Regular }}>
                            {fromIndex == 0 ?
                                selectedStartHour.toString().length == 1 ? `0${selectedStartHour}` : selectedStartHour
                                :
                                selectedEndHour.toString().length == 1 ? `0${selectedEndHour}` : selectedEndHour
                            }
                        </Text>
                        <View style={{ backgroundColor: Colors.grayColor, height: 1.0, width: '100%' }} />
                    </TouchableOpacity>
                }
                onRequestClose={() => updateState({ showHoursOptions: false })}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        hoursList.map((item, index) => (
                            <Text
                                key={index}
                                style={{ width: 100.0, textAlign: 'center', marginBottom: Sizes.fixPadding + 5.0, ...Fonts.whiteColor15Regular }}
                                onPress={() => {
                                    fromIndex == 0 ?
                                        updateState({ selectedStartHour: item, showHoursOptions: false })
                                        :
                                        updateState({ selectedEndHour: item, showHoursOptions: false })
                                }}
                            >
                                {`${item}`}
                            </Text>
                        ))
                    }
                </ScrollView>
            </Menu>
        )
    }

    function startTripCalender({ fromIndex }) {
        return (

            <Calendar
                monthFormat={`${fromIndex == 0 ? defaultStartDate : defaultEndDate} MMMM  yyyy`}
                renderArrow={direction => direction == 'left'
                    ?
                    <MaterialIcons name="arrow-back-ios" color={Colors.blackColor} size={22} />
                    :
                    <MaterialIcons name="arrow-forward-ios" color={Colors.blackColor} size={22} />
                }
                hideExtraDays={true}
                disableMonthChange={true}
                firstDay={1}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                enableSwipeMonths={true}
                dayComponent={({ date, state }) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                fromIndex == 0
                                    ?
                                    updateState({
                                        selectedStartDate: `${date.day} ${monthsList[date.month - 1]}`,
                                        defaultStartDate: date.day
                                    })
                                    :
                                    updateState({
                                        selectedEndDate: `${date.day} ${monthsList[date.month - 1]}`,
                                        defaultEndDate: date.day
                                    })
                            }}
                            style={{
                                ...styles.calenderDateWrapStyle,
                                borderColor: fromIndex == 0 ?
                                    date.day == defaultStartDate ? Colors.primaryColor : '#D2D2D2'
                                    :
                                    date.day == defaultEndDate ? Colors.primaryColor : '#D2D2D2'
                                ,
                                backgroundColor: fromIndex == 0 ?
                                    date.day == defaultStartDate ? Colors.primaryColor : Colors.whiteColor
                                    :
                                    date.day == defaultEndDate ? Colors.primaryColor : Colors.whiteColor
                            }}
                        >
                            <Text style={
                                fromIndex == 0
                                    ?
                                    date.day == defaultStartDate ? { ...Fonts.whiteColor12Medium } : { ...Fonts.grayColor12Medium }
                                    :
                                    date.day == defaultEndDate ? { ...Fonts.whiteColor12Medium } : { ...Fonts.grayColor12Medium }
                            }>
                                {date.day}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
                theme={{
                    calendarBackground: Colors.bodyBackColor,
                    textSectionTitleColor: Colors.grayColor,
                    monthTextColor: Colors.grayColor,
                    textMonthFontFamily: 'Roboto_Regular',
                    textDayHeaderFontFamily: 'Roboto_Medium',
                    textMonthFontSize: 14,
                    textDayHeaderFontSize: 14,
                }}
                style={{ marginHorizontal: Sizes.fixPadding - 5.0, }}
            />
        )
    }

    function tripInfo() {
        return (
            <View>
                <ImageBackground
                    source={require('../../assets/images/home_bg.png')}
                    style={{ height: 400.0, }}
                    imageStyle={{ borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }}
                >
                    <View style={styles.tripInfoImageShadowStyle}>
                        <Text style={{ ...Fonts.whiteColor22Black }}>
                            Own a car without actually buying it.
                            So book now...
                        </Text>
                        {pickupLocationInfo()}
                        {startTripInfo()}
                        {endTripInfo()}
                    </View>
                </ImageBackground>
                {findCarsButton()}
            </View>
        )
    }

    function findCarsButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('SearchResults', {
                    item: {
                        selectedLocation: selectedPickupLocation,
                        selectedStartDate: selectedStartDate,
                        selectedEndDate: selectedEndDate,
                        selectedStartTime: `${selectedStartHour}:${selectedStartMinute.toString().length == 1 ? '00' : selectedStartMinute} ${selectedStartAmPm}`,
                        selectedEndTime: `${selectedEndHour}:${selectedEndMinute.toString().length == 1 ? '00' : selectedEndMinute} ${selectedEndAmPm}`,
                    }
                })}
                style={styles.findCarsButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Find Cars
                </Text>
            </TouchableOpacity>
        )
    }

    function endTripInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ currentTabIndex: 1, showStartTripEndTripSheet: true })}
                style={{ marginVertical: Sizes.fixPadding * 2.0, }}
            >
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.whiteColor14Regular }}>
                    End Trip
                </Text>
                <View style={styles.startAndEndTripInfoWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor15Regular }}>
                        {selectedEndDate},{' '}
                        {selectedEndHour}:{selectedEndMinute.toString().length == 1 ? `0${selectedEndMinute}` : selectedEndMinute}
                        { } {selectedEndAmPm}
                    </Text>
                    <MaterialCommunityIcons name="calendar-month" size={24} color={Colors.whiteColor} />
                </View>
            </TouchableOpacity>
        )
    }

    function startTripInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ currentTabIndex: 0, showStartTripEndTripSheet: true })}
            >
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.whiteColor14Regular }}>
                    Start Trip
                </Text>
                <View style={styles.startAndEndTripInfoWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor15Regular }}>
                        {selectedStartDate},{' '}
                        {selectedStartHour}:{selectedStartMinute.toString().length == 1 ? `0${selectedStartMinute}` : selectedStartMinute}
                        { } {selectedStartAmPm}
                    </Text>
                    <MaterialCommunityIcons name="calendar-month" size={24} color={Colors.whiteColor} />
                </View>
            </TouchableOpacity>
        )
    }
    
    function pickupLocationInfo() {
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [markers, setMarkers] = useState([]);
        const [searchQuery, setSearchQuery] = useState('');
        const [search, setSearch] = useState()
        const citiesInMorocco = [
            "Casablanca",
            "Rabat",
            "Marrakech",
            "tanger",
            "fes",
            "Agadir",
            "sale"
            // Add more cities here
        ];
        const currentLocation = async() => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Please grant location permissions");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            // setLocation(currentLocation.coords);
           console.log({ 'latitude': currentLocation.coords.latitude, 'longitude': currentLocation.coords.longitude });

            setCoordinate({ 'latitude': currentLocation.coords.latitude, 'longitude': currentLocation.coords.longitude })
        }
        const handleMapPress = (e) => {
            const { coordinate } = e.nativeEvent;
            setCoordinate(coordinate);
            console.log(coordinate)
        };

        const handleMarkerDragEnd = (e, markerIndex) => {
            const newMarkers = [...markers];
            console.log(e.nativeEvent)
            newMarkers[markerIndex] = e.nativeEvent.coordinate;
            setMarkers(newMarkers);
        };
        const renderMarkers = () => {
            return markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={marker}
                    title={`Marker ${index + 1}`}
                    draggable
                    onDragEnd={(e) => handleMarkerDragEnd(e, index)}
                />
            ));
        };
        const toggleModal = () => {
            setIsModalVisible(!isModalVisible);
        };
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, }}>
                <Text style={{ ...Fonts.whiteColor14Regular }}>
                    Select Pick-up Location
                </Text>
                <Menu
                    visible={showPickupLocationOptions}
                    style={{ width: '90%', paddingTop: Sizes.fixPadding, maxHeight: height - 100.0 }}
                    anchor={
                        <View style={styles.pickupLocationWrapStyle}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ showPickupLocationOptions: true })}
                            >

                                {search ? (<Text style={{ flex: 1, ...Fonts.whiteColor15Regular }}>{search}</Text>) : (
                                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.whiteColor15Regular }}>
                                        choose location
                                    </Text>)}

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                                <FontAwesome5 name="map-marked-alt" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    }
                    onRequestClose={() => updateState({ showPickupLocationOptions: false })}
                >
                    <View>
                        <TextInput
                            placeholder="Search..."
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {citiesInMorocco
                            .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((item, index) => (
                                <Text
                                    key={index}
                                    style={{ marginHorizontal: Sizes.fixPadding, marginBottom: Sizes.fixPadding, ...Fonts.blackColor15Regular }}
                                    // onPress={() => updateState({ selectedPickupLocation: item, showPickupLocationOptions: false })}
                                    onPress={() => setSearch(item)}
                                // onPress={() =>console.log(index) }
                                >
                                    {item}
                                </Text>
                            ))
                        }
                    </ScrollView>
                </Menu>
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={toggleModal}
                    style={{
                        height: '70%', // Set the modal height to 70% of the screen's height
                        justifyContent: 'flex-end',

                    }}
                >
                    <View styles={{ padding: 10 }}>
                        <View styles={{ backgroundColor: 'white', flexDirection: 'column' }}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                                <MaterialIcons name="cancel" size={28} color="white" />
                            </TouchableOpacity>
                            {/* <GooglePlacesAutocomplete
                               styles={{top:40}}
                                placeholder='Search'
                                onPress={(data, details = null) => {
                                    // 'details' is provided when fetchDetails = true
                                    console.log(data, details);
                                }}
                                query={{
                                    key: 'AIzaSyDNoxrcP1uAEegGT_ujLtGRiCMQynezI38',
                                    language: 'en',
                                }}
                            /> */}

                            <View style={styles.searcOnTheMap}>
                                <TextInput
                                    placeholder="Search..."

                                />
                                <TouchableOpacity onPress={currentLocation}>
                                    <MaterialIcons name="my-location" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={styles.container}>
                            <MapView style={styles.map} onPress={handleMapPress}>
                                {coordinate && <Marker coordinate={coordinate}
                                    draggable
                                    onDragEnd={(e) => handleMarkerDragEnd(e)}
                                />}
                                {renderMarkers()}
                            </MapView>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.whiteColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.whiteColor18SemiBold }}>
                    Track Your Truck
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '80%',
        flexDirection: 'column',
    },
    map: {
        flex: 1,
    },
    closeButton: {
        padding: 5,
        alignItems: 'flex-end'
    },
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 6.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding * 5.0,
        borderBottomRightRadius: Sizes.fixPadding * 5.0,
    },
    pickupLocationWrapStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 3.0
    },
    searcOnTheMap: {
        backgroundColor: 'white',
        marginTop: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 3.0
    },
    confirmButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
    },
    startAndEndTripInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 3.0,
    },
    findCarsButtonStyle: {
        zIndex: 1,
        position: 'absolute',
        bottom: -25.0,
        left: Sizes.fixPadding * 7.0,
        right: Sizes.fixPadding * 7.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
    },
    tripInfoImageShadowStyle: {
        paddingTop: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    hotDealsCarInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        alignSelf: 'flex-start',
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding,
        marginRight: Sizes.fixPadding,
    },
    hotDealsOfferWrapStyle: {
        position: 'absolute',
        top: -7.5,
        alignSelf: 'flex-start',
        paddingHorizontal: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    hotDealCarImageWrapStyle: {
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginTop: -Sizes.fixPadding,
        width: 130.0,
        height: 60.0,
    },
    bottomSheetTimeInfoWrapStyle: {
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 10.0,
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding + 5.0,
        elevation: 2.0,
    },
    bottomSheetDividerStyle: {
        marginHorizontal: Sizes.fixPadding + 10.0,
        marginVertical: Sizes.fixPadding,
        backgroundColor: '#D2D2D2',
        height: 1.0,
    },
    startTripEndTripSheetWrapStyle: {
        elevation: 2.0,
        backgroundColor: Colors.bodyBackColor,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
    },
    calenderDateWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 25.0,
        height: 25.0,
        borderRadius: Sizes.fixPadding - 7.0,
        borderWidth: 1.0,
    },
    latestOfferBgImageStyle: {
        minWidth: 150.0,
        height: 80.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginRight: Sizes.fixPadding,
        overflow: 'hidden'
    },
    latestOfferImageShadowStyle: {
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
    },
    availableCarsButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
    },
    availableCarsForwardIconWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40.0,
        height: 40.0,
    }
});

export default HomeScreen;