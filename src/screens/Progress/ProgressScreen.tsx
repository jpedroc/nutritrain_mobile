import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { ProgressChartDTO } from '../../models/ProgressChartDTO';
import { getProgressChart, getProgressInfo } from '../../api/ProgressApi';
import { styles } from '../../styles/styles';
import { FlatList } from 'react-native-gesture-handler';
import { ProgressInfoDTO } from '../../models/ProgressInfoDTO';

const screenWidth = Dimensions.get('window').width;

export const ProgressScreen = () => {
    const [progressChart, setProgressChart] = useState<ProgressChartDTO | null>(null);
    const [progressInfo, setProgressInfo] = useState<ProgressInfoDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchProgressData();
    }, []);

    const fetchProgressData = async () => {
        setLoading(true);
        try {
            const chartData = await getProgressChart(); // API para pegar dados do gráfico
            setProgressChart(chartData || { dates: [], weights: [], bodyFatPercentages: [], leanMasses: [] });  // Valor padrão vazio caso os dados não sejam carregados
            const infoData = await getProgressInfo(); // Ajuste conforme a função para obter as evoluções
            setProgressInfo(infoData || []);  // Valor padrão vazio caso os dados não sejam carregados
        } catch (error) {
            console.error('Error fetching progress data', error);
        } finally {
            setLoading(false);
        }
    };

    const renderProgressInfo = ({ item }: { item: ProgressInfoDTO }) => (
        <View style={stylesDetail.progressInfoItem}>
            <Text>{`Data: ${item.date}`}</Text>
            <Text>{`Peso: ${item.weight.toFixed(2)} kg`}</Text>
            <Text>{`% Gordura: ${item.bodyFatPercentage.toFixed(2)}%`}</Text>
            <Text>{`Massa Magra: ${item.leanMass.toFixed(2)} kg`}</Text>
        </View>
    );

    if (!progressChart) {
        return <Text>Carregando dados de progresso...</Text>;
    }

    const chartData = {
        labels: progressChart.dates.map(date => date.toString()), // Exibindo as datas no gráfico
        datasets: [
            {
                data: progressChart.weights.map(weight => parseFloat(weight.toString())), // Conversão para número
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2,
            },
            {
                data: progressChart.bodyFatPercentages.map(fat => parseFloat(fat.toString())), // Conversão para número
                color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                strokeWidth: 2,
            },
            {
                data: progressChart.leanMasses.map(mass => parseFloat(mass.toString())), // Conversão para número
                color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    };

    return (
        <ScrollView contentContainerStyle={[styles.content, {flex: 0, flexGrow: 1}]}>
            <Text style={stylesDetail.title}>Gráfico de evolução</Text>

            <LineChart
                data={chartData}
                width={screenWidth - 20}
                height={220}
                chartConfig={chartConfig}
                style={stylesDetail.chart}
            />

            <View style={stylesDetail.legendContainer}>
                <Text style={stylesDetail.legendTitle}>Legenda:</Text>
                <View style={stylesDetail.legendRow}>
                    <View style={[stylesDetail.legendBox, { backgroundColor: 'rgba(134, 65, 244, 1)' }]} />
                    <Text style={stylesDetail.legendText}>Peso (kg)</Text>
                </View>
                <View style={stylesDetail.legendRow}>
                    <View style={[stylesDetail.legendBox, { backgroundColor: 'rgba(255, 99, 132, 1)' }]} />
                    <Text style={stylesDetail.legendText}>Percentual de Gordura (%)</Text>
                </View>
                <View style={stylesDetail.legendRow}>
                    <View style={[stylesDetail.legendBox, { backgroundColor: 'rgba(54, 162, 235, 1)' }]} />
                    <Text style={stylesDetail.legendText}>Massa Magra (kg)</Text>
                </View>
            </View>

            <View>
                <Text style={stylesDetail.descriptionText}>
                    O gráfico acima mostra a evolução do seu progresso ao longo do tempo:
                </Text>
                <Text style={stylesDetail.descriptionText}>
                    - **Peso:** Peso corporal total.
                </Text>
                <Text style={stylesDetail.descriptionText}>
                    - **Percentual de Gordura:** Percentual de gordura corporal.
                </Text>
                <Text style={stylesDetail.descriptionText}>
                    - **Massa Magra:** Quantidade de massa muscular (sem gordura).
                </Text>
            </View>

            <Text style={stylesDetail.title}>Suas evoluções</Text>
            {progressInfo && progressInfo.length > 0 ? (
                <View style={stylesDetail.progressInfoList}>
                    {progressInfo.map((item) => (
                        <View key={item.id} style={stylesDetail.progressInfoItem}>
                            <Text>{`Data: ${item.date}`}</Text>
                            <Text>{`Peso: ${item.weight.toFixed(2)} kg`}</Text>
                            <Text>{`% Gordura: ${item.bodyFatPercentage.toFixed(2)}%`}</Text>
                            <Text>{`Massa Magra: ${item.leanMass.toFixed(2)} kg`}</Text>
                        </View>
                    ))}
                </View>
            ) : (
                <Text>Sem evoluções para mostrar.</Text>
            )}
        </ScrollView>
    );
};

// Configuração do gráfico
const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#fff',
    },
};

// Estilos da tela
const stylesDetail = StyleSheet.create({
    container: {
        paddingTop: 80,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4A00E0',
    },
    chart: {
        marginBottom: 20,
    },
    legendContainer: {
        marginBottom: 20,
    },
    legendTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        fontSize: 13,
    },
    legendBox: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    legendText: {
        fontSize: 14,
        color: '#333',
    },
    descriptionText: {
        fontSize: 10,
        marginBottom: 8,
        color: '#333',
    },
    progressInfoItem: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 5,
    },
    progressInfoList: {
        paddingBottom: 20,
    },
});

export default ProgressScreen;
