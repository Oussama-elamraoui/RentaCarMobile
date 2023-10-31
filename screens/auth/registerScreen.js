import React, { useContext, useRef,useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { AuthContext } from "../../context/context";
import PhoneInput from "react-native-phone-number-input";
const { height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {

    const [state, setState] = useState({
        prenom: null,
        nom:null,
        email: null,
        telephone: null,
        password: null,
        secureText: true,
        confirmPassword: null,
        confirmSecureText: true,
        agree: false,
        type:'client',
    })
   
    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        prenom,
        nom,
        email,
        telephone,
        password,
        secureText,
        password_confirmation,
        confirmSecureText,
        agree,
        type
    } = state;
    const { register,userInfo,testLogin  } = useContext(AuthContext);
    const callregister = () => {
        (async () => {
            await register(state);
            console.log('userInfo');
            if (testLogin) {
                // navigation.push('Verification');
                navigation.push('BottomTabBar')
            } else {
                console.log("Please Try again");
            }
        })();


    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {registerTextWithBackArrow()}
                    {firstNameTextField()}
                    {SecondNameTextField()}
                    {emailTextField()}
                    {mobileNumberTextField()}
                    {passwordTextField()}
                    {confirmPasswordTextField()}
                    {agreeInfo()}
                    {registerButton()}
                    {orIndicator()}
                    {continueWithInfo()}
                    {alreadyAccountInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function alreadyAccountInfo() {
        return (
            <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center' }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Already have an account?
                </Text>
                <Text>
                    {` `}
                </Text>
                <Text
                    onPress={() => navigation.push('Login')}
                    style={{ ...Fonts.primaryColor14Medium }}
                >
                    Login Now
                </Text>
            </Text>
        )
    }

    function continueWithInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0, alignItems: 'center' }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    continue via your social
                </Text>
                <View style={{ marginVertical: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    {socialMediaOptionsSort({ bgColor: '#3B5998', iconName: 'facebook' })}
                    {socialMediaOptionsSort({ bgColor: '#EB4035', iconName: 'google' })}
                    {socialMediaOptionsSort({ bgColor: '#1DA1F2', iconName: 'twitter' })}
                </View>
            </View>
        )
    }

    function socialMediaOptionsSort({ bgColor, iconName }) {
        return (
            <View style={{
                ...styles.socialMediaOptionsWrapStyle,
                backgroundColor: bgColor,
            }}>
                <FontAwesome name={iconName} size={24} color={Colors.whiteColor} />
            </View>
        )
    }

    function orIndicator() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 8.0, flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ flex: 1, height: 1.0, backgroundColor: Colors.lightGrayColor, }} />
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.primaryColor16Medium }}>
                    or
                </Text>
                <View style={{ flex: 1, height: 1.0, backgroundColor: Colors.lightGrayColor, }} />
            </View>
        )
    }

    function registerButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    callregister()
                }}
                // onPress={() => navigation.push('Verification')}
                style={styles.registerButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Register
                </Text>
            </TouchableOpacity>
        )
    }

    function agreeInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ agree: !agree })}
                    style={{
                        ...styles.checkBoxStyle,
                        backgroundColor: agree ? Colors.primaryColor : 'transparent'
                    }}
                >
                    {
                        agree ?
                            <MaterialIcons
                                name="done"
                                color={Colors.whiteColor}
                                size={13}
                            />
                            :
                            null
                    }
                </TouchableOpacity>
                <Text style={{ marginLeft: Sizes.fixPadding, }}>
                    <Text style={{ ...Fonts.primaryColor13Regular }}>
                        By creating account you agree to our { }
                        <Text style={{ ...Fonts.primaryColor13Medium }}>
                            terms & conditions
                        </Text>
                        { } and { }
                        <Text style={{ ...Fonts.primaryColor13Medium }}>
                            privacy policy
                        </Text>
                    </Text>
                </Text>
            </View>
        )
    }

    function confirmPasswordTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="lock"
                        color={Colors.primaryColor}
                        size={20}
                    />
                    <TextInput
                        value={password_confirmation}
                        onChangeText={(value) => updateState({ password_confirmation: value })}
                        placeholder="Confirm Password"
                        placeholderTextColor={Colors.grayColor}
                        cursorColor={Colors.primaryColor}
                        style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Medium, flex: 1, height: 20.0, }}
                        secureTextEntry={confirmSecureText}
                    />
                </View>
                <MaterialIcons
                    name={confirmSecureText ? "visibility-off" : 'visibility'}
                    color={Colors.grayColor}
                    size={16}
                    onPress={() => updateState({ confirmSecureText: !confirmSecureText })}
                />
            </View>
        )
    }

    function passwordTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="lock"
                        color={Colors.primaryColor}
                        size={20}
                    />
                    <TextInput
                        value={password}
                        onChangeText={(value) => updateState({ password: value })}
                        placeholder="Create Password"
                        placeholderTextColor={Colors.grayColor}
                        cursorColor={Colors.primaryColor}
                        style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Medium, flex: 1, height: 20.0, }}
                        secureTextEntry={secureText}
                    />
                </View>
                <MaterialIcons
                    name={secureText ? "visibility-off" : 'visibility'}
                    color={Colors.grayColor}
                    size={16}
                    onPress={() => updateState({ secureText: !secureText })}
                />
            </View>
        )
    }

    function mobileNumberTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
                    name="phone-android"
                    color={Colors.primaryColor}
                    size={20}
                />
                <PhoneInput
                    
                    defaultValue={state.mobileNo}
                    defaultCode="US"
                    layout="first"
                    cursorColor={Colors.primaryColor}
                    placeholderTextColor={Colors.grayColor}
                    countryPickerProps={{ withAlphaFilter: true }}
                    onChangeText={(value) => updateState({ telephone: value })}
                    withShadow
                   
                />
            </View>
        )
    }

    function emailTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
                    name="email"
                    color={Colors.primaryColor}
                    size={20}
                />
                <TextInput
                    value={email}
                    onChangeText={(value) => updateState({ email: value })}
                    placeholder="Email"
                    placeholderTextColor={Colors.grayColor}
                    cursorColor={Colors.primaryColor}
                    style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Medium, flex: 1, height: 20.0, }}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function firstNameTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
                    name="person"
                    color={Colors.primaryColor}
                    size={20}
                />
                <TextInput
                    value={prenom}
                    onChangeText={(value) => updateState({ prenom: value })}
                    placeholder="First Name"
                    placeholderTextColor={Colors.grayColor}
                    cursorColor={Colors.primaryColor}
                    style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Medium, flex: 1, height: 20.0, }}
                />
            </View>
        )
    }
    function SecondNameTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
                    name="person"
                    color={Colors.primaryColor}
                    size={20}
                />
                <TextInput
                    value={nom}
                    onChangeText={(value) => updateState({ nom: value })}
                    placeholder="Last Name"
                    placeholderTextColor={Colors.grayColor}
                    cursorColor={Colors.primaryColor}
                    style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Medium, flex: 1, height: 20.0, }}
                />
            </View>
        )
    }
    function registerTextWithBackArrow() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor22Bold }}>
                    Register
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
    textFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    checkBoxStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 16.0,
        height: 16.0,
        borderRadius: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
    },
    socialMediaOptionsWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 3.0
    },
});

export default RegisterScreen;