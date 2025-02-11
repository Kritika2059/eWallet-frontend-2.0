// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './app/(tabs)/index';  // Correct path
// import LoginScreen from './app/screens/LoginScreen';
// import SignupScreen from './app/screens/SignupScreen';
// import { NavigationContainer } from '@react-navigation/native';  // Import NavigationContainer here

// const Stack = createStackNavigator();

// export default function Navigation() {
//   return (
//     <NavigationContainer>  {/* Wrap the navigator with NavigationContainer */}
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen 
//           name="Home" 
//           component={HomeScreen} 
//           options={{ gestureEnabled: false }} // Disable default swipe-back gesture
//         />
//         <Stack.Screen name="loginScreen" component={LoginScreen} />
//         <Stack.Screen name="signupScreen" component={SignupScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
