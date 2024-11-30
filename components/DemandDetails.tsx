import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface DemandDetailsProps {
  demand: {
    demandName: string;
    demandDescription: string;
    requestType: string;
    status: string;
    decision: string;
    createdAt: string;
    updatedAt: string;
  };
  onBack: () => void;
}

const DemandDetails: React.FC<DemandDetailsProps> = ({ demand, onBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la demande</Text>

      <Text style={styles.detailText}>
        Nom de la demande: {demand.demandName}
      </Text>
      <Text style={styles.detailText}>
        Type de demande: {demand.requestType}
      </Text>
      <Text style={styles.detailText}>Statut: {demand.status}</Text>
      <Text style={styles.detailText}>
        Description: {demand.demandDescription}
      </Text>
      <Text style={styles.detailText}>Décision: {demand.decision}</Text>
      <Text style={styles.detailText}>Créée le: {demand.createdAt}</Text>
      <Text style={styles.detailText}>Modifiée le: {demand.updatedAt}</Text>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 15,
  },
  detailText: { fontSize: 18, marginBottom: 10 },
  backButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: { color: "#fff", textAlign: "center" },
});

export default DemandDetails;
