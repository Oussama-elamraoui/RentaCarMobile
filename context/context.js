import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, createContext, useState, useEffect, useRef } from "react";
import { BASE_URL } from "../config";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [testLogin, setTestLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const test = {
    "email": "niseo@gmail.com",
    "password": "1234",
    "password_confirmation": "1234",
    "type": "client"
  };
  const sendTwilioMessage = async (phoneNumber, message) => {
    try {
      const response = await fetch('http://192.168.100.145:3000/send-sms/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          body: message,
        }),

      });
    }
    catch (error) {
      console.error('Error sending Twilio message:', error);
    }

  };

  const register = async (state) => {

    await axios('http://192.168.100.145:8000/api/register', {
      method: 'POST', // or 'GET', 'PUT', 'DELETE', etc., depending on your API endpoint
      headers: {
        'Content-Type': 'application/json', // Adjust the content type as needed
        // You may need to include other headers here, such as authentication tokens
      },
      data: JSON.stringify(state)
    }).then(res => {

      let data = res.data;
      setUserInfo(data);
      setTestLogin(true);
      console.log(userInfo);
      AsyncStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
    }).catch(e => {
      console.log(`login error ${e}`);
      setIsLoading(false);
    });
    //  await fetch('http://192.168.100.145:3000/send-sms/', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       to: '+212648454733',
    //       body: 'AA AA AA',
    //     }),

    //   }).then(response=>{
    //       console.log(response.status)
    //       if(response.status==200){
    //       axios('http://192.168.1.113:8000/api/register', {
    //       method: 'POST', // or 'GET', 'PUT', 'DELETE', etc., depending on your API endpoint
    //       headers: {
    //         'Content-Type': 'application/json', // Adjust the content type as needed
    //         // You may need to include other headers here, such as authentication tokens
    //       },
    //       data: JSON.stringify(test)
    //     }).then(res => {
    //       let dat=res.data; 
    //       AsyncStorage.setItem('userInfo', JSON.stringify(dat));
    //       setIsLoading(false);
    //     })
    //     }})

  };// .post(`${BASE_URL}/login`, {
  const login = async (email, password) => {
    setIsLoading(true);
    await axios('http://192.168.100.145:8000/api/login', {
      method: 'POST', // https://00b4-196-75-139-145.ngrok-free.app or 'GET', 'PUT', 'DELETE', etc., depending on your API endpoint
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', // Adjust the content type as needed
        // You may need to include other headers here, such as authentication tokens
      },
      data: JSON.stringify({ email, password })
      // If you need to send data in the request body, you can include it here:
      // body: JSON.stringify({ key: 'value' }),
    }).then(res => {
      let userInf = res.data;
      setUserInfo(userInf);
      setTestLogin(true)
      console.log('ana f then dyal login');
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLoading(false);

    })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };
  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      console.log('islogged')
      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };



  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.access_token}` },
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  return (
    <AuthContext.Provider value={{ register, login, isLoggedIn, userInfo, testLogin }}>
      {children}
    </AuthContext.Provider>)
}
export function useAuth() {
  return useContext(AuthContext);
}