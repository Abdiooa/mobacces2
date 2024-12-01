import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Speech from "expo-speech";

const HomePage = ({ navigation }: { navigation: any }) => {
  // State to manage TTS activation
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);

  // Function to handle TTS playback
  const handleSpeak = () => {
    const text =
      "Acceso est une application dédiée à rendre le monde numérique plus inclusif, accessible et sans barrières pour tous.  Connectez-vous avec Mobile ID ";
    Speech.speak(text, {
      language: "fr-FR",
      rate: 1.0,
    });
  };

  useEffect(() => {
    if (isTTSEnabled) {
      handleSpeak();
    }
  }, [isTTSEnabled]);

  // Toggle TTS state
  const toggleTTS = () => {
    setIsTTSEnabled((prev) => {
      if (prev) {
        Speech.stop();
      }
      return !prev;
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fdfefe]">
      {/* Top Section */}
      <View className="flex flex-row justify-end px-4 pt-4">
        <TouchableOpacity>
          <Text className="text-sm font-medium text-blue-600">EN</Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View className="flex-1 items-center justify-center px-6">
        {/* Logo */}
        <Image
          source={require("../assets/images/logo10.png")} // Replace with your app logo
          className="w-24 h-24 mb-2"
          resizeMode="contain"
        />

        {/* App Name */}
        <Text className="text-3xl font-bold text-blue-600">Acceso</Text>

        {/* Description */}
        <Text className="text-center text-gray-700 mt-4 mb-8">
          Acceso est une application dédiée à rendre le monde numérique plus
          inclusif, accessible et sans barrières pour tous.
        </Text>

        {/* Connect Button */}
        <TouchableOpacity
          className="bg-blue-600 rounded-full py-3 px-10"
          onPress={() => navigation.navigate("LoginId")}
        >
          <Text className="text-white text-lg font-semibold">
            Connectez-vous avec Mobile ID
          </Text>
        </TouchableOpacity>

        {/* Accessibility Tools */}
        <View className="flex flex-row items-center mt-8 space-x-6">
          <TouchableOpacity className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
            <Text className="text-lg font-bold text-gray-600">AI</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
            <Text className="text-lg font-bold text-gray-600">👁‍🗨</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`${
              isTTSEnabled ? "bg-blue-600" : "bg-gray-200"
            } w-12 h-12 rounded-full flex items-center justify-center`}
            onPress={toggleTTS} // Toggle TTS state
          >
            <Text
              className={`text-lg font-bold ${
                isTTSEnabled ? "text-white" : "text-gray-600"
              }`}
            >
              🔊
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Section */}
      <View className="flex flex-row justify-between items-center px-6 py-4">
        <TouchableOpacity>
          <Text className="text-gray-500 text-sm">Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-gray-500 text-sm">Help</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
