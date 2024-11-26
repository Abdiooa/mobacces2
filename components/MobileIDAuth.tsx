import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import useMobileIDAuth from "@/hook/useMobileIDAuth";
import urls from "@/constant/urls";

const MobileIDAuth = () => {
  const [clientId, setClientId] = useState("");

  const { data, isLoading, error, refetch } = useMobileIDAuth({
    endpoint: urls.API_URL,
    body: { client_id: clientId },
    headers: {
      WebMobileIDAuthorization: urls.WEBMOBILEIDAUTHORIZATION,
      Org: urls.ORG,
    },
  });

  const handleAuthentication = () => {
    if (!clientId) {
      Alert.alert("Erreur", "Veuillez entrer votre Client ID.");
      return;
    }
    refetch({ client_id: clientId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentification Mobile ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre Client ID"
        value={clientId}
        onChangeText={setClientId}
      />
      <Button
        title="S'authentifier"
        onPress={handleAuthentication}
        color="#007AFF"
      />
      {isLoading && (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      )}
      {error && (
        <Text style={styles.errorText}>
          Erreur: {error?.message || "Une erreur inconnue s'est produite."}
        </Text>
      )}
      {data ? (
        <Text style={styles.successText}>Réponse: {JSON.stringify(data)}</Text>
      ) : (
        <Text style={styles.infoText}>Aucune réponse reçue.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  successText: {
    color: "green",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    color: "#666",
  },
});

export default MobileIDAuth;
