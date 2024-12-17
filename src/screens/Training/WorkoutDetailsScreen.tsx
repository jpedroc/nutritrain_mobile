import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getWorkoutDetail } from '../../api/WorkoutApi';
import { WorkoutDetailDTO } from '../../models/WorkoutDetailDTO';
import ProfileInfo from '../../components/ProfilelInfo';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/WorkoutType';
import { styles } from '../../styles/styles';
import PrimaryButton from '../../components/PrimaryButton';
import VideoModal from '../../components/VideoPlayer';

type WorkoutDetailsRouteProp = RouteProp<RootStackParamList, 'WorkoutDetails'>;

const WorkoutDetailsScreen = () => {
    const route = useRoute<WorkoutDetailsRouteProp>();
    const { workoutName, workoutDate, workoutId, trainer } = route.params;
    const [exercises, setExercises] = useState<WorkoutDetailDTO[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentVideoUri, setCurrentVideoUri] = useState('');

    const handleOpenVideo = (videoUri: string) => {
        setCurrentVideoUri(videoUri);
        setModalVisible(true);
    };

    useEffect(() => {
        const fetchWorkoutDetails = async () => {
            try {
                const response = await getWorkoutDetail(workoutId);
                setExercises(response);
            } catch (error) {
                console.error('Erro ao buscar detalhes do treino:', error);
            }
        };

        fetchWorkoutDetails();
    }, [workoutId]);

    const renderExercise = ({ item }) => (
        <View style={stylesDetail.exerciseCard}>
            <Text style={stylesDetail.exerciseName}>{item.name}</Text>
            <Text>Series: {item.series} | Repetições: {item.repetitions} | Carga: {item.load} kg</Text>
            <Text>Observações: {item.observations || 'Nenhuma'}</Text>
            <PrimaryButton title="Ver execução" onPress={() => handleOpenVideo(item.execution)} />
        </View>
    );

    return (
        <View style={styles.content}>
            <ProfileInfo professional={trainer} />
            <View style={stylesDetail.workoutInfo}>
                <Text style={stylesDetail.workoutName}>{workoutName}</Text>
                <Text style={stylesDetail.workoutDate}>{workoutDate}</Text>
            </View>
            <FlatList
                data={exercises}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderExercise}
                contentContainerStyle={stylesDetail.listContent}
            />
            <VideoModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                videoUri={currentVideoUri}
            />
        </View>
    );
};

const stylesDetail = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    workoutInfo: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    workoutName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    workoutDate: {
        fontSize: 16,
        color: '#666',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    exerciseCard: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    exerciseName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    video: {
        width: '100%',
        height: 200,
        marginTop: 10,
    },
});

export default WorkoutDetailsScreen;
