import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, TouchableOpacity, StyleSheet, TextInput, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RadialSlider } from 'react-native-radial-slider';

const BookingStep2Screen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedIdentificationIndex: 1,
        nationalIdNumber: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        selectedIdentificationIndex,
        nationalIdNumber,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding, }}>
                    {progressIndicator()}
                    {identificationOptions()}
                    {nationalIdNumberTextField()}
                    {idPhotoInfo()}
                    {nextButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function nextButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BookingStep3')}
                style={styles.nextButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Next
                </Text>
            </TouchableOpacity>
        )
    }

    function idPhotoInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, }}>
                <Text style={{ textAlign: 'center', marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Regular }}>
                    Upload your ID photo
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding * 5.0, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, marginRight: Sizes.fixPadding * 2.5, }}>
                        <View style={styles.frontAndBackPhotoUploadInfoWrapStyle}>
                            <MaterialIcons
                                name="add"
                                color={Colors.blackColor}
                                size={30}
                            />
                        </View>
                        <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                            Front
                        </Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding * 2.5, }}>
                        <View style={styles.frontAndBackPhotoUploadInfoWrapStyle}>
                            <MaterialIcons
                                name="add"
                                color={Colors.blackColor}
                                size={30}
                            />
                        </View>
                        <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                            Back
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function nationalIdNumberTextField() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, ...styles.textFieldInfoWrapStyle }}>
                <MaterialCommunityIcons name="card-account-details" size={22} color={Colors.primaryColor} style={{ marginRight: Sizes.fixPadding }} />
                <TextInput
                    value={nationalIdNumber}
                    onChangeText={(value) => updateState({ nationalIdNumber: value })}
                    placeholder="National ID Number"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, height: 20.0, ...Fonts.blackColor14Medium }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function identificationOptions() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                {identificationOptionsSort({ index: 1, option: 'National ID' })}
                {identificationOptionsSort({ index: 2, option: 'Passport' })}
            </View>
        )
    }

    function identificationOptionsSort({ index, option }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedIdentificationIndex: index })}
                style={{ alignSelf: 'flex-start', marginBottom: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center' }}
            >
                <View style={{
                    ...styles.radioButtonStyle,
                    borderColor: selectedIdentificationIndex == index ? Colors.primaryColor : Colors.grayColor,
                }}>
                    {
                        selectedIdentificationIndex == index
                            ?
                            <View style={{ width: 8.0, height: 8.0, borderRadius: 4.0, backgroundColor: Colors.primaryColor }} />
                            :
                            null
                    }
                </View>
                <Text style={{ marginLeft: Sizes.fixPadding, ...selectedIdentificationIndex == index ? { ...Fonts.primaryColor16Regular } : { ...Fonts.grayColor16Regular } }}>
                    {option}
                </Text>
            </TouchableOpacity>
        )
    }

    function progressIndicator() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'center' }}>
                <RadialSlider
                    value={60}
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
                    Identification
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
    radioButtonStyle: {
        width: 15.0,
        height: 15.0,
        borderRadius: 7.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0,
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
    frontAndBackPhotoUploadInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.grayColor,
        borderStyle: 'dashed',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
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

export default BookingStep2Screen;