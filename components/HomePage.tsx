import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Speech from "expo-speech";
import Voice from "@react-native-voice/voice";

const HomePage = ({ navigation }: { navigation: any }) => {
  const [isListening, setIsListening] = useState(false); // Pour la reconnaissance vocale
  const [isTTSEnabled, setIsTTSEnabled] = useState(true); // Pour activer/désactiver TTS

  useEffect(() => {
    // Démarrer l'introduction dès le chargement de la page
    if (isTTSEnabled) {
      presentIntro();
    }
  }, []);

  // Fonction pour présenter l'introduction et poser la question
  const presentIntro = () => {
    const introText =
      "Acceso est une application dédiée à rendre le monde numérique plus inclusif, accessible et sans barrières pour tous.";
    const questionText =
      "Voulez-vous vous connecter avec Mobile ID ? Dites 'oui' pour continuer ou 'non' pour rester sur cette page.";

    Speech.speak(introText, {
      language: "fr-FR",
      rate: 1.0,
      onDone: () => {
        Speech.speak(questionText, {
          language: "fr-FR",
          rate: 1.0,
          onDone: startListening, // Démarre l'écoute après la question
        });
      },
    });
  };

  // Démarrer la reconnaissance vocale
  const startListening = async () => {
    try {
      setIsListening(true);
      Voice.start("fr-FR");
    } catch (error) {
      console.error("Erreur lors du démarrage de l'écoute :", error);
    }
  };

  // Arrêter la reconnaissance vocale
  const stopListening = async () => {
    try {
      setIsListening(false);
      Voice.stop();
    } catch (error) {
      console.error("Erreur lors de l'arrêt de l'écoute :", error);
    }
  };

  // Gérer les résultats de la reconnaissance vocale
  useEffect(() => {
    Voice.onSpeechResults = (event) => {
      const spokenText = event.value?.[0]?.toLowerCase() ?? "";
      handleVoiceCommand(spokenText);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Gérer la commande vocale
  const handleVoiceCommand = (command: string) => {
    stopListening(); // Arrêter la reconnaissance vocale
    if (command.includes("oui")) {
      Speech.speak("Redirection vers la page de connexion.", {
        language: "fr-FR",
      });
      navigation.navigate("LoginId");
    } else if (command.includes("non")) {
      Speech.speak("Très bien, restez sur cette page.", { language: "fr-FR" });
    } else {
      Speech.speak("Je n'ai pas compris, pouvez-vous répéter ?", {
        language: "fr-FR",
        onDone: startListening, // Relancer l'écoute
      });
    }
  };

  // Basculer l'état de la synthèse vocale
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
          source={require("../assets/images/logo10.png")} // Remplacez par votre logo
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
            onPress={toggleTTS}
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
          <Text className="text-gray-500 text-sm">Paramètres</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-gray-500 text-sm">Aide</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
