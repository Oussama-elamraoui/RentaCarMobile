import React, { useState, createRef, useCallback } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, StyleSheet, Image, Dimensions, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const onboardingScreenList = [
    {
        id: '1',
        onboardingImage: require('../../assets/images/onboarding/onboarding1.png'),
        title: 'Download App',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio adipiscing euismod nec, lectus. Aliquam a pellentesque tincidunt auctor.`,
    },
    {
        id: '2',
        onboardingImage: require('../../assets/images/onboarding/onboarding2.png'),
        title: 'Select a Car',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio adipiscing euismod nec, lectus. Aliquam a pellentesque tincidunt auctor.`,
    },
    {
        id: '3',
        onboardingImage: require('../../assets/images/onboarding/onboarding3.png'),
        title: 'Enjoy your Ride',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio adipiscing euismod nec, lectus. Aliquam a pellentesque tincidunt auctor.`,
    },
];

const OnboardingScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

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
        }, 600)
    }

    const [state, setState] = useState({
        backClickCount: 0,
        currentIndex: 0,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { backClickCount, currentIndex } = state;

    const swiperRef = createRef();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <Swiper
                    ref={swiperRef}
                    onIndexChanged={onIndexChanged.bind(this)}
                    index={currentIndex}
                    showsButtons={false}
                    autoplay={true}
                    autoplayTimeout={3.5}
                    showsPagination
                    paginationStyle={{ position: 'absolute', bottom: -13, }}
                    dot={<View style={styles.dotStyle} />}
                    activeDot={<View style={styles.activeDotStyle} />}
                >
                    {page1()}
                    {page2()}
                    {page3()}
                </Swiper>
                {skipNextAndLoginInfo()}
            </View>
            {exitInfo()}
        </SafeAreaView>
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={[styles.animatedView]}>
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        Press Back Once Again to Exit
                    </Text>
                </View>
                :
                null
        )
    }

    function skipNextAndLoginInfo() {
        return (
            <View style={styles.skipNextAndLoginInfoWrapStyle}>
                {
                    currentIndex != 2
                        ?
                        <Text
                            onPress={() => { navigation.push('Login') }}
                            style={{ ...Fonts.grayColor14Medium, }}
                        >
                            Skip
                        </Text>
                        :
                        <Text>
                        </Text>
                }
                {
                    currentIndex == 2
                        ?
                        <Text
                            onPress={() => { navigation.push('Login') }}
                            style={{ position: 'absolute', right: 0.0, bottom: 0.0, ...Fonts.primaryColor14Medium, }}
                        >
                            Login
                        </Text>
                        :
                        <Text
                            onPress={() => {
                                if (currentIndex == 0) {
                                    swiperRef.current.scrollBy(1, true)
                                }
                                else if (currentIndex == 1) {
                                    swiperRef.current.scrollBy(1, true)
                                }
                            }}
                            style={{ ...Fonts.primaryColor14Medium, }}
                        >
                            Next
                        </Text>
                }
            </View>
        )
    }

    function page3() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={onboardingScreenList[2].onboardingImage}
                    style={{ width: '100%', height: height / 2.5, resizeMode: 'contain' }}
                />
                <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor18Medium }}>
                        {onboardingScreenList[2].title}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                        {onboardingScreenList[2].description}
                    </Text>
                </View>
            </View>
        )
    }

    function page2() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={onboardingScreenList[1].onboardingImage}
                    style={{ width: width - 40.0, height: height / 2.5, }}
                />
                <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor18Medium }}>
                        {onboardingScreenList[1].title}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                        {onboardingScreenList[1].description}
                    </Text>
                </View>
            </View>
        )
    }

    function page1() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={onboardingScreenList[0].onboardingImage}
                    style={{ width: width - 40.0, height: height / 2.5, }}
                />
                <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor18Medium }}>
                        {onboardingScreenList[0].title}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                        {onboardingScreenList[0].description}
                    </Text>
                </View>
            </View>
        )
    }

    function onIndexChanged(index) {
        updateState({ currentIndex: index });
    }

}

const styles = StyleSheet.create({
    dotStyle: {
        backgroundColor: Colors.lightGrayColor,
        marginHorizontal: Sizes.fixPadding - 5.0,
        width: 12.0,
        height: 4.0,
        borderRadius: Sizes.fixPadding,
    },
    activeDotStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        height: 4.0,
        width: 20.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
    skipAndLoginWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 25.0,
        left: 20.0,
        right: 20.0,
    },
    nextAndLoginButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    skipNextAndLoginInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default OnboardingScreen;