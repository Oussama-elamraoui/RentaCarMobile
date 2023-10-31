import React, { useState,useEffect } from "react";
import { SafeAreaView, View, StatusBar, TouchableOpacity, FlatList, TextInput, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { BottomSheet } from '@rneui/themed';
import axios from "axios";

const searchResultsList = [
    {
        id: '1',
        carImage: require('../../assets/images/cars/car5.png'),
        inSaved: false,
        carBrand: 'Mercedes',
        carType: 'SUV',
        carModel: 'CLS 450 Coupe 2020',
        amountPerDay: 120,
        location: 'Thornridge Cir. Syracuse, Connecticut',
        rating: 5.0,
        seats: 5,
    },
    {
        id: '2',
        carImage: require('../../assets/images/cars/car1.png'),
        inSaved: false,
        carBrand: 'Audi',
        carType: 'Sport',
        carModel: 'Audi Q5',
        amountPerDay: 190,
        location: 'Royal Ln. Mesa, New Jersey',
        rating: 5.0,
        seats: 4,
    },
    {
        id: '3',
        carImage: require('../../assets/images/cars/car2.png'),
        inSaved: false,
        carBrand: 'Mercedes',
        carType: 'Van',
        carModel: 'Bens w176',
        amountPerDay: 180,
        location: 'Washington Ave. Manchester, Kentucky',
        rating: 5.0,
        seats: 5,
    },
    {
        id: '4',
        carImage: require('../../assets/images/cars/car3.png'),
        inSaved: true,
        carBrand: 'Ford',
        carType: 'Jeep',
        carModel: 'Ford Ranger Raptor 2020',
        amountPerDay: 170,
        location: 'W. Gray St. Utica, Pennsylvania',
        rating: 5.0,
        seats: 4,
    },
    {
        id: '5',
        carImage: require('../../assets/images/cars/car4.png'),
        inSaved: true,
        carBrand: 'Mercedes',
        carType: 'SUV',
        carModel: 'CLS 450 Coupe 2020',
        amountPerDay: 120,
        location: 'Thornridge Cir. Syracuse, Connecticut',
        rating: 5.0,
        seats: 5,
    },
    {
        id: '6',
        carImage: require('../../assets/images/cars/car5.png'),
        inSaved: false,
        carBrand: 'Audi',
        carType: 'Sport',
        carModel: 'Audi Q5',
        amountPerDay: 190,
        location: 'Royal Ln. Mesa, New Jersey',
        rating: 5.0,
        seats: 4,
    },
    {
        id: '7',
        carImage: require('../../assets/images/cars/car6.png'),
        inSaved: false,
        carBrand: 'Mercedes',
        carType: 'Van',
        carModel: 'Bens w176',
        amountPerDay: 180,
        location: 'Washington Ave. Manchester, Kentucky',
        rating: 5.0,
        seats: 5,
    },
    {
        id: '8',
        carImage: require('../../assets/images/cars/car7.png'),
        inSaved: false,
        carBrand: 'Ford',
        carType: 'Jeep',
        carModel: 'Ford Ranger Raptor 2020',
        amountPerDay: 170,
        location: 'W. Gray St. Utica, Pennsylvania',
        rating: 5.0,
        seats: 4,
    },
];

const sortByOptions = [
    'Highest rating',
    'Lowest price',
    'Highest price',
    'Modern',
    'Most watched',
];

const brandsList = [
    {
        id: '1',
        brandLogo: require('../../assets/images/brand/brand1.png'),
        brandName: 'Mercedes',
    },
    {
        id: '2',
        brandLogo: require('../../assets/images/brand/brand2.png'),
        brandName: 'Tata',
    },
    {
        id: '3',
        brandLogo: require('../../assets/images/brand/brand3.png'),
        brandName: 'Hyundai',
    },
    {
        id: '4',
        brandLogo: require('../../assets/images/brand/brand4.png'),
        brandName: 'BMW',
    },
    {
        id: '5',
        brandLogo: require('../../assets/images/brand/brand5.png'),
        brandName: 'Skoda',
    },
    {
        id: '6',
        brandLogo: require('../../assets/images/brand/brand6.png'),
        brandName: 'Mahindra',
    }
];

const bodyTypesList = [
    {
        id: '1',
        bodyTypeIcon: require('../../assets/images/bodyType/sport.png'),
        bodyType: 'Sport',
    },
    {
        id: '2',
        bodyTypeIcon: require('../../assets/images/bodyType/pickup.png'),
        bodyType: 'Pick - up',
    },
    {
        id: '3',
        bodyTypeIcon: require('../../assets/images/bodyType/van.png'),
        bodyType: 'Van',
    },
    {
        id: '4',
        bodyTypeIcon: require('../../assets/images/bodyType/jeep.png'),
        bodyType: 'Jeep',
    },
    {
        id: '5',
        bodyTypeIcon: require('../../assets/images/bodyType/suv.png'),
        bodyType: 'SUV',
    },
    {
        id: '6',
        bodyTypeIcon: require('../../assets/images/bodyType/sedan.png'),
        bodyType: 'Sedan',
    },
    {
        id: '7',
        bodyTypeIcon: require('../../assets/images/bodyType/hatchback.png'),
        bodyType: 'Hatchback',
    }
];

const SearchResultsScreen = ({ navigation, route }) => { 
    const item = route.params.item;
    useEffect(async()=>{
        const startdate=item.selectedStartDate;
        const endtdate=item.selectedEndDate;
        const starttime=item.selectedStartTime
        const endtime = item.selectedStartTime
        await axios('api',{
            method:'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', // Adjust the content type as needed
                // You may need to include other headers here, such as authentication tokens
            },
            data: JSON.stringify({startdate,endtdate,starttime,endtime})
        })
      console.log(item.selectedStartDate)
      console.log(item.selectedEndDate)
    },[])
   

    const [state, setState] = useState({
        location: item.selectedLocation,
        searchResults: searchResultsList,
        showSnackBar: false,
        snackBarMsg: null,
        showFilterSheet: false,
        selectedSortByOptionIndex: 0,
        minValue: null,
        maxValue: null,
        selectedBrandIndex: 0,
        selectedBodyTypeIndex: 0,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        location,
        searchResults,
        showSnackBar,
        snackBarMsg,
        showFilterSheet,
        selectedSortByOptionIndex,
        minValue,
        maxValue,
        selectedBrandIndex,
        selectedBodyTypeIndex,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {searchResultsInfo()}
            </View>
            {filterButton()}
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => updateState({ showSnackBar: false })}
            >
                {snackBarMsg}
            </Snackbar>
            {filterSheet()}
        </SafeAreaView>
    )

    function filterSheet() {
        return (
            <BottomSheet
                isVisible={showFilterSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { updateState({ showFilterSheet: false }) } }}
            >
                <View style={styles.filterSheetWrapStyle}>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor18Bold }}>
                        Filter
                    </Text>
                    {sortByInfo()}
                    {priceRangeInfo()}
                    {brandInfo()}
                    {bodyTypeInfo()}
                    {applyButton()}
                </View>
            </BottomSheet>
        )
    }

    function applyButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({ showFilterSheet: false })
                }}
                style={styles.applyButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Apply
                </Text>
            </TouchableOpacity>
        )
    }

    function bodyTypeInfo() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedBodyTypeIndex: index })}
                style={{
                    ...styles.brandAndBodyTypeInfoWrapStyle,
                    shadowColor: selectedBodyTypeIndex == index ? Colors.primaryColor : Colors.grayColor,
                    borderColor: selectedBodyTypeIndex == index ? Colors.primaryColor : '#E6E6E6',
                }}
            >
                <Image
                    source={item.bodyTypeIcon}
                    style={{ width: 50.0, height: 50.0, resizeMode: 'contain' }}
                />
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    {item.bodyType}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0, }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Medium }}>
                    Body Type
                </Text>
                <FlatList
                    data={bodyTypesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding, paddingRight: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function brandInfo() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedBrandIndex: index })}
                style={{
                    borderColor: selectedBrandIndex == index ? Colors.primaryColor : '#E6E6E6',
                    ...styles.brandAndBodyTypeInfoWrapStyle,
                    shadowColor: selectedBrandIndex == index ? Colors.primaryColor : Colors.grayColor,
                }}>
                <Image
                    source={item.brandLogo}
                    style={{ width: 50.0, height: 50.0, resizeMode: 'contain' }}
                />
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                    {item.brandName}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Medium }}>
                    Brand
                </Text>
                <FlatList
                    data={brandsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding, paddingRight: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function priceRangeInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Medium }}>
                    Price Range
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        value={minValue}
                        onChangeText={(value) => updateState({ minValue: value })}
                        placeholder="min"
                        placeholderTextColor={Colors.grayColor}
                        style={styles.minMaxValueTextFieldStyle}
                        selectionColor={Colors.primaryColor}
                        keyboardType="numeric"
                    />
                    <Text style={{ marginHorizontal: Sizes.fixPadding * 2.8, ...Fonts.blackColor14Medium }}>
                        To
                    </Text>
                    <TextInput
                        value={maxValue}
                        onChangeText={(value) => updateState({ maxValue: value })}
                        placeholder="max"
                        placeholderTextColor={Colors.grayColor}
                        style={styles.minMaxValueTextFieldStyle}
                        selectionColor={Colors.primaryColor}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        )
    }

    function sortByInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ marginBottom: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.blackColor18Medium }}>
                        Sort by
                    </Text>
                    <FontAwesome name="sort-amount-desc" size={16} color={Colors.blackColor}
                        style={{ marginLeft: Sizes.fixPadding - 5.0, }}
                    />
                </View>
                {
                    sortByOptions.map((item, index) => (
                        <View key={`${index}`}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ selectedSortByOptionIndex: index })}
                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                            >
                                <Text style={selectedSortByOptionIndex == index ? { ...Fonts.primaryColor15Regular } : { ...Fonts.grayColor15Regular }}>
                                    {item}
                                </Text>
                                <View style={{
                                    ...styles.radioButtonStyle,
                                    borderColor: selectedSortByOptionIndex == index ? Colors.primaryColor : Colors.lightGrayColor,
                                }}>
                                    {
                                        selectedSortByOptionIndex == index
                                            ?
                                            <View style={{ width: 8.0, height: 8.0, borderRadius: 4.0, backgroundColor: Colors.primaryColor }} />
                                            :
                                            null
                                    }
                                </View>
                            </TouchableOpacity>
                            <View style={{
                                backgroundColor: '#E6E6E6', height: 1.0,
                                marginVertical: Sizes.fixPadding + 2.0,
                            }} />
                        </View>
                    ))
                }
            </View>
        )
    }

    function filterButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ showFilterSheet: true })}
                style={styles.filterButtonStyle}
            >
                <MaterialIcons name="filter-list" size={24} color={Colors.whiteColor} />
            </TouchableOpacity>
        )
    }

    function updateSearchResults({ id }) {
        const newList = searchResults.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, inSaved: !item.inSaved };
                updateState({ snackBarMsg: updatedItem.inSaved ? `${updatedItem.carBrand} Add To Saved` : `${updatedItem.carBrand} Removed From Saved` })
                return updatedItem;
            }
            return item;
        });
        updateState({ searchResults: newList })
    }

    function searchResultsInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.vehicaleInfoWrapStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, }}>
                        <Ionicons
                            name={item.inSaved ? "heart" : "heart-outline"}
                            size={18}
                            color={Colors.blackColor}
                            onPress={() => {
                                updateSearchResults({ id: item.id })
                                updateState({ showSnackBar: true })
                            }}
                        />
                        <Text>
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                {item.carBrand}
                            </Text>
                            <Text>
                                {' '}
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                {item.carType}
                            </Text>
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            {item.carModel}
                        </Text>
                        <Text style={{ marginVertical: Sizes.fixPadding - 8.0, }}>
                            <Text style={{ ...Fonts.primaryColor16Medium }}>
                                {`$`}{item.amountPerDay}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Regular }}>
                                { } | day
                            </Text>
                        </Text>
                    </View>
                    <View style={{ width: 150.0, height: 70.0, }}>
                        <Image
                            source={item.carImage}
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="location-pin"
                        color={Colors.grayColor}
                        size={14}
                        style={{ marginLeft: Sizes.fixPadding - 13.0 }}
                    />
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                        {item.location}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        {item.rating.toFixed(1)}
                    </Text>
                    <MaterialIcons
                        name="star"
                        color={Colors.yellowColor}
                        size={14}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {vehicaleFunctionalityesSort({ icon: require('../../assets/images/icons/seat.png'), value: `${item.seats} seats` })}
                    {vehicaleFunctionalityesSort({ icon: require('../../assets/images/icons/petrolpump.png'), value: ' Petrol' })}
                    {vehicaleFunctionalityesSort({ icon: require('../../assets/images/icons/auto.png'), value: ' Auto' })}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('CarDetail',{item})}
                        style={styles.bookButtonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor16Medium }}>
                            Book
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
        return (
            <FlatList
                data={searchResults}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
            />
        )
    }

    function vehicaleFunctionalityesSort({ icon, value }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={icon}
                    style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                />
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    {value}
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="arrow-back"
                        color={Colors.blackColor}
                        size={22}
                        onPress={() => navigation.pop()}
                        style={{ marginLeft: Sizes.fixPadding - 12.0, }}
                    />
                    <TextInput
                        value={location}
                        onChangeText={(value) => updateState({ location: value })}
                        style={styles.searchFieldStyle}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
                <View style={styles.dateAndTimeInfoWrapStyle}>
                    <Text style={{ flex: 1, ...Fonts.primaryColor15Medium }}>
                        {`${item.selectedStartDate}, ${item.selectedStartTime}`}
                    </Text>
                    <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.grayColor15Medium }}>
                        to
                    </Text>
                    <Text style={{ flex: 1, ...Fonts.primaryColor15Medium }}>
                        {`${item.selectedEndDate}, ${item.selectedEndTime}`}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dateAndTimeInfoWrapStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchFieldStyle: {
        ...Fonts.blackColor14Regular,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding,
        flex: 1,
        marginLeft: Sizes.fixPadding * 2.0,
    },
    bookButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 3.0,
    },
    vehicaleInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    filterButtonStyle: {
        backgroundColor: Colors.primaryColor,
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20.0,
        left: 20.0,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
        zIndex: 5,
    },
    snackBarStyle: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
        paddingLeft: 60.0,
    },
    radioButtonStyle: {
        width: 15.0,
        height: 15.0,
        borderRadius: 7.5,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    minMaxValueTextFieldStyle: {
        ...Fonts.blackColor14Regular,
        backgroundColor: Colors.bodyBackColor,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        flex: 1,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 2.0,
    },
    brandAndBodyTypeInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 2.0,
        borderWidth: 1.0,
        width: 80.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Sizes.fixPadding,
    },
    applyButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
    },
    filterSheetWrapStyle: {
        backgroundColor: Colors.bodyBackColor,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding * 2.0,
    }
});

export default SearchResultsScreen;
