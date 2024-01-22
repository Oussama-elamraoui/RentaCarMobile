import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Dimensions, ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu } from 'react-native-material-menu';
import Modal from 'react-native-modal';
import { Calendar } from "react-native-calendars";

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

const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Suptember', 'October', 'November', 'December'];

const hoursList = [...range(1, 12)];

const minutesList = [...range(0, 59)];

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

const { height } = Dimensions.get('window');

const ChangeTimeAndLocationScreen = ({ navigation }) => {

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {pickupLocationInfo()}
                {startTripInfo()}
                {endTripInfo()}
                {continueButton()}
            </View>
            {startTripEndTripSheet()}
        </SafeAreaView>
    )

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.continueAndConfirmButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Continue
                </Text>
            </TouchableOpacity>
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

    function startTripEndTripSheet() {
        return (
            <Modal
                isVisible={showStartTripEndTripSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => { updateState({ showStartTripEndTripSheet: false }) }}
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
            </Modal>
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

    function endTripInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ currentTabIndex: 1, showStartTripEndTripSheet: true })}
                style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}
            >
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    End Trip
                </Text>
                <View style={styles.startAndEndTripInfoWrapStyle}>
                    <Text style={{ ...Fonts.blackColor15Regular }}>
                        {selectedEndDate},{' '}
                        {selectedEndHour}:{selectedEndMinute.toString().length == 1 ? `0${selectedEndMinute}` : selectedEndMinute}
                        { } {selectedEndAmPm}
                    </Text>
                    <MaterialCommunityIcons name="calendar-month" size={24} color={Colors.primaryColor} />
                </View>
            </TouchableOpacity>
        )
    }

    function startTripInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ currentTabIndex: 0, showStartTripEndTripSheet: true })}
                style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 5.0, }}
            >
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Start Trip
                </Text>
                <View style={styles.startAndEndTripInfoWrapStyle}>
                    <Text style={{ ...Fonts.blackColor15Regular }}>
                        {selectedStartDate},{' '}
                        {selectedStartHour}:{selectedStartMinute.toString().length == 1 ? `0${selectedStartMinute}` : selectedStartMinute}
                        { } {selectedStartAmPm}
                    </Text>
                    <MaterialCommunityIcons name="calendar-month" size={24} color={Colors.primaryColor} />
                </View>
            </TouchableOpacity>
        )
    }

    function pickupLocationInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 5.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Pick-up Location
                </Text>
                <Menu
                    visible={showPickupLocationOptions}
                    style={{ width: '90%', paddingTop: Sizes.fixPadding, maxHeight: height - 100.0, }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ showPickupLocationOptions: true })}
                            style={styles.pickupLocationWrapStyle}
                        >
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor15Regular }}>
                                {selectedPickupLocation}
                            </Text>
                            <MaterialCommunityIcons name="chevron-down" size={22} color={Colors.primaryColor} />
                        </TouchableOpacity>

                    }
                    onRequestClose={() => updateState({ showPickupLocationOptions: false })}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            locationsList.map((item, index) => (
                                <Text
                                    key={index}

                                    style={{ marginHorizontal: Sizes.fixPadding, marginBottom: Sizes.fixPadding, ...Fonts.blackColor15Regular }}
                                    onPress={() => updateState({ selectedPickupLocation: item, showPickupLocationOptions: false })}
                                >
                                    {item}
                                </Text>
                            ))
                        }
                    </ScrollView>
                </Menu>
            </View >
        )
    }

    function confirmButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ showStartTripEndTripSheet: false })}
                style={styles.continueAndConfirmButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Confirm
                </Text>
            </TouchableOpacity>
        )
    }

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
                    Time & Location
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
    pickupLocationWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 3.0
    },
    startAndEndTripInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 3.0,
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
    continueAndConfirmButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
    },
});

export default ChangeTimeAndLocationScreen;
