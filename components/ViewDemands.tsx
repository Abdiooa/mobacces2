import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import useDemandsByUser from "../hooks/useDemandsByUser"; // Import the hook
import useDeleteDemandByID from "../hooks/useDeleteDemandByID"; // Import the delete hook

interface ViewDemandsProps {
  userId: string;
  onViewDetails: (demand: any) => void;
  onEditDemand: (demand: any) => void;
  onDeleteDemand: (id: string) => void; // Change id to string
}

const ViewDemands: React.FC<ViewDemandsProps> = ({
  userId,
  onViewDetails,
  onEditDemand,
  onDeleteDemand,
}) => {
  const { getDemands, demands, loading, error } = useDemandsByUser(userId);
  const {
    deleteDemandByID,
    loading: deleteLoading,
    error: deleteError,
    success,
  } = useDeleteDemandByID(); // Use the delete hook

  // Fetch demands when the component mounts
  useEffect(() => {
    getDemands();
  }, [getDemands]);

  // Handle delete demand by ID
  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmer",
      "Êtes-vous sûr de vouloir supprimer cette demande ?",
      [
        { text: "Annuler" },
        {
          text: "Supprimer",
          onPress: async () => {
            await deleteDemandByID(id); // Call the delete hook
            if (success) {
              getDemands(); // Reload demands after deletion
            }
          },
        },
      ]
    );
  };

  if (loading || deleteLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error || deleteError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || deleteError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vos Demandes</Text>
      {demands.length === 0 ? (
        <Text style={styles.noDemandsText}>Aucune demande n'a été créée.</Text>
      ) : (
        demands.map((demand) => (
          <View key={demand._id} style={styles.demandItem}>
            <Text style={styles.demandTypeText}>{demand.requestType}</Text>
            <Text style={styles.demandNameText}>{demand.demandName}</Text>
            <Text style={styles.statusText}>
              Statut: {String(demand.status)}
            </Text>
            <Text style={styles.createdAtText}>
              Créé le: {String(demand.createdAt)}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => onViewDetails(demand)}
              >
                <Text style={styles.buttonText}>Voir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => onEditDemand(demand)}
              >
                <Text style={styles.buttonText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(demand._id.toString())}
              >
                <Text style={styles.buttonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 18 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 15,
  },
  noDemandsText: { textAlign: "center", fontSize: 16, color: "#888" },
  demandItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  demandTypeText: { fontSize: 18, fontWeight: "bold" },
  demandNameText: { fontSize: 16, color: "#007AFF", marginVertical: 5 },
  statusText: { fontSize: 16, marginVertical: 5 },
  createdAtText: { fontSize: 14, color: "#777" },
  buttonContainer: { flexDirection: "row", marginTop: 10 },
  viewButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  editButton: {
    backgroundColor: "#FFC107",
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: { backgroundColor: "#FF3B30", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontSize: 14 },
});

export default ViewDemands;
