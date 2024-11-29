import { StyleSheet } from "react-native";
import theme from "./theme";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: theme.colors.background,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.medium,
        paddingTop: theme.spacing.large,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.large,
    },
    logo: {
        width: 120,  // Ajuste o tamanho conforme necessário
        height: 120,
        marginBottom: theme.spacing.medium,
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: theme.spacing.medium,
    },
    picker: {
        height: 40,
        borderColor: '#ccc',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        width: "99%",
        alignItems: "center",
        marginTop: 16,
    },
    buttonsHomeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 30,
        paddingHorizontal: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#6200ea',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    objective: {
        fontSize: 16,
        color: '#666',
    },
    button: {
        backgroundColor: '#6200ea', // Tom de roxo claro
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        paddingTop: 100, // Espaço para evitar sobreposição
        flex: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    video: {
        width: '90%',
        height: 300,
    },
})