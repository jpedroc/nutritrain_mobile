import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/User/LoginScreen'; // Importe o LoginScreen
import NutriTrainScreen from './src/screens/User/NutriTrainScreen'; // Supondo que você tenha uma tela de registro
import RegisterScreen from './src/screens/User/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={NutriTrainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
