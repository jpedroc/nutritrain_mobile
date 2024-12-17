import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTrainerWorkouts } from '../../api/WorkoutApi';
import { styles } from '../../styles/styles';
import { WorkoutListDTO } from '../../models/WorkoutListDTO';
import theme from '../../styles/theme';
import SecundaryButton from '../../components/SecundaryButton';
import { ProfilelInfoDTO } from '../../models/ProfessionalInfoDTO';
import ProfileInfo from '../../components/ProfilelInfo';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/WorkoutType';
import { getProfile } from '../../api/AuthenticationApi';
import { UserType } from '../../models/UserDTO';

type WorkoutListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WorkoutDetails'>;

const WorkoutListScreen = () => {
    const [workouts, setWorkouts] = useState<WorkoutListDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [trainer, setTrainer] = useState<ProfilelInfoDTO | null>(null);
    const navigation = useNavigation<WorkoutListScreenNavigationProp>();

    useEffect(() => {
        loadWorkouts(page);
        fetchPersonaInfo();
    }, [page]);

    const fetchPersonaInfo = async () => {
        setLoading(true);
        try {
            const response = await getProfile(UserType.PERSONAL);
            setTrainer(response);
        } catch (error) {
            console.error('Error fetching personal profile info', error);
        } finally {
            setLoading(false);
        }
    }

    const loadWorkouts = async (pageNumber: number) => {
        setLoading(true);
        try {
            const response = await getTrainerWorkouts(pageNumber, 10); // Função para buscar os treinos
            setHasMore(response.pageable.pageNumber < response.totalPages - 1);
            setWorkouts(prevWorkouts => [...prevWorkouts, ...response.content]);
        } catch (error) {
            console.error('Erro ao buscar treinos:', error);
        } finally {
            setLoading(false);
        }
    }

    // Função para marcar o treino como feito
    const handleWorkoutDone = (workoutId: number) => {
        Alert.alert('Treino', `Treino ${workoutId} marcado como feito.`);
        // Aqui você pode enviar uma requisição para atualizar o status do treino no backend
    };

    const toDetails = (item: WorkoutListDTO) => {
        navigation.navigate('WorkoutDetails', {
            workoutId: item.id,
            workoutName: item.name,
            workoutDate: item.workoutDate,
            trainer: trainer
        });
    };

    const renderItem = ({ item }: { item: WorkoutListDTO }) => (
        <TouchableOpacity onPress={() => toDetails(item)}>
            <View style={stylesWorkout.card}>
                <Text style={stylesWorkout.workoutName}>{item.name}</Text>
                <Text>Data: {new Date(item.workoutDate).toLocaleDateString()}</Text>
                <View style={stylesWorkout.buttonContainer}>
                    <SecundaryButton
                        title="Ta pago!"
                        onPress={() => handleWorkoutDone(item.id)}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );

    // Função para carregar mais dados quando o usuário rolar para baixo
    const handleLoadMore = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1); // Aumentar o número da página
        }
    };

    return (
        <View style={styles.content}>
            <ProfileInfo profile={trainer} />

            <FlatList
                data={workouts}
                keyExtractor={(item) => `${item.id}-${item.studentId}`}
                renderItem={renderItem}
                contentContainerStyle={stylesWorkout.workoutList}
                onEndReached={handleLoadMore} // Chama a função quando o usuário rolar até o final
                onEndReachedThreshold={0.8} // Quando chegar a 50% do final da lista
                ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null} // Mostrar um loading enquanto carrega
            />
        </View>
    );
};

const stylesWorkout = StyleSheet.create({

    workoutList: {
        padding: 16,
    },
    workoutItem: {
        backgroundColor: theme.colors.primary,
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    card: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    workoutName: {
        color: theme.colors.text,
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: -60,
        flexDirection: 'row',
        justifyContent: 'flex-end', // Alinha o botão à direita
    },
});

export default WorkoutListScreen;
