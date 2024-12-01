import React, { useState } from "react";
import useFetchApplicationsByUser from "../hooks/useFetchApplicationsByUser";
import useDeleteApplication from "../hooks/useDeleteApplication";
import useFetchApplicationById from "../hooks/useFetchApplicationById";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const ViewUserApplications: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, loading, error } = useFetchApplicationsByUser(userId);
  const {
    deleteApplication,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteApplication();
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null);

  const handleDelete = async (id: string) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this application?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteApplication(id);
            Alert.alert("Success", "Application deleted successfully.");
          },
        },
      ]
    );
  };

  const handleViewDetails = (id: string) => {
    setSelectedApplicationId(id);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Applications</Text>
      {data && data.length > 0 ? (
        data.map((application) => (
          <View key={application._id} style={styles.applicationCard}>
            <Text style={styles.jobTitle}>Job ID: {application.jobId}</Text>
            <Text style={styles.status}>
              Status: {application.status || "Not specified"}
            </Text>
            <Text style={styles.date}>
              Applied At:{" "}
              {new Date(application.appliedAt || "").toLocaleDateString()}
            </Text>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() => handleViewDetails(application._id)}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(application._id)}
                disabled={deleteLoading}
              >
                <Text style={styles.buttonText}>
                  {deleteLoading ? "Deleting..." : "Delete"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noApplicationsText}>
          No applications found for this user.
        </Text>
      )}

      {selectedApplicationId && (
        <ViewApplicationDetails id={selectedApplicationId} />
      )}
    </View>
  );
};

const ViewApplicationDetails: React.FC<{ id: string }> = ({ id }) => {
  const { data, loading, error } = useFetchApplicationById(id);

  if (loading) return <Text>Loading application details...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsHeader}>Application Details</Text>
      <Text style={styles.detailsText}>Job ID: {data?.jobId}</Text>
      <Text style={styles.detailsText}>
        Cover Letter: {data?.coverLetter || "No cover letter provided."}
      </Text>
      <Text style={styles.detailsText}>
        Resume:{" "}
        {data?.resumeLink ? (
          <Text style={styles.linkText}>View Resume</Text>
        ) : (
          "No resume uploaded."
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  applicationCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  status: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewDetailsButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noApplicationsText: {
    textAlign: "center",
    color: "#555",
  },
  detailsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#007AFF",
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  linkText: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});

export default ViewUserApplications;
