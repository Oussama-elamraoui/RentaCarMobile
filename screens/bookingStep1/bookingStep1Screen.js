import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { RadialSlider } from 'react-native-radial-slider';

const BookingStep1Screen = ({ navigation }) => {

    const [state, setState] = useState({
        fullName: null,
        email: null,
        mobileNumber: null,
        address: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        fullName,
        email,
        mobileNumber,
        address,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding, }}>
                    {progressIndicator()}
                    {fullNameTextField()}
                    {emailTextField()}
                    {mobileNumberTextField()}
                    {addressTextField()}
                    {nextButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function nextButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BookingStep2')}
                style={styles.nextButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Next
                </Text>
            </TouchableOpacity>
        )
    }

    function addressTextField() {
        return (
            <View style={styles.textFieldInfoWrapStyle}>
                <MaterialIcons name="location-pin" size={22} color={Colors.primaryColor} style={{ marginRight: Sizes.fixPadding }} />
                <TextInput
                    value={address}
                    onChangeText={(value) => updateState({ address: value })}
                    placeholder="Address"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, height: 20.0, ...Fonts.blackColor14Medium }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function mobileNumberTextField() {
        return (
            <View style={styles.textFieldInfoWrapStyle}>
                <MaterialIcons name="phone-android" size={22} color={Colors.primaryColor} style={{ marginRight: Sizes.fixPadding }} />
                <TextInput
                    value={mobileNumber}
                    onChangeText={(value) => updateState({ mobileNumber: value })}
                    placeholder="Mobile Number"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, height: 20.0, ...Fonts.blackColor14Medium }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function emailTextField() {
        return (
            <View style={styles.textFieldInfoWrapStyle}>
                <MaterialIcons name="email" size={22} color={Colors.primaryColor} style={{ marginRight: Sizes.fixPadding }} />
                <TextInput
                    value={email}
                    onChangeText={(value) => updateState({ email: value })}
                    placeholder="Email"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, height: 20.0, ...Fonts.blackColor14Medium }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function fullNameTextField() {
        return (
            <View style={styles.textFieldInfoWrapStyle}>
                <MaterialIcons name="person" size={22} color={Colors.primaryColor} style={{ marginRight: Sizes.fixPadding }} />
                <TextInput
                    value={fullName}
                    onChangeText={(value) => updateState({ fullName: value })}
                    placeholder="Full Name"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, height: 20.0, ...Fonts.blackColor14Medium }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function progressIndicator() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'center' }}>
                <RadialSlider
                    value={40}
                    min={0}
                    max={100}
                    onChange={() => { }}
                    radius={30}
                    thumbRadius={8}
                    thumbColor={Colors.primaryColor}
                    thumbBorderWidth={0}
                    sliderWidth={2}
                    sliderTrackColor={Colors.grayColor}
                    variant="radial-circle-slider"
                    disabled={true}
                    isHideCenterContent={true}
                    isHideLines={true}
                    linearGradient={[{ offset: '0%', color: Colors.primaryColor }, { offset: '0%', color: Colors.primaryColor }]}
                    style={{ transform: [{ rotate: '180deg' }] }}
                />
            </View>
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
                    Personal Info
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
    textFieldInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    nextButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
    }
});

export default BookingStep1Screen;