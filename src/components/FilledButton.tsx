import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonComponentProps {
    title: string; // Texto do botão
    onPress: () => void; // Função a ser executada ao pressionar
    disabled?: boolean; // Indica se o botão está desativado
  }

const FilledButton: React.FC<ButtonComponentProps> = ({
    title,
    onPress,
    disabled = false,
  }) => {
    return (

      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, styles.materialButtonViolet, disabled && styles.disabledButton]}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Text style={[styles.caption]}>{title}</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  caption: {
    color: "#fff",
    fontSize: 14
  },
  disabledButton: {
    backgroundColor: '#B0B0B0',
  },
  materialButtonViolet: {
    height: 42,
    width: 118,
    marginTop: 31,
    marginLeft: 128
  },
});

export default FilledButton;
