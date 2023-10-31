import React, { useState, useRef } from "react";
import { SafeAreaView, View, Dimensions, FlatList, StatusBar, StyleSheet, Animated,TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import RatingComponent from '../booking/ratingScreen'
const { width, height } = Dimensions.get('window');

const newNotificatiosList = [
    {
        key: '1',
        title: 'Success',
        time: 'You successfully booked Mercedes Bens w176. You can check your booking details in My Booking.',
    },
    {
        key: '2',
        title: 'Hot Deals',
        time: 'New Hot Deals for you. Check it now and book your favorite car with lowest price.',
    },
];

const oldNotificationsList = [
    {
        key: '1',
        title: 'Success',
        time: 'You successfully booked Mercedes Bens w176. You can check your booking details in My Booking.',
    },
    {
        key: '2',
        title: 'Hot Deals',
        time: 'New Hot Deals for you. Check it now and book your favorite car with lowest price.',
    },
    {
        key: '3',
        title: 'Success',
        time: 'You successfully booked Mercedes Bens w176. You can check your booking details in My Booking.',
    },
];

const rowTranslateAnimatedValues = {};

const NotificationsScreen = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(newNotificatiosList);

    const [oldListData, setOldListData] = useState(oldNotificationsList);


    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    Array(oldListData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if ((value < -width || value > width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: ['0%', '100%'],
                        outputRange: ["0%", "100%"],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <View style={styles.notificationWrapStyle}>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        {data.item.title}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor13Regular }}>
                        {data.item.time}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack} />
    );

    const oldOnSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if ((value < -width || value > width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...oldListData];
                const prevIndex = oldListData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = oldListData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} dismissed`);

                setOldListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const oldRenderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: ['0%', '100%'],
                        outputRange: ["0%", "100%"],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <TouchableOpacity>
                <View style={styles.notificationWrapStyle}>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        {data.item.title}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor13Regular }}>
                        {data.item.time}
                    </Text>
                </View>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );

    const oldRenderHiddenItem = () => (
        <View style={styles.rowBack} />
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <>
                    <FlatList
                        ListHeaderComponent={
                            <View style={{ flex: 1 }}>
                                {
                                    listData.length == 0 && oldListData.length == 0 ?
                                        <View style={{ height: height - 90, alignItems: 'center', justifyContent: 'center' }}>
                                            <MaterialIcons name="notifications-off" size={40} color={Colors.grayColor} />
                                            <Text style={{ ...Fonts.grayColor16Medium, marginTop: Sizes.fixPadding }}>
                                                No Notifications Yet
                                            </Text>
                                        </View>
                                        :
                                        <>
                                            {
                                                listData.length == 0 ?
                                                    null :
                                                    <View>
                                                        <Text style={{ marginBottom: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Medium }}>
                                                            New
                                                        </Text>
                                                        <SwipeListView
                                                            listKey={`todays`}
                                                            data={listData}
                                                            renderItem={renderItem}
                                                            renderHiddenItem={renderHiddenItem}
                                                            rightOpenValue={-width}
                                                            leftOpenValue={width}
                                                            onSwipeValueChange={onSwipeValueChange}
                                                            useNativeDriver={false}
                                                            contentContainerStyle={{ paddingVertical: Sizes.fixPadding - 8.0, }}
                                                            scrollEnabled={false}
                                                        />
                                                    </View>
                                            }
                                            {
                                                oldListData.length == 0
                                                    ?
                                                    null :
                                                    <View>
                                                        <Text style={{ marginBottom: Sizes.fixPadding + 5.0, marginTop: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Medium }}>
                                                            Wednesday, 5 April 2021
                                                        </Text>
                                                        <SwipeListView
                                                            listKey={`olds`}
                                                            data={oldListData}
                                                            renderItem={oldRenderItem}
                                                            renderHiddenItem={oldRenderHiddenItem}
                                                            rightOpenValue={-width}
                                                            leftOpenValue={width}
                                                            onSwipeValueChange={oldOnSwipeValueChange}
                                                            useNativeDriver={false}
                                                            contentContainerStyle={{ paddingVertical: Sizes.fixPadding - 8.0, }}
                                                            scrollEnabled={false}
                                                        />
                                                    </View>
                                            }
                                        </>
                                }
                            </View>
                        }
                        contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding, }}
                        showsVerticalScrollIndicator={false}
                    />
                    <Snackbar
                        style={styles.snackBarStyle}
                        visible={showSnackBar}
                        onDismiss={() => setShowSnackBar(false)}
                    >
                        {snackBarMsg}
                    </Snackbar>
                </>
            </View>
        </SafeAreaView>
    );

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
                    Notifications
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
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    },
    notificationWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        flex: 1,
        bottom: 9.0,
    }
});

export default NotificationsScreen;