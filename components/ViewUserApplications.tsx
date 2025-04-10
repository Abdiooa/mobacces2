import React, { useState } from "react";
import useFetchApplicationsByUser from "../hooks/useFetchApplicationsByUser";
import useDeleteApplication from "../hooks/useDeleteApplication";
import ApplicationDetails from "./ApplicationDetails"; // Import the details component
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const ViewUserApplications: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, loading, error, refetch } = useFetchApplicationsByUser(userId);
  const {
    deleteApplication,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteApplication();
  const [selectedApplication, setSelectedApplication] = useState(null); // Track selected application

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
            if (!deleteError) {
              Alert.alert("Success", "Application deleted successfully.");
              refetch(); // Refetch applications after deletion
            } else {
              Alert.alert("Error", "Failed to delete the application.");
            }
          },
        },
      ]
    );
  };

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application); // Store the selected application details
  };

  const handleBack = () => {
    setSelectedApplication(null); // Reset to show the list of applications
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  // If an application is selected, show its details
  if (selectedApplication) {
    return (
      <ApplicationDetails
        application={selectedApplication}
        onBack={handleBack}
      />
    );
  }

  // Show the list of applications
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
                onPress={() => handleViewDetails(application)} // Pass application data
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
});

export default ViewUserApplications;
