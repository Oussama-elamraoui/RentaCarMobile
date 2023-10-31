import React, { useState, useContext, useCallback, useEffect } from "react";
import { BackHandler, SafeAreaView, Dimensions, View, StatusBar, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native"
import { AuthContext } from "../../context/context";
const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const [isEmpty, setIsEmpty] = useState(true)
    const { login, userInfo, isLoggedIn,testLogin } = useContext(AuthContext);
    useEffect(() => {
        testIsLogged()

    }, []);

    const testIsLogged = async () => {

        const response = await isLoggedIn()
        for (let key in userInfo) {
            console.log(key);
            setIsEmpty(false)
            break;
        }
        console.log(isEmpty)
        if (!isEmpty) {
            navigation.push('BottomTabBar');
        }
    }
    const calllogin = () => {


        (async () => {

            await login(state.email, state.password)
            if (testLogin) {
                navigation.push('BottomTabBar');
                
            } else {
                
                console.log("Please register");
            }
        })([]);
    }
    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }
    const context = useContext(AuthContext)
    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        email: null,
        password: null,
        secureText: true,
        rememberPassword: false,
        backClickCount: 0,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        email,
        password,
        secureText,
        rememberPassword,
        backClickCount,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} >
                    {loginTitle()}
                    {emailTextField()}
                    {passwordTextField()}
                    {rememberPassordAndForgetInfo()}
                    {loginButton()}
                    {orIndicator()}
                    {continueWithInfo()}
                    {dontAccountInfo()}
                </ScrollView>
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function dontAccountInfo() {
        return (
            <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center' }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Don’t have an account?
                </Text>
                <Text>
                    {` `}
                </Text>
                <Text
                    onPress={() => navigation.push('Register')}
                    style={{ ...Fonts.primaryColor14Medium }}
                >
                    Register Now
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

    function loginButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => calllogin()}
                style={styles.loginButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Login
                </Text>
            </TouchableOpacity>
        )
    }

    function rememberPassordAndForgetInfo() {
        return (
            <View style={styles.rememberPassordAndForgetInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ rememberPassword: !rememberPassword })}
                        style={{
                            ...styles.checkBoxStyle,
                            backgroundColor: rememberPassword ? Colors.primaryColor : 'transparent'
                        }}
                    >
                        {
                            rememberPassword ?
                                <MaterialIcons
                                    name="done"
                                    color={Colors.whiteColor}
                                    size={13}
                                />
                                :
                                null
                        }
                    </TouchableOpacity>
                    <Text style={{ marginLeft: Sizes.fixPadding - 3.0, ...Fonts.primaryColor13Regular }}>
                        Remember password
                    </Text>
                </View>
                <Text style={{ ...Fonts.redColor13Regular }}>
                    Forget password?
                </Text>
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
                        placeholder="Password"
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

    function loginTitle() {
        return (
            <Text style={{ textAlign: 'center', margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor22Bold }}>
                Login
            </Text>
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
    rememberPassordAndForgetInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Sizes.fixPadding - 5.0,
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
    loginButtonStyle: {
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
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default LoginScreen;