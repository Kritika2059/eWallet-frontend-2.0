import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import loginScreen from "./app/(tabs)/loginScreen";
import signupScreen from "./app/(tabs)/signupScreen";
import HomeScreen from "./app/(tabs)/index";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="loginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="signupScreen" component={signupScreen} />
        <Stack.Screen name="loginScreen" component={loginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
