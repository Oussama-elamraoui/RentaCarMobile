import React, { useEffect, useState, useContext } from "react";
import { FlatList, SafeAreaView, View, StatusBar, TouchableOpacity, TouchableHighlight, Animated, Image, StyleSheet, Text, Dimensions, ScrollView,ActivityIndicator } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import axios from "axios";
import { BottomSheet } from '@rneui/themed';
import { Calendar } from "react-native-calendars";
import { Menu } from 'react-native-material-menu';
import AnimatedLoader from 'react-native-animated-loader';
import Spinner from 'react-native-loading-spinner-overlay';

const savedList = [
    {
        key: '1',
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
        key: '2',
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
        key: '3',
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
];
const { height } = Dimensions.get('window');
const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Suptember', 'October', 'November', 'December'];

const hoursList = [...range(1, 12)];

const minutesList = [...range(0, 59)];

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
const rowSwipeAnimatedValues = {};

Array(savedList.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const SavedScreen = ({ navigation }) => {
    const [state, setState] = useState({
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
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState()
    const [loading, setLoading] = useState(false)
    const [listData, setListData] = useState(savedList);
    const paymentMethodsList = [
        {
            id: '1',
            paymentMethodIcon: require('../../assets/images/paymentMethods/credit_card.png'),
            paymentMethod: 'RABAT',
        },
        {
            id: '2',
            paymentMethodIcon: require('../../assets/images/paymentMethods/paypal.png'),
            paymentMethod: 'Casa',
        },
        {
            id: '3',
            paymentMethodIcon: require('../../assets/images/paymentMethods/google_pay.png'),
            paymentMethod: 'Ford',
        },
        {
            id: '4',
            paymentMethodIcon: require('../../assets/images/paymentMethods/stripe.png'),
            paymentMethod: 'Near me',
        },
        {
            id: '5',
            paymentMethodIcon: require('../../assets/images/paymentMethods/payU.png'),
            paymentMethod: '4*4',
        },
    ];
    useEffect(() => {
        axios('api', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', // Adjust the content type as needed
                // You may need to include other headers here, such as authentication tokens
            },
            data: JSON.stringify({})
        }).then(res => {

        }).catch(e => {
            console.log('error is : ', e)
        })
    }, [])
    const updateState = (data) => setState((state) => ({ ...state, ...data }))
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };
    const renderHiddenItem = (data, rowMap) => (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.backDeleteContinerStyle}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 50],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <MaterialIcons
                        name="delete"
                        size={22}
                        color={Colors.whiteColor}
                        style={{ alignSelf: 'center' }}
                    />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setShowSnackBar(true);
        setListData(newData);
        axios('api', {
            method: 'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Adjust the content type as needed
                // You may need to include other headers here, such as authentication tokens
            },
            data: JSON.stringify({})
        }).then(res => {

        }).catch(e => {
            console.log('error : ', e)
        })
    };
    const book =async () => {
        setLoading(true)
        console.log(selectedStartDate)
        console.log(selectedEndDate)
        console.log(`${selectedStartHour}:${selectedStartMinute.toString().length == 1 ? '00' : selectedStartMinute} ${selectedStartAmPm}`)
        console.log(`${selectedEndHour}:${selectedEndMinute.toString().length == 1 ? '00' : selectedEndMinute} ${selectedEndAmPm}`,)
        const response = await  axios('api', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', // Adjust the content type as needed
                // You may need to include other headers here, such as authentication tokens
            },
            data:JSON.stringify({})
        }).then(res=>{
            setLoading(false)

        }).catch(e=>{
            console.log('error : ', e)
            setLoading(false)
        })

    }
    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };
    const [isVisibleDateInputs, setIsVisibleDateInputs] = useState('')

    const renderItem = data => (
        <TouchableHighlight
            style={{ backgroundColor: Colors.bodyBackColor }}
            activeOpacity={0.9}
        >
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <View style={styles.vehicaleInfoWrapStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, }}>
                            <Text>
                                <Text style={{ ...Fonts.blackColor16Medium }}>
                                    {data.item.carBrand}
                                </Text>
                                <Text>
                                    {' '}
                                </Text>
                                <Text style={{ ...Fonts.grayColor12Regular }}>
                                    {data.item.carType}
                                </Text>
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                {data.item.carModel}
                            </Text>
                            <Text style={{ marginVertical: Sizes.fixPadding - 8.0, }}>
                                <Text style={{ ...Fonts.primaryColor16Medium }}>
                                    {`$`}{data.item.amountPerDay}
                                </Text>
                                <Text style={{ ...Fonts.grayColor14Regular }}>
                                    { } | day
                                </Text>
                            </Text>
                        </View>
                        <View style={{ width: 150.0, height: 70.0, }}>
                            <Image
                                source={data.item.carImage}
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
                            {data.item.location}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor14Regular }}>
                            {data.item.rating.toFixed(1)}
                        </Text>
                        <MaterialIcons
                            name="star"
                            color={Colors.yellowColor}
                            size={14}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {vehicaleFunctionalityesSort({ icon: require('../../assets/images/icons/seat.png'), value: `${data.item.seats} seats` })}
                        {vehicaleFunctionalityesSort({ icon: require('../../assets/images/icons/petrolpump.png'), value: ' Petrol' })}
                        {vehicaleFunctionalityesSort({ icon: require('../../assets/images/icons/auto.png'), value: ' Auto' })}
                        <View style={styles.bookButtonStyle} >
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => (setIsVisibleDateInputs(isVisibleDateInputs === data.item.key ? '' : data.item.key))}>
                                {/* <Text style={{ ...Fonts.whiteColor16Medium }}>
                                    Book
                                </Text> */}
                                {isVisibleDateInputs === data.item.key ? <AntDesign name="up" size={20} color="white" /> : <AntDesign name="down" size={20} color="white" style={{ top: 3 }} />}


                            </TouchableOpacity>
                        </View>
                    </View>
                    {isVisibleDateInputs === data.item.key ? <>
                        {startTripInfo()}
                        {endTripInfo()}
                        {startTripEndTripSheet()}
                            <TouchableOpacity style={styles.bookButtonStyle} onPress={book}>
                            <Text style={{ ...Fonts.whiteColor16Medium }}>
                                Book
                            </Text>
                            </TouchableOpacity>
                            
                            {loading && <ActivityIndicator size="large" color={Colors.yellowColor}/>}
                            
                    </> : <> 
                    
                        {/* <View style={styles.container}>
                            <Spinner
                                visible={true}
                                textContent={'Loading...'}
                                textStyle={{ color: '#fff' }}
                            />
                           
                        </View> */}
                        </>
                    }

                    {/* {isVisibleDateInputs && <View> </View>} */}
                </View>
            </View>
        </TouchableHighlight>
    );
    function collections() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                // onPress={() => (updateState({ selectedPaymentMethodIndex: index }), setImagePaymentMethod(item.paymentMethodIcon))}
                onPress={() => (setSelectedCategory(index))}
                style={{
                    ...styles.CategoryStyle,
                    shadowColor: selectedCategory == index ? Colors.primaryColor : Colors.grayColor,
                    backgroundColor: selectedCategory == index ? Colors.primaryColor : Colors.whiteColor,
                }}
            >
                {/* <Image
                    source={item.paymentMethodIcon}
                    style={{ width: 40.0, height: 40.0, resizeMode: 'contain', marginBottom: Sizes.fixPadding + 2.0, }}
                /> */}
                <Text numberOfLines={1} style={selectedCategory == index ? { ...Fonts.whiteColor15Regular } : { ...Fonts.blackColor15Regular }}>{/*style={selectedCategory == index ? { ...Fonts.whiteColor15Regular } : { ...Fonts.blackColor15Regular }} */}
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

    function noFavoriteItemsInfo() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons
                    name="heart-outline"
                    color={Colors.grayColor}
                    size={40}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Medium }}>
                    Your Saved List is Empty
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                    {collections()}
                    {listData.length == 0 ?
                        <>
                            {noFavoriteItemsInfo()}
                        </>
                        :
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-60}
                            onSwipeValueChange={onSwipeValueChange}
                            useNativeDriver={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0, }}
                        />
                    }
                    <Snackbar
                        style={styles.snackBarStyle}
                        visible={showSnackBar}
                        onDismiss={() => setShowSnackBar(false)}
                    >
                        Item Remove From Saved.
                    </Snackbar>
                </View>
            </View>
        </SafeAreaView>
    );

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
                    Saved
                </Text>
            </View>
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
    function endTripInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ currentTabIndex: 1, showStartTripEndTripSheet: true })}
                style={{ marginVertical: Sizes.fixPadding * 2.0, }}
            >
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Regular }}>
                    End Trip
                </Text>
                <View style={styles.startAndEndTripInfoWrapStyle}>
                    <Text style={{ ...Fonts.blackColor16Regular }}>
                        {selectedEndDate},{' '}
                        {selectedEndHour}:{selectedEndMinute.toString().length == 1 ? `0${selectedEndMinute}` : selectedEndMinute}
                        { } {selectedEndAmPm}
                    </Text>
                    <MaterialCommunityIcons name="calendar-month" size={24} color={Colors.blackColor} />
                </View>
            </TouchableOpacity>
        )
    }
    function startTripEndTripSheet() {
        return (
            <BottomSheet
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
                    <View style={styles.bottomSheetDividerStyle} />
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
            </BottomSheet>
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
    function startTripInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ currentTabIndex: 0, showStartTripEndTripSheet: true })}
            >
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor }}>
                    Start Trip
                </Text>
                <View style={styles.startAndEndTripInfoWrapStyle}>
                    <Text style={{ ...Fonts.blackColor16Regular }}>
                        {selectedStartDate},{' '}
                        {selectedStartHour}:{selectedStartMinute.toString().length == 1 ? `0${selectedStartMinute}` : selectedStartMinute}
                        { } {selectedStartAmPm}
                    </Text>
                    <MaterialCommunityIcons name="calendar-month" size={24} color={Colors.blackColor} />
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    lottie: {
        width: 100,
        height: 100,
    },
    calenderDateWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 25.0,
        height: 25.0,
        borderRadius: Sizes.fixPadding - 7.0,
        borderWidth: 1.0,
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
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
    },
    startAndEndTripInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 3.0,
    },
    vehicaleInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    CategoryStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: 100.0,
        alignItems: 'center',
        elevation: 3.0,
        paddingTop: Sizes.fixPadding + 10.0,
        marginRight: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding + 2.0,
    },
    bookButtonStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 3.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
    backDeleteContinerStyle: {
        height:'76%',
        alignItems: 'center',
        bottom: 10,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 60,
        backgroundColor: Colors.redColor,
        right: 0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
    },
});

export default SavedScreen;
