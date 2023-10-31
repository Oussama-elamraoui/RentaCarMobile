import React from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, ScrollView, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const companyPoliciesList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget molestie tellus mauris metus nisi urna nibh netus at',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et aliquam interdum mi vitae tortor. Vel eu dictum nibh a eget lacus. Purus urna purus ipsum ullamcorper iaculis. Velit, ullamcorper eget tellus arcu dui est.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est scelerisque urna rutrum duis. Risus scelerisque sed neque massa feugiat. Maecenas tincidunt consectetur quis ut. Dui nec metus, at tristique parturient faucibus. Nibh augue mauris tellus ultrices diam. Venenatis turpis sagittis faucibus sed tristique.',
];

const termsOfUseList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget molestie tellus mauris metus nisi urna nibh netus at',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et aliquam interdum mi vitae tortor. Vel eu dictum nibh a eget lacus. Purus urna purus ipsum ullamcorper iaculis. Velit, ullamcorper eget tellus arcu dui est.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est scelerisque urna rutrum duis. Risus scelerisque sed neque massa feugiat. Maecenas tincidunt consectetur quis ut. Dui nec metus, at tristique parturient faucibus. Nibh augue mauris tellus ultrices diam. Venenatis turpis sagittis faucibus sed tristique.',
];

const TermsAndConditionsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {companyPoliciesInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function companyPoliciesInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Medium }}>
                    Company Policies
                </Text>
                {
                    companyPoliciesList.map((item, index) => (
                        <Text key={`${index}`} style={{ marginBottom: Sizes.fixPadding - 5.0, textAlign: 'justify', ...Fonts.grayColor13Regular }}>
                            {item}
                        </Text>
                    ))
                }
                <Text style={{ marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Medium }}>
                    Terms of Use
                </Text>
                {
                    termsOfUseList.map((item, index) => (
                        <Text key={`${index}`} style={{ marginBottom: Sizes.fixPadding - 5.0, textAlign: 'justify', ...Fonts.grayColor13Regular }}>
                            {item}
                        </Text>
                    ))
                }
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
                    Terms & Conditions
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
});

export default TermsAndConditionsScreen;
