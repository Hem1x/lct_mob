import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import TaskManager from '../screens/TaskManager';
import Analytics from '../screens/Analytics';
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import TaskDetail from '../screens/TaskDetail';
import { useAppSelector } from '../store/hook';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="task-manager"
        component={TaskManager}
        options={{
          tabBarLabel: 'дела',
          tabBarActiveTintColor: '#000000',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="check-square" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="analytics"
        component={Analytics}
        options={{
          tabBarLabel: 'профиль',
          tabBarActiveTintColor: '#000000',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <>
      {isAuth ? (
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="TaskDetail" component={TaskDetail} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Navigation;
