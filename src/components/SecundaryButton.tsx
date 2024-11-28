import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';

const SecundaryButton = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: 8,
    borderWidth: 2,         // Borda do botão
    marginVertical: theme.spacing.small,
    borderColor: theme.colors.text
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SecundaryButton;
