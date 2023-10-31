import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const SupportScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: null,
        email: null,
        message: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        email,
        message,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {supportText()}
                    {callUsAndMailUsButton()}
                    {divider()}
                    {sendMessageInfo()}
                    {submitButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.submitButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Submit
                </Text>
            </TouchableOpacity>
        )
    }

    function sendMessageInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Medium }}>
                    Or Send your message
                </Text>
                {fullNameTextField()}
                {emailTextField()}
                {messageTextField()}
            </View>
        )
    }

    function messageTextField() {
        return (
            <TextInput
                placeholder="Message"
                placeholderTextColor={Colors.grayColor}
                value={message}
                onChangeText={(value) => updateState({ message: value })}
                style={styles.textFieldStyle}
                selectionColor={Colors.primaryColor}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
            />
        )
    }

    function emailTextField() {
        return (
            <TextInput
                placeholder="Email"
                placeholderTextColor={Colors.grayColor}
                value={email}
                onChangeText={(value) => updateState({ email: value })}
                style={{ ...styles.textFieldStyle, marginVertical: Sizes.fixPadding }}
                selectionColor={Colors.primaryColor}
            />
        )
    }

    function fullNameTextField() {
        return (
            <TextInput
                placeholder="Full Name"
                placeholderTextColor={Colors.grayColor}
                value={name}
                onChangeText={(value) => updateState({ name: value })}
                style={styles.textFieldStyle}
                selectionColor={Colors.primaryColor}
            />
        )
    }

    function divider() {
        return (
            <View style={{
                backgroundColor: Colors.lightGrayColor, height: 1.0,
                margin: Sizes.fixPadding * 2.0,
            }} />
        )
    }

    function callUsAndMailUsButton() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 6.0, flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ ...styles.callUsButtonStyle, }}>
                    <MaterialIcons
                        name="call"
                        color={Colors.whiteColor}
                        size={20}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.whiteColor16Medium }}>
                        Call us
                    </Text>
                </View>
                <View style={{ ...styles.mailUsButtonStyle, }}>
                    <MaterialIcons
                        name="mail"
                        color={Colors.primaryColor}
                        size={20}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor16Medium }}>
                        Mail us
                    </Text>
                </View>
            </View>
        )
    }

    function supportText() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    We’re Happy to hear from you !
                </Text>
                <Text style={{ ...Fonts.grayColor13Regular }}>
                    Let us know your queries and feedbacks
                </Text>
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
                    Support
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
    callUsButtonStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        backgroundColor: Colors.primaryColor,
        shadowColor: Colors.primaryColor,
        elevation: 5.0,
        marginRight: Sizes.fixPadding,
    },
    mailUsButtonStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        backgroundColor: Colors.bodyBackColor,
        marginLeft: Sizes.fixPadding,
    },
    textFieldStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    submitButtonStyle: {
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

export default SupportScreen;