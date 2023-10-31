import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Roboto_Light: require("../assets/fonts/Roboto-Light.ttf"),
                Roboto_Regular: require("../assets/fonts/Roboto-Regular.ttf"),
                Roboto_Medium: require("../assets/fonts/Roboto-Medium.ttf"),
                Roboto_Bold: require("../assets/fonts/Roboto-Bold.ttf"),
                Roboto_Black: require("../assets/fonts/Roboto-Black.ttf"),
                Roboto_Thin: require("../assets/fonts/Roboto-Thin.ttf"),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;