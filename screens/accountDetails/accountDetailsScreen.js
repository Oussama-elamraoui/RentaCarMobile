import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, StatusBar, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, Text, BackHandler, FlatList, Picker } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import { Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from "../../context/context";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { Overlay } from "@rneui/themed";
import { Camera } from 'expo-camera';
import CountryPicker from 'react-native-country-picker-modal';
import SearchableDropdown from 'react-native-searchable-dropdown';
import allCountries from 'world-countries';
const update = (valueUpdated) => {
    axios('http://192.168.1.113:8000/api/user/update', {
        method: 'PUT', // https://00b4-196-75-139-145.ngrok-free.app or 'GET', 'PUT', 'DELETE', etc., depending on your API endpoint 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({ valueUpdated })
    })
};
const formData = new FormData();
const AccountDetailsScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('ronaldrichards@gmail.com');
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [mobile, setMobile] = useState('password123');
    const [password, setPassword] = useState('password123');
    const [showBottomSheet, setshowBottomSheet] = useState(false);
    const [somethingChange, setSomethingChange] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [rectoCin, setRectoCin] = useState(false)
    const [versoCin, setVersoCin] = useState(false);
    const [rectoPermis, setRectoPermis] = useState(false);
    const [versoPermis, setVersoPermis] = useState(false)
    const [inputType, setInputType] = useState('')
    const [contries, setCountries] = useState();
    const update = () => {
        if (user) { }
    };
    const user = {
        firstname: "Ronald ",
        lastname: 'Richards',
        email: 'ronaldrichards@gmail.com',
        mobileNumber: '+91 1236547890',
        password: '67876756564',
        showBottomSheet: false,
    };
    useEffect( () => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json()) 
            .then((data) => {
                const countries = data.map((country) => ({
                    cca2: country.cca2,
                    name: country.name.common,
                    flag: country.flag,
                }));
                setCountries(countries)
                console.log(countries); // This will log the array of countries with names and cca2 codes
            })
            .catch((error) => {
                console.error('Error fetching country data:', error);
            });
    }, [])
   


    const pickImage = async (source, input) => {
        let result;
        console.log(input)
        if (source === 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }
        console.log(result.canceled)
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            formData.append('image', {
                uri: image,
                name: `${input}.jpg`,
                type: 'image/jpg',
            });
            switch (input) {
                case 'rectoPermis':
                    setRectoPermis(true);
                    break;
                case 'versoPermis':
                    setVersoPermis(true)
                    break;
                case 'rectoCin':
                    setRectoCin(true);
                    break;
                case 'versoCin':
                    setVersoCin(true);
                    break;
                default:
                    break;
            }

        }
        console.log(image)
        console.log(formData)
    };
    useEffect(() => {
        // Intercept hardware back button press on Android
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            handleGoBack();
            return true; // Prevent default back button behavior
        });

        // Add a listener for iOS swipe gesture and hardware back button on iOS devices
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            console.log(e.preventDefault())
            // Prevent the screen from being removed
            //   if (name !== '') {
            //     e.preventDefault();
            //     setIsModalVisible(true);
            //   }
        });

        return () => {
            // Clean up event listeners
            backHandler.remove();
            unsubscribe();
        };
    }, [navigation]);
    const handleGoBack = () => {
        if (user.email != email || user.mobileNumber != mobile || user.name) {
            // Show the confirmation modal if there are unsaved changes

            navigation.goBack();
            navigation.pop()
        } else {
            // Navigate away without confirmation if there are no changes

            setIsModalVisible(true);
        }
    };
    const handleSave = () => {
        // Save changes and navigate away
        setIsModalVisible(false);
        navigation.goBack();
    };

    const handleCancel = () => {
        navigation.pop()
        setIsModalVisible(false);
    };
    //////////////////////test

    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

    const showBottomShee = () => {
        setBottomSheetVisible(true);
    };

    const hideBottomSheet = () => {
        setBottomSheetVisible(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {profilePic()}
                    {firstNameInfo()}
                    {lastNameInfo()}
                    {emailInfo()}
                    {modal()}
                    {mobileNumberInfo()}
                    {passwordInfo()}
                    {country(contries)}
                    {cinUpload()}
                    {permisUpload()}


                    {somethingChange ? saveButton() : null}
                </ScrollView>
            </View>
            {changeProfilePicOptionsSheet()}
        </SafeAreaView>
    )

    function changeProfilePicOptionsSheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => { updateState({ showBottomSheet: false }) }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showBottomSheet: false })}
                    style={styles.changeProfilePicBottomSheetStyle}
                >
                    <Text style={{ ...Fonts.blackColor18Bold }}>
                        Choose Option
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding + 2.0, flexDirection: 'row', }}>
                        {changeProfilePicOptionsSort({
                            bgColor: '#009688',
                            icon: <Entypo name="camera" size={22} color={Colors.whiteColor} />,
                            option: 'Camera'
                        })}
                        <View style={{ marginHorizontal: Sizes.fixPadding * 3.0, }}>
                            {changeProfilePicOptionsSort({
                                bgColor: '#00A7F7',
                                icon: <MaterialCommunityIcons name="image" size={24} color={Colors.whiteColor} />,
                                option: 'Gallery'
                            })}
                        </View>
                        {changeProfilePicOptionsSort({
                            bgColor: '#DD5A5A',
                            icon: <MaterialCommunityIcons name="delete" size={24} color={Colors.whiteColor} />,
                            option: `Remove\nphoto`
                        })}
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function changeProfilePicOptionsSort({ bgColor, icon, option }) {
        return (
            <View>
                <View style={{
                    ...styles.changeProfilePicOptionsIconWrapStyle,
                    backgroundColor: bgColor,
                }}>
                    {icon}
                </View>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    {option}
                </Text>
            </View>
        )
    }

    function saveButton() {
        somethingChange
        return (

            <TouchableOpacity
                activeOpacity={0.9}
                // onPress={() => navigation.pop()}
                onPress={() => update({ email, fullName, password })}
                style={styles.saveButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Save
                </Text>
            </TouchableOpacity>
        )
    }

    function passwordInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Password
                </Text>
                <TextInput
                    value={password}
                    onChangeText={(value) => {
                        setPassword(value),
                            setSomethingChange(true)
                    }}
                    style={styles.textFieldStyle}
                    secureTextEntry={true}
                    selectionColor={Colors.primaryColor}
                />

            </View>
        )
    }

    function mobileNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Mobile Number
                </Text>
                <TextInput
                    value={mobile}
                    onChangeText={(value) => {
                        setMobile(value)
                        setSomethingChange(true),
                            console.log(somethingChange)
                    }
                    }
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="phone-pad"
                />

            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Email
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => {
                        setEmail(value),
                            setSomethingChange(true)
                    }}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="email-address"
                />


            </View>
        )
    }

    function firstNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    First name
                </Text>
                <TextInput

                    value={firstName}
                    onChangeText={(value) => {
                        setFirstName(value),
                            setSomethingChange(true)
                    }}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }
    function lastNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Last name
                </Text>
                <TextInput

                    value={lastName}
                    onChangeText={(value) => {
                        setLastName(value),
                            setSomethingChange(true)
                    }}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }
    function cinUpload() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    CIN
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 180 }} >
                        <View style={{ width: 200 }}>
                            <View style={{ height: 40, marginBottom: 2 }}>
                                <TouchableOpacity
                                    style={{
                                        width: 80,
                                        backgroundColor: Colors.primaryColor,
                                        borderRadius: 10,
                                        height: 30,
                                    }}
                                    onPress={() => (setBottomSheetVisible(true), setInputType('rectoCin'))}>
                                    <Text style={{ color: 'white', alignItems: 'center', marginLeft: 10, marginTop: 2.5 }}  >Image <MaterialIcons name="add-a-photo" size={16} color={'white'} />

                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {rectoCin && <Text style={{ color: 'green' }}>successfully added</Text>}

                        </View>
                    </View>
                    {/* <View style={{ backgroundColor: Colors.primaryColor, width: 1.0, height: 40.0, }} /> */}
                    <View>


                        <View style={{}}>
                            <View style={{ height: 40, marginBottom: 2 }}>
                                <TouchableOpacity
                                    style={{
                                        width: 80,
                                        backgroundColor: Colors.primaryColor,
                                        borderRadius: 10,
                                        height: 31,
                                    }}
                                    onPress={() => (setBottomSheetVisible(true), setInputType('versoCin'))}>
                                    <Text style={{ color: 'white', alignItems: 'center', marginLeft: 10, marginTop: 2.5 }}>Image <MaterialIcons name="add-a-photo" size={16} color={'white'} />

                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {versoCin && <Text style={{ color: 'green' }}>successfully added</Text>}
                        </View>
                    </View>

                </View>

            </View>
        )
    }
    function permisUpload() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: 16, marginBottom: 16 }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, marginTop: Sizes.fixPadding - 2.0, ...Fonts.grayColor14Regular }}>
                    Permis
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 180 }} >
                        <View style={{ height: 40, marginBottom: 7 }}>
                            <TouchableOpacity
                                style={{
                                    width: 80,
                                    backgroundColor: Colors.primaryColor,
                                    borderRadius: 10,
                                    height: 31,
                                }}
                                onPress={() => (setBottomSheetVisible(true), setInputType('rectoPermis'))}>

                                <Text style={{ color: 'white', alignItems: 'center', marginLeft: 10, marginTop: 2.5 }} >Image <MaterialIcons name="add-a-photo" size={16} color={'white'} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {rectoPermis && <Text style={{ color: 'green' }}>successfully added</Text>}
                    </View>



                    <View>

                        <View style={{ justifyContent: 'space-between', width: 400 }}>
                            <View style={{ height: 40, marginBottom: 7 }}>
                                <TouchableOpacity
                                    style={{
                                        width: 80,
                                        backgroundColor: Colors.primaryColor,
                                        borderRadius: 10,
                                        height: 31,
                                    }}
                                    onPress={() => (setBottomSheetVisible(true), setInputType('versoPermis'))}>
                                    <Text style={{ color: 'white', alignItems: 'center', marginLeft: 10, marginTop: 2.5 }} >Image <MaterialIcons name="add-a-photo" size={16} color={'white'} />

                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {versoPermis && <Text style={{ color: 'green' }}>successfully added</Text>}
                        </View>
                    </View>


                </View>


                <Modal
                    isVisible={isBottomSheetVisible}
                    onBackdropPress={hideBottomSheet}
                    backdropColor="transparent"
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                >
                    <View
                        style={{
                            flex: 0.4,
                            backgroundColor: 'white',
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,

                        }}
                    >
                        <View
                            style={{
                                height: 40,
                                backgroundColor: Colors.primaryColor,
                                borderTopLeftRadius: 30,
                                borderTopRightRadius: 30,
                            }}
                        >

                        </View>
                        <ScrollView contentContainerStyle={{ padding: 10, alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 20,
                                ...Fonts.grayColor14Regular

                            }}>Upload Image</Text>
                            <TouchableOpacity
                                style={{
                                    marginTop: 20,
                                    alignItems: 'center',
                                    width: 250,
                                    backgroundColor: Colors.primaryColor,
                                    borderRadius: 20,
                                    height: 50
                                }}
                                onPress={() => pickImage('camera', inputType)}>
                                <Text style={{ marginTop: '6%', color: 'white' }} >Camera <MaterialIcons name="add-a-photo" size={16} color={'white'} /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    marginTop: 8,
                                    alignItems: 'center',
                                    width: 250,
                                    backgroundColor: Colors.primaryColor,
                                    borderRadius: 20,
                                    height: 50,

                                }}
                                onPress={() => pickImage('device', inputType)}>
                                <Text style={{ marginTop: '6%', color: 'white' }} >Device <Entypo name="upload" size={16} color={'white'} onPress={() => showBottomShee()} /></Text>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={hideBottomSheet} style={{
                                alignItems: 'center',
                                marginTop: 8,
                                width: 250,
                                backgroundColor: Colors.primaryColor,
                                borderRadius: 20,
                                height: 50,
                            }}>
                                <Text style={{ marginTop: '6%', color: 'white' }}>Cancel</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        )
    }
    function profilePic() {
        return (
            <View style={{ alignSelf: 'center', margin: Sizes.fixPadding * 2.0, alignItems: 'center', }}>
                <Image
                    source={require('../../assets/images/users/user2.png')}
                    style={{ width: 100.0, height: 100.0, borderRadius: 50.0, }}
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showBottomSheet: true })}
                    style={styles.changeProfilePicButtonStyle}
                >
                    <MaterialIcons name="photo-camera" size={14} color={Colors.whiteColor} />
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor13Medium }}>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    function country(countries) {
        const [countryFilter, setCountryFilter] = useState('');
        const [selectedCountry, setSelectedCountry] = useState(null);
        const filteredCountries = countryFilter
            ? countries.filter((country) =>
                country.name.toLowerCase().includes(countryFilter.toLowerCase())
            )
            : countries;
            // const countries = allCountries.map((country) => ({
            //     id: country.cca2,
            //     name: country.name.common,
            //     flag: country.flags[0],
            //   }));
            

        // const handleCountrySelect = (country) => {
        //     setSelectedCountry(country);
        // };

        const renderItem = ({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CountryPicker
                    countryCode={item.cca2}
                    withFlag
                    withEmoji
                    withFilter
                    withCountryNameButton
                    withAlphaFilter
                    withCallingCode
                    onSelect={(country) => handleCountrySelect(country)}
                />
                <Text>{item.name}</Text>
            </View>
        );

        return (
            <View>
                <Text>Selected Country: {selectedCountry ? selectedCountry.name : ''}</Text>
                <SearchableDropdown
                    onTextChange={(text) => {
                        // You can use this callback to filter the countries list based on user input.
                        // You can set the filtered list in the 'data' prop.
                        // Example: filterCountries(text);
                    }}
                    selectedItems={selectedCountry ? [selectedCountry] : []}
                    onItemSelect={(item) => {
                        setSelectedCountry(item);
                    }}
                    containerStyle={{ padding: 5 }}
                    textInputStyle={{ padding: 12 }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    itemTextStyle={{ color: 'black' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={countries}
                />
            </View>
        );
    }
    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => (navigation.pop(), console.log('cc'))}
                    style={{ position: 'absolute', left: 20.0, zIndex: 1 }}
                />
                <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor18Bold }}>
                    Edit Profile
                </Text>
            </View>
        )
    }
    function modal() {
        return (

            <Overlay
                isVisible={isModalVisible}
                onBackdropPress={() => { setIsModalVisible(false) }}
                overlayStyle={{ width: '80%', padding: 0.0, borderRadius: Sizes.fixPadding - 5.0, }}
            >
                <View style={{ overflow: 'hidden', backgroundColor: Colors.whiteColor, borderRadius: Sizes.fixPadding - 5.0, }}>
                    <Text style={{ marginVertical: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.blackColor16Medium, }}>
                        Are you sure you want to save the update?
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primaryColor }}>

                        <Text onPress={handleSave} style={{ flex: 1, textAlign: 'center', ...Fonts.whiteColor16Medium }}>Yes</Text>
                        <View style={{ backgroundColor: Colors.whiteColor, width: 1.0, height: 40.0, }} />
                        <Text onPress={handleCancel} style={{ flex: 1, textAlign: 'center', ...Fonts.whiteColor16Medium }}>No</Text>

                    </View>
                </View>
            </Overlay>
        );
    }

}

const styles = StyleSheet.create({

    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
    },
    changeProfilePicButtonStyle: {
        position: 'absolute',
        bottom: 0.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        borderColor: Colors.whiteColor,
        borderWidth: 1.5,
    },
    textFieldStyle: {
        ...Fonts.blackColor15Regular,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: 6,
        paddingVertical: Sizes.fixPadding + 3.0,
        elevation: 2.0,
    },
    saveButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding * 2.0,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
    },
    changeProfilePicBottomSheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    changeProfilePicOptionsIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default AccountDetailsScreen;
