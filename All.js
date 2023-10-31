import React,{ useContext, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import LoadingScreen from "./components/loadingScreen";
import BottomTabBarScreen from "./components/bottomTabBar";
import SearchResultsScreen from "./screens/searchResults/searchResultsScreen";
import AvailableCarsScreen from "./screens/availableCars/availableCarsScreen";
import CarDetailScreen from "./screens/carDetail/carDetailScreen";
import BookingStep1Screen from "./screens/bookingStep1/bookingStep1Screen";
import BookingStep2Screen from "./screens/bookingStep2/bookingStep2Screen";
import BookingStep3Screen from "./screens/bookingStep3/bookingStep3Screen";
import SelectPaymentMethodScreen from "./screens/selectPaymentMethod/selectPaymentMethodScreen";
import ConfirmationScreen from "./screens/confirmation/confirmationScreen";
import ChangeTimeAndLocationScreen from "./screens/changeTimeAndLocation/changeTimeAndLocationScreen";
import BookingSuccessfullScreen from "./screens/bookingSuccessfull/bookingSuccessfullScreen";
import AccountDetailsScreen from "./screens/accountDetails/accountDetailsScreen";
import NotificationsScreen from "./screens/notifications/notificationsScreen";
import SavedScreen from "./screens/saved/savedScreen";
import SupportScreen from "./screens/support/supportScreen";
import TermsAndConditionsScreen from "./screens/termsAndConditions/termsAndConditionsScreen";
import FaqsScreen from "./screens/faqs/faqsScreen";
import SplashScreen from "./screens/splashScreen";
import OnboardingScreen from "./screens/onboarding/onboardingScreen";
import LoginScreen from "./screens/auth/loginScreen";
import RegisterScreen from "./screens/auth/registerScreen";
import VerificationScreen from "./screens/auth/verificationScreen";
import { AuthContext } from "./context/context"


LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const All= () => {
    const {register,token} = useContext(AuthContext);
  return (


    <NavigationContainer>
      
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
       
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen name="AvailableCars" component={AvailableCarsScreen} />
        <Stack.Screen name="CarDetail" component={CarDetailScreen} />
        <Stack.Screen name="BookingStep1" component={BookingStep1Screen} />
        <Stack.Screen name="BookingStep2" component={BookingStep2Screen} />
        <Stack.Screen name="BookingStep3" component={BookingStep3Screen} />
        <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethodScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="ChangeTimeAndLocation" component={ChangeTimeAndLocationScreen} />
        <Stack.Screen name="BookingSuccessfull" component={BookingSuccessfullScreen} />
        <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />  
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Saved" component={SavedScreen} /> 
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
        <Stack.Screen name="Faqs" component={FaqsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default All ;