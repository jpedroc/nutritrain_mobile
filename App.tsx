import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NutriTrainScreen from './src/screens/Auth/NutriTrainScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NutriTrain"
          component={NutriTrainScreen}
          options={{ headerShown: false }} // Esconde o cabeçalho
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
