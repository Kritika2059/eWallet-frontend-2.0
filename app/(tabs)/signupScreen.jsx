import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { runOnJS } from "react-native-reanimated";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFiles, setAudioFiles] = useState([]);
  const [username, setUsername] = useState("");
  const AUDIO_CACHE_DIR = FileSystem.cacheDirectory;
  const MAX_RECORDINGS = 5;

  const audioFilesMapping = {
    signup3: require('../../assets/signup3.mp3'),
    signup2: require('../../assets/signup2.mp3'),
  };

  useEffect(() => {
    playAudio('signup3');
    setTimeout(() => playAudio('signup2'), 2000);
  }, []);

  const playAudio = async (file) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        audioFilesMapping[file],
        { shouldPlay: true }
      );
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };
  
  useEffect(() => {
    console.log("Signup flow started");
  }, []);


  const startRecording = async () => {
    if (audioFiles.length >= MAX_RECORDINGS) {
      Alert.alert("Limit Reached", "You can only record up to 5 files.");
      return;
    }

    try {
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
      console.log(`Recording ${audioFiles.length + 1} started...`);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const signupAudioSequence = ["signup2", "signup3", "signup4", "signup5"];

  const stopRecording = async () => {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);

      if (uri) {
        const newFilePath = `${AUDIO_CACHE_DIR}audio_${audioFiles.length + 1}.wav`;
        await FileSystem.moveAsync({ from: uri, to: newFilePath });
        const updatedFiles = [...audioFiles, newFilePath];
        setAudioFiles(updatedFiles);

        // Play next audio if available in sequence
        if (updatedFiles.length <= signupAudioSequence.length) {
          playAudio(signupAudioSequence[updatedFiles.length - 1]);
        }

        // Upload the first audio immediately
        if (updatedFiles.length === 1) uploadFirstAudio(newFilePath);

        // Upload all audio files & register user after MAX_RECORDINGS
        if (updatedFiles.length === 5) {
        
          uploadAudioFiles(updatedFiles);
          registerUser(username);
        }
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };


  const uploadFirstAudio = async (fileUri) => {
    const formData = new FormData();
    formData.append("audio", { uri: fileUri, type: "audio/wav", name: "audio.wav" });

    try {
      const response = await axios.post("https://ewalletbackend-t1gl.onrender.com/api/v1/upload-audio", formData, { headers: { "Content-Type": "multipart/form-data" } });
      console.log("First audio upload success:", response.data);
      const translated =  response.data.transcription.replace(/[०-९]/g, (d) => "०१२३४५६७८९".indexOf(d));
      if (response.data?.translation) setUsername(translated);
    } catch (error) {
      console.error("First audio upload error:", error);
    }
  };

  const uploadAudioFiles = async (files) => {
    if (files.length !== MAX_RECORDINGS) return;
    if (!username.trim()) {
      Alert.alert("Missing Username", "Please enter a username before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    files.forEach(`(uri, index) => formData.append(audio${index + 1}, { uri, type: "audio/wav", name: audio${index + 1}.wav })`);
    try {
      const response = await axios.post("http://192.168.1.72:3001/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
      console.log("Upload success:", response.data);
      Alert.alert("Upload Successful", "All 5 audio files have been uploaded.");
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload Failed", "Check the logs for errors.");
    }
  };

  const registerUser = async (username) => {
    const number = Number(username);
    const response = await axios.post("http://192.168.1.70:3000/register",{"phoneNumber":number},{
        headers: { "Content-Type": "application/json" },
      });
      if(response.ok){
        console.log("User registered successfully !");
      }else{
        console.log("Error registering the user!");
      }
  }

  const handleDoubleTap = () => {
    if (audioFiles.length < MAX_RECORDINGS) {
      startRecording();
    } else {
      navigation.navigate("home");
    }
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
          <Text style={styles.title}>Signup</Text>
          <Text style={styles.instruction}>
            {isRecording ? `🔴 Recording... (Step ${audioFiles.length + 1} of ${MAX_RECORDINGS}) | Single-tap to 🛑 Stop`
              : `Double-tap to 🎤 Start Recording (Step ${audioFiles.length + 1} of ${MAX_RECORDINGS})`}
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