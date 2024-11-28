import { Image, Text, View } from "react-native"
import { ProfessionalInfoDTO } from "../models/ProfessionalInfoDTO"
import { styles } from "../styles/styles"
import React from "react"

const ProfessionalInfo = ({professional}: {professional: ProfessionalInfoDTO}) => {
    return (
        <View style={styles.profileContainer}>
            <Image
                source={{ uri: professional.photo }}
                style={styles.profileImage}
            />
            <Text style={styles.name}>{professional.name}</Text>
            <Text style={styles.objective}>Número de Registro: {professional.registration}</Text>
        </View>
    )
}

export default ProfessionalInfo;
