import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert, // Import Alert for notifications
} from "react-native";
import DemandForm from "./DemandForm"; // Import the DemandForm component

const AdminService = () => {
  const [requests, setRequests] = useState<any[]>([]); // Array of requests
  const [viewMode, setViewMode] = useState("menu"); // For toggling between the menu and request details
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null); // Selected request

  const handleCreateRequest = (newRequest: {
    id: number;
    name: string;
    type: string;
    requiredDocuments: string;
    demandDescription: string;
    status: string;
  }) => {
    // Simple validation check
    if (
      !newRequest.name ||
      !newRequest.type ||
      !newRequest.requiredDocuments ||
      !newRequest.demandDescription
    ) {
      // Show an error alert if any required field is missing
      Alert.alert(
        "Erreur",
        "Tous les champs doivent être remplis pour créer une demande.",
        [{ text: "OK" }]
      );
      return;
    }

    // If validation passes, add the request to the list
    setRequests([...requests, newRequest]);

    // Show a success alert
    Alert.alert("Succès", "La demande a été créée avec succès.", [
      { text: "OK" },
    ]);

    setViewMode("menu"); // Go back to menu after creating request
  };

  const handleSelectRequest = (request: any) => {
    setSelectedRequest(request);
    setViewMode("details");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Menu to select options */}
        {viewMode === "menu" && (
          <View style={styles.menuContainer}>
            <Text style={styles.title}>Choisissez une option</Text>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => setViewMode("create")}
            >
              <Text style={styles.linkText}>Créer une nouvelle demande</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => setViewMode("requests")}
            >
              <Text style={styles.linkText}>Consulter vos demandes</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Create new request form */}
        {viewMode === "create" && (
          <DemandForm
            onCreateRequest={handleCreateRequest} // Pass the correct handler function
            onCancel={() => setViewMode("menu")}
          />
        )}

        {/* Display all requests */}
        {viewMode === "requests" && (
          <View style={styles.requestsContainer}>
            <Text style={styles.title}>Toutes vos demandes</Text>
            {requests.length === 0 ? (
              <Text style={styles.noRequestsText}>
                Aucune demande n'a été créée.
              </Text>
            ) : (
              requests.map((req) => (
                <TouchableOpacity
                  key={req.id}
                  style={styles.requestItem}
                  onPress={() => handleSelectRequest(req)}
                >
                  <Text style={styles.requestText}>{req.name}</Text>
                  <Text style={styles.statusText}>Statut: {req.status}</Text>
                </TouchableOpacity>
              ))
            )}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setViewMode("menu")}
            >
              <Text style={styles.cancelButtonText}>Retour au menu</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Display selected request details */}
        {viewMode === "details" && selectedRequest && (
          <View style={styles.selectedRequestContainer}>
            <Text style={styles.title}>Détails de la demande</Text>
            <Text style={styles.detailText}>Nom: {selectedRequest.name}</Text>
            <Text style={styles.detailText}>
              Statut: {selectedRequest.status}
            </Text>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setViewMode("requests")}
            >
              <Text style={styles.cancelButtonText}>Retour aux demandes</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
  },
  menuContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 15,
  },
  linkButton: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginBottom: 10,
  },
  linkText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  requestsContainer: {
    marginTop: 20,
  },
  noRequestsText: {
    color: "gray",
    fontSize: 18,
    textAlign: "center",
  },
  requestItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  requestText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusText: {
    color: "gray",
    fontSize: 16,
  },
  cancelButton: {
    padding: 15,
    backgroundColor: "#ddd",
    marginTop: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 18,
    textAlign: "center",
  },
  selectedRequestContainer: {
    marginTop: 20,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default AdminService;
