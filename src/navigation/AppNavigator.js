import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  // Mock authentication state. In real life, this would check SecureStore or an API token.
  // Initially false so the user sees the Welcome Screen first!
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 
        This is a common navigation pattern in React Native.
        If the user is NOT authenticated, we only show the Auth stack.
        If they ARE authenticated, we show the main App stack.
        This completely prevents unauthenticated users from accessing the app.
      */}
      {!isAuthenticated ? (
        <Stack.Screen name="Auth">
            {/* We pass a function down to let the AuthNavigator flip the state to true */}
            {(props) => <AuthNavigator {...props} onLogin={() => setIsAuthenticated(true)} />}
        </Stack.Screen>
      ) : (
        // --- Main App Stack (Protected Routes) ---
        <>
          <Stack.Screen name="MainTabs">
            {(props) => <TabNavigator {...props} onLogout={() => setIsAuthenticated(false)} />}
          </Stack.Screen>
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ animation: 'slide_from_right' }}
          />
          {/* Global Success Screen that can be called from anywhere */}
          <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={{ presentation: 'fullScreenModal', animation: 'fade' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
