import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import HomeScreen from "../screens/home/homeScreen";
import BookingScreen from "../screens/booking/bookingScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTabBarScreen = ({ navigation }) => {

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
        setbackClickCount(1)
        setTimeout(() => {
            setbackClickCount(0)
        }, 1000)
    }

    const [backClickCount, setbackClickCount] = useState(0)

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: Colors.primaryColor, height: 65 },
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => bottomTabBarItem({ icon: 'home', tabName: 'Home', focused: focused })
                    }}
                />
                <Tab.Screen
                    name="Booking"
                    component={BookingScreen}
                    options={{
                        tabBarIcon: ({ focused }) => bottomTabBarItem({ icon: 'directions-car', tabName: 'My Booking', focused: focused })
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => bottomTabBarItem({ icon: 'person', tabName: 'Profile', focused: focused })
                    }}
                />
            </Tab.Navigator>
            {exitInfo()}
        </>
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={[styles.animatedView,]}>
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        Press Back Once Again to Exit
                    </Text>
                </View>
                :
                null
        )
    }

    function bottomTabBarItem({ icon, tabName, focused }) {
        return (
            <View style={{ alignItems: 'center' }}>
                <MaterialIcons name={icon} size={24} color={focused ? Colors.whiteColor : Colors.lightPrimaryColor} />
                <Text style={focused ? { ...Fonts.whiteColor16Medium } : { ...Fonts.lightPrimaryColor16Medium }}>
                    {tabName}
                </Text>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
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

export default BottomTabBarScreen;