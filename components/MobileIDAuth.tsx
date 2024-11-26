import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";
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
      console.log("Erreur", "Veuillez entrer votre Client ID.");
      return;
    }
    refetch({ client_id: clientId });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Entrez votre Client ID:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
        placeholder="Client ID"
        value={clientId}
        onChangeText={setClientId}
      />
      <Button title="S'authentifier" onPress={handleAuthentication} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && (
        <Text style={{ color: "red" }}>
          Erreur: {error?.message || "Une erreur inconnue s'est produite."}
        </Text>
      )}
      {data ? (
        <Text style={{ color: "green" }}>Réponse: {JSON.stringify(data)}</Text>
      ) : (
        <Text>Aucune réponse reçue.</Text>
      )}
    </View>
  );
};

export default MobileIDAuth;
