import { Image, Text, View } from "react-native"
import { ProfilelInfoDTO } from "../models/ProfessionalInfoDTO"
import { styles } from "../styles/styles"
import React from "react"

const ProfileInfo = ({ profile }: { profile: ProfilelInfoDTO | null }) => {
    return (

        <View style={styles.profileContainer}>
            {profile ? (
                <>
                    <Image
                        source={{ uri: profile?.photo }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.name}>{profile?.name}</Text>
                    {profile?.registration ? (
                        <Text style={styles.objective}>Número de Registro: {profile?.registration}</Text>
                    ) : (
                        <Text style={styles.objective}>Objetivo: {profile?.objective}</Text>
                    )}
                </>
            ) : (
                <Text style={styles.objective}>Você precisa se associar a um profissional.</Text>
            )}
        </View>
    )
}

export default ProfileInfo;
