import React, { useState,useContext,useRef,useEffect } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, TouchableOpacity, Dimensions, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { CircleFade } from 'react-native-animated-spinkit';
import OTPTextView from 'react-native-otp-textinput';
import { Overlay } from "@rneui/themed";
import { AuthContext } from "../../context/context";
const { height } = Dimensions.get('window');
import firebase from "firebase/compat/app";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfiguration } from "../../config";
const VerificationScreen = ({ navigation }) => {
    const {phoneNum,verificationId} = useContext(AuthContext);
    const [otpInput, setotpInput] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [code, setCode] = useState('');
    const recaptchaVerifier = useRef(null)




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {/* <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfiguration}
            /> */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {verificationTextWithBackArrow()}
                    {informationText()}
                    {otpInfo()}
                    {continueButton()}
                </ScrollView>
            </View>
            {loadingDialog()}
        </SafeAreaView>
    )

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    setisLoading(true)
                    setTimeout(() => {
                        setisLoading(false)
                        navigation.push('BottomTabBar')
                    }, 2000);
                }}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function loadingDialog() {
        return (
            <Overlay
                isVisible={isLoading}
                overlayStyle={{ width: '80%', borderRadius: Sizes.fixPadding - 5.0, padding: 0.0 }}
            >
                <View style={styles.dialogWrapStyle}>
                    <CircleFade size={56} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor16Regular,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Please wait...
                    </Text>
                </View>
            </Overlay>
        );
    }

    function otpInfo() {
        return (
            <OTPTextView
                containerStyle={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 4.0, }}
                handleTextChange={(text) => {
                    setotpInput(text)
                    if (otpInput.length == 4) {
                        setisLoading(true)
                        // setTimeout(() => {
                        //     setisLoading(false)
                        //     navigation.push('BottomTabBar')
                        // }, 2000);
                    }
                }}
                inputCount={4}
                keyboardType="numeric"
                tintColor={Colors.primaryColor}
                offTintColor={Colors.bgColor}
                textInputStyle={{ ...styles.textFieldStyle }}
            />
        )
    }

    function informationText() {
        return (
            <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.blackColor14Regular }}>
                {`Enter 4 digit verification code. We just sent you on\n+91 12365474690`}
            </Text>
        )
    }

    function verificationTextWithBackArrow() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor22Bold }}>
                    Verification
                </Text>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => navigation.pop()}
                    style={{ position: 'absolute', left: 0.0, zIndex: 1 }}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={{ width: height / 8.0, height: height / 8.0, resizeMode: 'contain' }}
                />
                <Text style={{ ...Fonts.whiteColor22Medium }}>
                    Carental
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.primaryColor,
        height: height / 3.5,
        borderBottomLeftRadius: Sizes.fixPadding * 3.0,
        borderBottomRightRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20.0,
        shadowColor: Colors.primaryColor,
    },
    otpFieldsWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
    },
    textFieldStyle: {
        borderBottomWidth: null,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        elevation: 3.0,
        ...Fonts.blackColor18Medium,
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
    dialogWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding * 2.0,
    },
});

export default VerificationScreen;