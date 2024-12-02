import React, { useState } from "react";
import { View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const Scan = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      // Request permission for camera and media
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Sorry, we need permission to access your photos!"
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct usage
        allowsEditing: true,
        quality: 1,
      });

      // If user picks an image, save the image URI
      if (!result.cancelled) {
        setImage(result.uri);
        // You can add further logic to send this image to your Flask backend for processing
        sendImageToServer(result.uri); // Example function to send image to Flask server
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const sendImageToServer = async (imageUri: string) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg", // Make sure to specify correct image type
        name: "image.jpg",
      });

      const response = await fetch("http://192.168.177.157:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Prediction result:", data);
        Alert.alert(
          "Prediction Result",
          `${data.prediction}\nConfidence: ${data.confidence}`
        );
      } else {
        Alert.alert("Error", "Failed to get prediction from server");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while sending the image");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}
    </View>
  );
};

export default Scan;
