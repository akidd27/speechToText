import SpeechToTextContainer from "@/containers/SpeechToTextContainer";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#d6652d"
      }}
    >
      <Text style={styles.titleText}>Speech to Text App</Text>
      <SpeechToTextContainer/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});


