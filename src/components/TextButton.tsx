import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';

interface TextButtonProps {
  title: string;
  onPress: () => void;
  color?: string; // Permite personalizar a cor do texto (opcional)
}

const TextButton = ({ title, onPress, color }: TextButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={[styles.text, { color: color || theme.colors.secondary }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
  text: {
    fontSize: theme.fontSizes.medium,
    fontWeight: '600',
  },
});

export default TextButton;
