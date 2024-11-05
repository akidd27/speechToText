import { render, screen } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import SpeechToTextContainer from '@/containers/SpeechToTextContainer';
jest.mock('../node_modules/expo-speech-recognition/build/ExpoSpeechRecognitionModule', () => {
  return {
    ExpoSpeechRecognitionModule: {
      requestPermissionsAsync: () => {}
    }
  }
});

jest.mock('../node_modules/expo-speech-recognition/build/useSpeechRecognitionEvent', () => {
  return {
    useSpeechRecognitionEvent: () => {}
  }
});

test('basic test', () => {
  render(<SpeechToTextContainer/>);

  const startButton  = screen.getByText('Start');
  const stopButton  = screen.queryByText('Stop');

  expect(startButton).toBeOnTheScreen();
  expect(stopButton).not.toBeOnTheScreen();
});