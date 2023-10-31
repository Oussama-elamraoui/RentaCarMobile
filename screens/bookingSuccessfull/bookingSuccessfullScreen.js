import React, { useCallback } from "react";
import { SafeAreaView, View, StatusBar, BackHandler, ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

const BookingSuccessfullScreen = ({ navigation }) => {

    const backAction = () => {
        navigation.push('BottomTabBar');
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}
                >
                    {successIcon()}
                    {successfullText()}
                    {summaryInfo()}
                    {backToHomeButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function backToHomeButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BottomTabBar')}
                style={styles.backToHomeButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Back to Home
                </Text>
            </TouchableOpacity>
        )
    }

    function summaryInfo() {
        return (
            <View style={styles.summaryInfoWrapStyle}>
                <Text style={styles.starIconStyle}>
                    *
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding + 2.0, textAlign: 'center', ...Fonts.blackColor18Medium }}>
                    Summary
                </Text>
                {carInfo()}
                {pickupAndReturnInfo()}
                {tripDateInfo()}
                {feesInfo()}
            </View>
        )
    }

    function feesInfo() {
        return (
            <View style={styles.feesInfoWrapStyle}>
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

    function tripDateInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Trip Dates
                </Text>
                <Text style={{ ...Fonts.blackColor15Regular }}>
                    15 April, 11:00 am - 17 April, 6:00 pm
                </Text>
            </View>
        )
    }

    function pickupAndReturnInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Pick-up and Return
                </Text>
                <Text style={{ ...Fonts.blackColor15Regular }}>
                    Washington Manchester - Same location
                </Text>
            </View>
        )
    }

    function carInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Car
                </Text>
                <Text style={{ ...Fonts.blackColor15Regular }}>
                    Mercedes
                </Text>
            </View>
        )
    }

    function successfullText() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
                <Text style={{ marginVertical: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor18Medium }}>
                    Booked Successfully
                </Text>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor14Regular }}>
                    {`You’ve booked Mercedes Bens w176 successfully.\nGo to My Booking for more booking details.`}
                </Text>
            </View>
        )
    }

    function successIcon() {
        return (
            <Feather
                name="check-circle"
                size={70}
                color={Colors.primaryColor}
                style={{ alignSelf: 'center' }}
            />
        )
    }
}

const styles = StyleSheet.create({
    feesInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding + 5.0,
    },
    starIconStyle: {
        position: 'absolute',
        alignSelf: 'center',
        top: -10.0,
        paddingHorizontal: Sizes.fixPadding * 4.5,
        ...Fonts.primaryColor15Bold,
        backgroundColor: Colors.bodyBackColor
    },
    summaryInfoWrapStyle: {
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding,
    },
    backToHomeButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
    }
});

export default BookingSuccessfullScreen;