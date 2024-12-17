import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { getDietPlanDetail } from '../../api/DietPlanApi'; // Ajuste de acordo com sua função de API
import { DietPlanDetailDTO, Food, MeasureType } from '../../models/DietPlanDetailDTO'; // Ajuste de acordo com o DTO real
import { styles } from '../../styles/styles';
import ProfileInfo from '../../components/ProfilelInfo';

export const DietPlanDetailScreen = ({ route }: any) => {
    const { dietId, trainer } = route.params;
    const [dietPlan, setDietPlan] = useState<DietPlanDetailDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchDietPlanDetails();
    }, []);

    const fetchDietPlanDetails = async () => {
        setLoading(true);
        try {
            const data = await getDietPlanDetail(dietId);  // Supondo que você tenha uma função de API para isso
            setDietPlan(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!dietPlan) {
        return <Text>Plano de dieta não encontrado.</Text>;
    }

    // Função para formatar os totais das refeições
    const renderMealTotal = (meal: any) => {
        return [
            'Total',
            `${meal.totalCalories.toFixed(2)} kcal`,
            null,
        ];
    };

    const getMeasure = (measure: MeasureType): string => {
        return MeasureType[measure] || '';
    }

    // Cabeçalho das tabelas (Alimento, Calorias, Quantidade)
    const tableHead = ['Alimento', 'Calorias', 'Quantidade'];

    return (
        <ScrollView contentContainerStyle={[styles.content, {flex: 0, flexGrow: 1}]}>
            <ProfileInfo professional={trainer} />
            <Text style={stylesDetail.title}>Plano de Alimentar: {dietPlan.description}</Text>

            {dietPlan.dailyMeals.map((meal, index) => (
                <View key={index} style={stylesDetail.mealContainer}>
                    <Text style={stylesDetail.mealTitle}>{meal.name} ({meal.time})</Text>

                    <Table borderStyle={{ borderWidth: 1, borderColor: '#ddd' }}>
                        {/* Cabeçalho da tabela */}
                        <Row
                            data={tableHead}
                            style={stylesDetail.tableHeader}
                            textStyle={stylesDetail.tableHeaderText}
                        />
                        {/* Dados da refeição */}
                        <Rows
                            data={meal.foods.map((food: Food) => [
                                food.name,
                                `${food.calories.toFixed(2)} kcal`,
                                `${food.quantity} ${getMeasure(food.measure)}`
                            ])}
                            style={stylesDetail.table}
                            textStyle={stylesDetail.tableText}
                        />
                        {/* Total de cada refeição */}
                        <Row
                            data={renderMealTotal(meal)}
                            style={stylesDetail.tableFooter}
                            textStyle={stylesDetail.tableFooterText}
                        />
                    </Table>
                </View>
            ))}

            {/* Total geral do plano alimentar */}
            <View style={stylesDetail.totalMacrosContainer}>
                <Text style={stylesDetail.totalTitle}>Totais do Plano Alimentar</Text>
                <Text style={stylesDetail.totalText}>Calorias: {dietPlan.totalCalories.toFixed(2)} kcal</Text>
                <Text style={stylesDetail.totalText}>Proteínas: {dietPlan.totalProtein.toFixed(2)}g</Text>
                <Text style={stylesDetail.totalText}>Gordura: {dietPlan.totalFat.toFixed(2)}g</Text>
                <Text style={stylesDetail.totalText}>Carboidratos: {dietPlan.totalCarbohydrate.toFixed(2)}g</Text>
                <Text style={stylesDetail.totalText}>Sódio: {dietPlan.totalSodium.toFixed(2)}g</Text>
                <Text style={stylesDetail.totalText}>Fibra: {dietPlan.totalFiber.toFixed(2)}g</Text>
            </View>
        </ScrollView>
    );
};

const stylesDetail = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4A00E0',
    },
    mealContainer: {
        marginBottom: 20,
    },
    mealTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    tableHeader: {
        height: 40,
        backgroundColor: '#f4f4f4',
    },
    tableHeaderText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
    },
    tableText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#333',
    },
    table: {
        backgroundColor: '#f4f4f4',
    },
    tableFooter: {
        height: 40,
        backgroundColor: '#f4f4f4',
    },
    tableFooterText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
    },
    totalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4A00E0',
    },
    totalMacrosContainer: {
        marginTop: 20,
        padding: 8,
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    totalText: {
        fontSize: 14,
        marginBottom: 4,
    },
});
