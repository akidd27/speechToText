import { ScrollView, Text } from "react-native"

const TextDisplayBox = ({transcript}: {transcript: string}) => {
    return (
        <ScrollView
            style={{
                margin: 25,
                padding: 10,
                paddingTop: 5,
                height: 300,
                width: 600,
                borderColor: "black",
                borderWidth: 2,
                backgroundColor: "#f2f4f7",
                borderRadius: 10
            }}
        >
            <Text>{transcript}</Text>
        </ScrollView>
    );
}

export default TextDisplayBox;
