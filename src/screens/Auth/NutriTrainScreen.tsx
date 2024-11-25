import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NutriTrainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NutriTrain</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Cor de fundo
  },
  text: {
    fontSize: 32, // Tamanho da fonte
    fontWeight: 'bold', // Texto em negrito
    color: '#007BFF', // Cor do texto
  },
});

export default NutriTrainScreen;
