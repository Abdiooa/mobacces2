import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ApplicationDetailsProps {
  application: {
    jobId: string;
    coverLetter?: string;
    resumeLink?: string;
    status: string;
    appliedAt: string;
    updatedAt: string;
  };
  onBack: () => void;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  application,
  onBack,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de l'application</Text>

      <Text style={styles.detailText}>ID du poste: {application.jobId}</Text>
      <Text style={styles.detailText}>Statut: {application.status}</Text>
      <Text style={styles.detailText}>
        Date de candidature:{" "}
        {new Date(application.appliedAt).toLocaleDateString()}
      </Text>
      <Text style={styles.detailText}>
        Dernière mise à jour:{" "}
        {new Date(application.updatedAt).toLocaleDateString()}
      </Text>

      {application.coverLetter && (
        <Text style={styles.detailText}>
          Lettre de motivation: {application.coverLetter}
        </Text>
      )}
      {application.resumeLink ? (
        <Text style={styles.detailText}>
          CV: <Text style={styles.linkText}>Voir le CV</Text>
        </Text>
      ) : (
        <Text style={styles.detailText}>Aucun CV téléchargé.</Text>
      )}

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
    textAlign: "center",
  },
  detailText: {
    fontSize: 18,
    marginBottom: 12,
    color: "#333",
  },
  linkText: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  backButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ApplicationDetails;
