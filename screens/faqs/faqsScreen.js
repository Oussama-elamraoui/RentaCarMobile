import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, } from '@expo/vector-icons';

const faqsList = [
    {
        id: '1',
        question: 'What happens if I return car late?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: true,
    },
    {
        id: '2',
        question: 'Is there a km limit how much can i drive?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: false,
    },
    {
        id: '3',
        question: 'How to book car?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: false,
    },
    {
        id: '4',
        question: 'Can I message DJ?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: false,
    },
    {
        id: '5',
        question: 'How can I edit my profile?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: false,
    },
    {
        id: '6',
        question: 'How to change pick-up location?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: false,
    },
    {
        id: '7',
        question: 'Do I have to return the car to the same location where I picked it up?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: false,
    },
    {
        id: '8',
        question: 'What happens if I return car late?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: false,
    },
    {
        id: '9',
        question: 'Is there a km limit how much can i drive?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: false,
    },
    {
        id: '10',
        question: 'How to book car?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: false,
    },
    {
        id: '11',
        question: 'How can I edit my profile?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: false,
    },
    {
        id: '12',
        question: 'How to change pick-up location?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: false,
    },
    {
        id: '13',
        question: 'Do I have to return the car to the same location where I picked it up?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non, ultricies blandit lectus vitae ullamcorper sed ut nunc. Nec lorem sed ac, consectetur sit nunc.',
        isExpanded: false,
    },
];

const FaqsScreen = ({ navigation }) => {

    const [state, setState] = useState({
        faqsData: faqsList,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        faqsData,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {faqs()}
            </View>
        </SafeAreaView>
    )

    function updateFaqs({ id }) {
        const newList = faqsData.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, isExpanded: !item.isExpanded };
                return updatedItem;
            }
            return item;
        });
        updateState({ faqsData: newList })
    }

    function faqs() {
        const renderItem = ({ item }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateFaqs({ id: item.id })}
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                >
                    <View style={{ flex: 1, marginRight: Sizes.fixPadding - 5.0 }}>
                        <Text style={{ ...Fonts.blackColor15Regular }}>
                            {item.question}
                        </Text>
                        {
                            item.isExpanded
                                ?
                                <Text style={{ marginTop: Sizes.fixPadding - 8.0, marginLeft: Sizes.fixPadding, ...Fonts.grayColor13Regular }}>
                                    {item.answer}
                                </Text>
                                :
                                null
                        }
                    </View>
                    <View style={styles.arrowUpDownIconWrapStyle}>
                        <MaterialCommunityIcons name={item.isExpanded ? "chevron-up" : "chevron-down"} size={20} color={Colors.grayColor} />
                    </View>
                </TouchableOpacity>
                <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginVertical: Sizes.fixPadding + 5.0 }} />
            </View>
        )
        return (
            <FlatList
                data={faqsData}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
            />
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
                    FAQs
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

export default FaqsScreen;
