import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
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
    status: string;
  }) => {
    setRequests([...requests, newRequest]);
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
            onCreateRequest={handleCreateRequest}
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
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 15,
  },
  linkButton: {
    padding: 15,
    backgroundColor: "#007AFF",
    marginVertical: 10,
    borderRadius: 5,
  },
  scrollContainer: {
    paddingBottom: 20, // To prevent content from being cut off when scrolled
  },
  linkText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  cancelButton: {
    padding: 15,
    backgroundColor: "#ddd",
    marginTop: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 18,
    textAlign: "center",
  },
  menuContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  requestsContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  requestItem: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginVertical: 5,
  },
  requestText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 14,
    color: "#555",
  },
  noRequestsText: {
    fontSize: 16,
    color: "#555",
  },
  selectedRequestContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default AdminService;
