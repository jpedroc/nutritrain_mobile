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
})