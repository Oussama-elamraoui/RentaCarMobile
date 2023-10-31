import React from "react";
import { SafeAreaView, View, StatusBar, ScrollView, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const ConfirmationScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {informationText()}
                    {carInfo()}
                    {userAndIdDetail()}
                    {tripInfo()}
                    {feesInfo()}
                    {paymentMethodInfo()}
                    {confirmAndBookButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function confirmAndBookButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BookingSuccessfull')}
                style={styles.confirmAndBookButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Confirm & Book
                </Text>
            </TouchableOpacity>
        )
    }

    function paymentMethodInfo() {
        return (
            <View style={{ ...styles.confirmationDetailWrapStyle }}>
                <View style={{ marginBottom: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor15Regular }}>
                        Payment method
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('SelectPaymentMethod')}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <FontAwesome name="edit" size={16} color={Colors.primaryColor} />
                        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor12Medium }}>
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/paymentMethods/credit_card.png')}
                        style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                        **** **** **** 2147
                    </Text>
                </View>
            </View>
        )
    }

    function feesInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, ...styles.confirmationDetailWrapStyle }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor15Regular }}>
                    Rental Fees
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        One day rent
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        $200
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Total of 3 days
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        $600
                    </Text>
                </View>
                <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginVertical: Sizes.fixPadding + 2.0, }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.primaryColor15Medium }}>
                        Total Fees
                    </Text>
                    <Text style={{ ...Fonts.primaryColor15Medium }}>
                        $600.00
                    </Text>
                </View>
            </View>
        )
    }

    function tripInfo() {
        return (
            <View style={styles.confirmationDetailWrapStyle}>
                {pickupAndReturnInfo()}
                {tripDatesInfo()}
            </View>
        )
    }

    function tripDatesInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Trip Dates
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('ChangeTimeAndLocation')}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <FontAwesome name="edit" size={16} color={Colors.primaryColor} />
                        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor12Medium }}>
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginVertical: Sizes.fixPadding - 5.0, ...Fonts.blackColor15Regular }}>
                    15 April, 11:00 am - 17 April, 6:00 pm
                </Text>
                <View style={{ height: 1.0, backgroundColor: Colors.lightGrayColor }} />
            </View>
        )
    }

    function pickupAndReturnInfo() {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Pick-up and Return
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('ChangeTimeAndLocation')}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <FontAwesome name="edit" size={16} color={Colors.primaryColor} />
                        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor12Medium }}>
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginVertical: Sizes.fixPadding - 5.0, ...Fonts.blackColor15Regular }}>
                    Washington Manchester - Same location
                </Text>
                <View style={{ height: 1.0, backgroundColor: Colors.lightGrayColor }} />
            </View>
        )
    }

    function userAndIdDetail() {
        return (
            <View style={{ ...styles.confirmationDetailWrapStyle, marginVertical: Sizes.fixPadding, }}>
                {nameInfo()}
                {mobileNumberInfo()}
                {emailInfo()}
                {nationalIdInfo()}
            </View>
        )
    }

    function nationalIdInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    National ID
                </Text>
                <Text style={{ ...Fonts.blackColor15Regular, }}>
                    297* **** **** ****
                </Text>
            </View>
        )
    }

    function emailInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Email
                </Text>
                <Text style={{ ...Fonts.blackColor15Regular }}>
                    ronaldrichards@gmail.com
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, height: 1.0, backgroundColor: Colors.lightGrayColor }} />
            </View>
        )
    }

    function mobileNumberInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Mobile Number
                </Text>
                <Text>
                    +91 1236547890
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, height: 1.0, backgroundColor: Colors.lightGrayColor }} />
            </View>
        )
    }

    function nameInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Name
                </Text>
                <Text style={{ ...Fonts.blackColor15Regular }}>
                    Ronald Richards
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, height: 1.0, backgroundColor: Colors.lightGrayColor }} />
            </View>
        )
    }

    function carInfo() {
        return (
            <View style={styles.carInfoWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/cars/car8.png')}
                        style={{ width: 90.0, height: 60.0, resizeMode: 'contain' }}
                    />
                    <View style={{ flex: 1, marginRight: Sizes.fixPadding, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor18Medium }}>
                            Mercedes
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor12Regular }}>
                            Bens w176
                        </Text>
                    </View>
                </View>
                <Text>
                    <Text style={{ ...Fonts.primaryColor14Bold }}>
                        $200 { }
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        | day
                    </Text>
                </Text>
            </View>
        )
    }

    function informationText() {
        return (
            <Text style={{ margin: Sizes.fixPadding * 2.0, ...Fonts.primaryColor13Regular }}>
                Please Review Your Request and Confrim
            </Text>
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
                    Confirmation
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
    carInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 7.0,
    },
    confirmationDetailWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 2.0,
        padding: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    confirmAndBookButtonStyle: {
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

export default ConfirmationScreen;
