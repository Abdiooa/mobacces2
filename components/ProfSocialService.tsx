import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import useJobs from "../hooks/useJobs"; // Import the custom hook

const ProfSocialService = () => {
  const { getJobs, jobs, loading, error } = useJobs();

  useEffect(() => {
    getJobs(); // Fetch the jobs when the component mounts
  }, [getJobs]);

  const handleApply = (jobId: string) => {
    // Handle the apply action (e.g., navigate to a detailed page or show confirmation)
    console.log(`Applied for job with ID: ${jobId}`);
  };

  const renderJobItem = ({ item }: { item: any }) => (
    <View style={styles.jobItem}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobCompany}>{item.companyName}</Text>
      <Text style={styles.jobLocation}>{item.location}</Text>
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => handleApply(item._id)}
      >
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Job Opportunities</Text>
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 15,
  },
  jobItem: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  jobCompany: {
    fontSize: 16,
    color: "#555",
  },
  jobLocation: {
    fontSize: 14,
    color: "#777",
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ProfSocialService;
