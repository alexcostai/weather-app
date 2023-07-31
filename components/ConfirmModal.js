import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
//project imports
import { TextColors } from "styles/palette";

export default function ConfirmModal({
  stateModal,
  setStateModal,
  text,
  onConfirmModal,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={stateModal}
      onRequestClose={() => {
        setStateModal(!stateModal);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={{ ...styles.button, backgroundColor: TextColors.main }}
              onPress={() => setStateModal(!stateModal)}
            >
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: TextColors.mainColor,
              }}
              onPress={() => onConfirmModal()}
            >
              <Text style={styles.textStyle}>Si</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 30,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    alignItems: "center",
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: "center",
  },
  buttonsContainer: {
    gap: 10,
    display: "flex",
    flexDirection: "row",
  },
});
