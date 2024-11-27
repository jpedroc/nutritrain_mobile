import React from 'react';
import { StyleSheet, TextInput, View, Text, KeyboardTypeOptions } from 'react-native';
import theme from '../styles/theme';

interface InputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboard?: KeyboardTypeOptions;
}

const Input = ({ label, placeholder, value, onChangeText, secureTextEntry, keyboard }: InputProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.medium,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
    marginBottom: theme.spacing.small,
  },
  input: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
});

export default Input;
