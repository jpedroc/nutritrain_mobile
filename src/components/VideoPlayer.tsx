import { Video } from 'expo-av';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const VideoModal = ({ isVisible, videoUri, onClose }) => {
    console.log(videoUri)
  return (
    <Modal
      transparent={true} // Modal sem fundo
      visible={isVisible}
      onRequestClose={onClose} // Fecha o modal quando o usuário tenta fechá-lo
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          {/* Adiciona o vídeo aqui, caso seja necessário */}
          <Video
            source={{ uri: videoUri }} // Video em Base64
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            useNativeControls
            style={styles.videoPlayer}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo preto semitransparente
  },
  modalContent: {
    width: '90%', // Defina o tamanho do modal conforme sua necessidade
    backgroundColor: 'white', // Cor do conteúdo do modal
    borderRadius: 10,
    padding: 20,
  },
  videoPlayer: {
    width: '100%',
    height: 200, // Ajuste o tamanho do vídeo conforme necessário
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default VideoModal;
