import TextDisplayBox from "@/components/TextDisplayBox";
import { Button, StyleSheet, View } from "react-native"
import { useState } from "react";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import DropDownPicker from 'react-native-dropdown-picker';

const SpeechToTextContainer = () => {
    const languageOptions = [
        {label: "English", value: "en-US"},
        {label: "Francais", value: "fr-FR"}
    ]

    const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0].value);

    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    useSpeechRecognitionEvent("start", () => setListening(true));
    useSpeechRecognitionEvent("end", () => setListening(false));

    useSpeechRecognitionEvent("result", event => {
        setTranscript(event.results[0]?.transcript);
    });

    useSpeechRecognitionEvent("error", event => {
        console.log("error code:", event.error, "error messsage:", event.message);
    });
    
    const handleStartListening = async () => {
        const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();

        if (!result.granted) {
            console.warn("Permissions not granted", result);
            return;
        }

        ExpoSpeechRecognitionModule.start({
            lang: selectedLanguage,
            interimResults: true,
            maxAlternatives: 1,
            continuous: false,
            requiresOnDeviceRecognition: false,
            addsPunctuation: true
        });
    };

    return (
        <>
        <View>
            <TextDisplayBox transcript={transcript}/>
        </View>
        <View style={styles.optionsContainer}>
            <View style={styles.buttonContainer}>
                {!listening ? 
                <Button title="Start" onPress={handleStartListening} color="#3480eb"/>
                :
                <Button title="Stop" onPress={ExpoSpeechRecognitionModule.stop} color="#eb3434"/>
                }
            </View>
            <DropDownPicker
                    open={languageDropdownOpen}
                    value={selectedLanguage}
                    items={languageOptions}
                    setOpen={setLanguageDropdownOpen}
                    setValue={setSelectedLanguage}
                    setItems={() => {}}
                    placeholder={languageOptions[0].label}
                    containerStyle={{marginLeft: 25, width: 100}}
                    style={{backgroundColor: "#f2f4f7", height: 20, minHeight: 36}}
                />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 100,
        minHeight: 40,
        justifyContent: "center"
    },
    optionsContainer: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
    }
});

export default SpeechToTextContainer;

