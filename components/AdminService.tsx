import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import DemandForm from "./DemandForm"; // Component for creating a demand
import ViewDemands from "./ViewDemands";
import DemandDetails from "./DemandDetails";

const AdminService = () => {
  const [demands, setDemands] = useState<any[]>([]); // Array of demands
  const [viewMode, setViewMode] = useState<
    "menu" | "create" | "view" | "details"
  >("menu"); // Current view
  const [selectedDemand, setSelectedDemand] = useState<any | null>(null); // Selected demand for details

  // Handle creating a new demand
  const handleCreateDemand = (newDemand: {
    id: number;
    demandName: string;
    type: string;
    requiredDocuments: string;
    demandDescription: string;
    status: string;
  }) => {
    if (
      !newDemand.demandName ||
      !newDemand.type ||
      !newDemand.requiredDocuments ||
      !newDemand.demandDescription
    ) {
      Alert.alert(
        "Erreur",
        "Tous les champs doivent être remplis pour créer une demande.",
        [{ text: "OK" }]
      );
      return;
    }

    setDemands([...demands, newDemand]); // Add new demand to the list
    Alert.alert("Succès", "La demande a été créée avec succès.", [
      { text: "OK" },
    ]);
    setViewMode("menu"); // Return to the menu
  };

  // Handle selecting a demand to view its details
  const handleSelectDemand = (demand: any) => {
    setSelectedDemand(demand);
    setViewMode("details");
  };

  // Handle editing a demand (you can add edit functionality)
  const handleEditDemand = (demand: any) => {
    // For now, we'll just alert that editing is not implemented.
    Alert.alert("Edit", "Edit functionality is not implemented yet.");
  };

  // Handle deleting a demand
  const handleDeleteDemand = (id: string) => {
    Alert.alert(
      "Confirmer",
      "Êtes-vous sûr de vouloir supprimer cette demande ?",
      [
        { text: "Annuler" },
        {
          text: "Supprimer",
          onPress: () => {
            setDemands(demands.filter((demand) => demand.id !== id));
            Alert.alert("Succès", "Demande supprimée avec succès.", [
              { text: "OK" },
            ]);
          },
        },
      ]
    );
  };

  // Handle going back to the main menu
  const handleRetour = () => {
    setViewMode("menu");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Main Menu */}
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
              onPress={() => setViewMode("view")}
            >
              <Text style={styles.linkText}>Consulter vos demandes</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Create Demand */}
        {viewMode === "create" && (
          <DemandForm
            onCreateRequest={handleCreateDemand}
            onCancel={() => setViewMode("menu")}
          />
        )}

        {/* View Demands */}
        {viewMode === "view" && (
          <ViewDemands
            userId="576520" // Replace with the actual user ID
            onViewDetails={handleSelectDemand}
            onEditDemand={handleEditDemand}
            onDeleteDemand={handleDeleteDemand}
          />
        )}

        {/* Demand Details */}
        {viewMode === "details" && selectedDemand && (
          <DemandDetails demand={selectedDemand} onBack={handleRetour} />
        )}

        {/* Retour Button for "view" mode */}
        {viewMode === "view" && (
          <TouchableOpacity style={styles.retourButton} onPress={handleRetour}>
            <Text style={styles.linkText}>Retour</Text>
          </TouchableOpacity>
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
    textAlign: "center",
  },
  linkButton: {
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginBottom: 10,
  },
  linkText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  retourButton: {
    padding: 15,
    backgroundColor: "#FF6347", // A distinct color for the "Retour" button
    borderRadius: 5,
    marginTop: 10,
  },
});

export default AdminService;
