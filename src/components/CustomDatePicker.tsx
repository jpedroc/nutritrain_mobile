import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../styles/theme';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

interface DatePickerProps {
    label: string;
    value: Date;
    onChange: (date: Date) => void
}

const CustomDatePicker = ({ label, value, onChange }: DatePickerProps) => {
    const formatDate = (event, date) => {
        onChange(date);
        //const day = String(date.getDate()).padStart(2, '0');
        //const month = String(date.getMonth() + 1).padStart(2, '0');
        //const year = date.getFullYear();
        //return `${day}-${month}-${year}`;
    };

    const showDatePicker = () => {
        DateTimePickerAndroid.open({
          value: value,
          onChange: formatDate,
          mode: 'date',
          is24Hour: true,
        });
      };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.input}>
                <Text style={styles.dateText}>{value.toDateString() || 'Selecionar Data'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        color: theme.colors.label,
        fontSize: theme.fontSizes.medium,
        marginBottom: theme.spacing.small,
    },
    input: {
        backgroundColor: theme.colors.secondary,
        color: theme.colors.label,
        fontSize: theme.fontSizes.medium,
        paddingVertical: theme.spacing.small,
        paddingHorizontal: theme.spacing.medium,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    dateText: {
        fontSize: 16,
        color: theme.colors.label,
    },
});

export default CustomDatePicker;
