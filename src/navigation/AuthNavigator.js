import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import our newly created screens
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import PhoneRegistrationScreen from '../screens/Auth/PhoneRegistrationScreen';
import OTPVerificationScreen from '../screens/Auth/OTPVerificationScreen';
import ProfileSetupScreen from '../screens/Auth/ProfileSetupScreen';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createNativeStackNavigator();

// We accept an 'onLogin' prop which will be passed all the way down to the final screen
export default function AuthNavigator({ onLogin }) {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false, // We hide the default white header because we built custom glass UI!
        animation: 'slide_from_right' // Gives a premium iOS sliding animation between screens
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        initialParams={{ onLogin }}
      />
      <Stack.Screen name="PhoneRegistration" component={PhoneRegistrationScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      
      {/* 
        Special passing of props via initialized component.
        We pass the onLogin function down to ProfileSetupScreen so that when 
        the user finishes the form, they are authenticated.
      */}
      <Stack.Screen 
        name="ProfileSetup" 
        initialParams={{ onLogin }}
        component={ProfileSetupScreen} 
      />
      {/* Success Screen lives here so ProfileSetupScreen can navigate to it */}
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{ presentation: 'fullScreenModal', animation: 'fade' }}
      />
    </Stack.Navigator>
  );
}
