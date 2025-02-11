import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { runOnJS } from "react-native-reanimated";

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export default function LoginScreen() {
  const navigation = useNavigation();
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioResponse, setAudioResponse] = useState(null);
  const [randomAudio, setRandomAudio] = useState(null);
  const [randomTranscription, setRandomTranscription] = useState(null);
  const AUDIO_CACHE_DIR = FileSystem.cacheDirectory;
  const API_URL = "http://192.168.1.72:6000/predict";

  const audioFilesMapping = {
    login1: require("../../assets/l1.mp3"),
    login2: require("../../assets/l2.mp3"),
    login3: require("../../assets/l3.mp3"),
    login4: require("../../assets/l4.mp3"),
    login5: require("../../assets/l5.mp3"),
  };

  const loginAudioSequence = ["login1", "login2", "login3", "login4", "login5"];
  const audioTranscriptions = [
    "१२५६५",//नयाँ दिन, नयाँ सुरुवात
    "४६५६४",//जीवन एक सुन्दर यात्रा हो
    "२४७६५",//मेहनतले मात्र सफलता प्राप्त हुन्छ
    "९७५६४",//सधैं सकारात्मक सोच राख्नुहोस्
    "२३५४६",//बसे लेउ लाग्छ, हिंडे छेंऊ लाग्छ
  ];

  useEffect(() => {
    const shuffledIndex = Math.floor(Math.random() * loginAudioSequence.length);
    setRandomAudio(loginAudioSequence[shuffledIndex]);
    setRandomTranscription(audioTranscriptions[shuffledIndex]);
    playAudio(loginAudioSequence[shuffledIndex]);
  }, []);

  const playAudio = async (file) => {
    try {
      if (!file) return;
      const { sound } = await Audio.Sound.createAsync(audioFilesMapping[file], { shouldPlay: true });
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);

      if (uri) {
        const newFilePath = `${AUDIO_CACHE_DIR}audio.wav`;
        await FileSystem.moveAsync({ from: uri, to: newFilePath });
        setAudioFile(newFilePath);
        uploadAudio(newFilePath);
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  const uploadAudio = async (fileUri) => {
    const formData = new FormData();
    formData.append("audio", { uri: fileUri, type: "audio/wav", name: "audio.wav" });

    try {
      console.log("Uploading audio...");
      const response = await axios.post(API_URL, formData, { headers: { "Content-Type": "multipart/form-data" } });
      console.log("Audio upload success:", response.data);
      setAudioResponse(response.data.transcription);
      verifyUser(response.data.transcription);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  const verifyUser = (transcribedText) => {
    if (!transcribedText || !randomTranscription) {
      console.error("Missing transcriptions for comparison.");
      return;
    }

    const similarity = getSimilarityScore(transcribedText, randomTranscription);
    console.log(`Similarity Score: ${similarity}%`);

    if (similarity >= 30) {
      console.log("User authenticated! Navigating to Home...");
      navigation.navigate("home");
    } else {
      Alert.alert("Authentication Failed", "Voice verification failed. Please try again.");
    }
  };

  const getSimilarityScore = (transcription, correctText) => {
    const words1 = transcription.split(" ");
    const words2 = correctText.split(" ");
    let matchCount = 0;
    words1.forEach((word) => {
      if (words2.includes(word)) matchCount++;
    });
    return (matchCount / words2.length) * 100;
  };

  const handleDoubleTap = () => {
    if (isRecording) return;
    startRecording();
  };

  const handleSingleTap = () => {
    if (isRecording) stopRecording();
  };

  const doubleTapGesture = Gesture.Tap().numberOfTaps(2).onEnd(runOnJS(handleDoubleTap));
  const singleTapGesture = Gesture.Tap().onEnd(runOnJS(handleSingleTap));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={Gesture.Exclusive(doubleTapGesture, singleTapGesture)}>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.instruction}>
            {isRecording
              ? "🔴 Recording... | Single-tap to 🛑 Stop"
              : "Double-tap to 🎤 Start Recording"}
          </Text>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#015f66", justifyContent: "center", alignItems: "center" },
  title: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  instruction: { color: "#fff", fontSize: 18, marginTop: 10, textAlign: "center" }
});
