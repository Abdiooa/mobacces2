import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useMobileIDAuth from "@/hooks/useMobileIDAuth";
import useMobileIDStatusCheck from "@/hooks/useMobileIDStatusCheck";
import { Image } from "react-native";

const MobileIDAuth = ({ navigation }: { navigation: any }) => {
  const [clientId, setClientId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false); // Unified loading state

  const { data, authenticate } = useMobileIDAuth();
  const { checkStatus } = useMobileIDStatusCheck();

  const handleAuthentication = async () => {
    if (!clientId) {
      Alert.alert("Erreur", "Veuillez entrer votre Client ID.");
      return;
    }

    setIsProcessing(true); // Start loading
    try {
      const keyval = await authenticate(clientId); // Authenticate the user
      if (keyval) {
        const authenticated = await checkStatus(clientId, keyval); // Check the status
        if (authenticated) {
          navigation.navigate("Acceuil"); // Navigate to the home page
          return;
        }
      }
      Alert.alert("Erreur", "La vérification du statut a échoué.");
    } catch (err: any) {
      Alert.alert("Erreur", err.message || "Une erreur est survenue.");
    } finally {
      setIsProcessing(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back-outline"
          size={30}
          color="#007AFF"
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Mobile ID Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/mobileidlogo.jpeg")}
          style={styles.logo}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Mobile ID Authentication</Text>

      {/* Input for Client ID */}
      <TextInput
        style={styles.input}
        placeholder="Entrez votre Client ID"
        value={clientId}
        onChangeText={setClientId}
        keyboardType="default"
      />

      {/* Authentication Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleAuthentication}
        disabled={isProcessing} // Disable button while loading
      >
        {isProcessing ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>S'authentifier</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#007AFF",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 15,
    width: "80%",
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MobileIDAuth;
