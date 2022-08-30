import { StyleSheet, Text,Button, Alert,Image,View ,SafeAreaView} from 'react-native';
import ServerloginScreen from './app/screens/ServerloginScreen';
import ServersignupScreen from './app/screens/ServersignupScreen';
import VendorhomeScreen from './app/screens/VendorhomeScreen';
import VendorLogScreen from './app/screens/VendorLogScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{ useEffect,useState } from 'react';
import ClientRoom from './app/screens/ClientRoom';
import ClientWaiting from './app/screens/ClientWaiting';
import ClientChat from './app/screens/ClientChat';
import FeedbackScreen from './app/screens/FeedbackScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'  screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={WelcomeScreen} ></Stack.Screen>
      <Stack.Screen name="VendorHome" component={VendorhomeScreen} ></Stack.Screen>
      <Stack.Screen name="Vendorlogin" component={ServerloginScreen} ></Stack.Screen>
      <Stack.Screen name="Vendorsignup" component={ServersignupScreen} ></Stack.Screen>
      <Stack.Screen name="Vendorwaiting" component={VendorLogScreen} ></Stack.Screen>
      <Stack.Screen name="ClientRoom" component={ClientRoom} ></Stack.Screen>
      <Stack.Screen name="ClientWaiting" component={ClientWaiting} ></Stack.Screen>
      <Stack.Screen name="ClientChat" component={ClientChat} ></Stack.Screen>
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} ></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
  );

}

