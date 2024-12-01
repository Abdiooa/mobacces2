import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import useJobs from "../hooks/useJobs"; // Import the custom hook for fetching jobs
import useCreateApplication from "../hooks/useCreateApplication"; // Import the hook to create applications
import ViewUserApplications from "./ViewUserApplications"; // Import the component to view user applications

const ProfSocialService = () => {
  const { getJobs, jobs, loading, error } = useJobs(); // Fetch jobs from API or mock data
  const {
    createApplication,
    loading: applying,
    error: applyError,
  } = useCreateApplication(); // Handle the application creation
  const [viewMode, setViewMode] = useState<"menu" | "jobs" | "applications">(
    "menu"
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (viewMode === "jobs") {
      getJobs(); // Fetch jobs when navigating to the job list
    }
  }, [viewMode, getJobs]);

  const handleApply = async (jobId: string) => {
    const userId = "567520"; // Placeholder user ID

    try {
      await createApplication({ userId, jobId });
      if (!applyError) {
        Alert.alert("Application Success", "Your application was successful!", [
          { text: "OK", onPress: () => setViewMode("menu") },
        ]);
      }
    } catch (err) {
      Alert.alert(
        "Application Failed",
        "There was an error with your application. Please try again."
      );
    }
  };

  const renderJobItem = ({ item }: { item: any }) => (
    <View style={styles.jobItem}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobCompany}>{item.companyName}</Text>
      <Text style={styles.jobLocation}>{item.location}</Text>
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => handleApply(item._id)}
        disabled={applying} // Disable button while applying
      >
        <Text style={styles.applyButtonText}>
          {applying ? "Applying..." : "Apply"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const handleSearch = () => {
    // Filter jobs based on search query
    const filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchQuery(""); // Clear the search input
    if (filteredJobs.length > 0) {
      Alert.alert("Search", `Found ${filteredJobs.length} job(s)`);
    } else {
      Alert.alert("Search", "No jobs found.");
    }
  };

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
      {viewMode === "menu" && (
        <View style={styles.menuContainer}>
          <Text style={styles.header}>Choose an Option</Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => setViewMode("jobs")}
          >
            <Text style={styles.linkText}>View Job Opportunities</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => setViewMode("applications")}
          >
            <Text style={styles.linkText}>View Your Applications</Text>
          </TouchableOpacity>
        </View>
      )}

      {viewMode === "jobs" && (
        <View>
          <TouchableOpacity
            style={styles.retourButton}
            onPress={() => setViewMode("menu")}
          >
            <Text style={styles.linkText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Job Opportunities</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search job title or keyword"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
          <FlatList
            data={jobs.filter((job) =>
              job.title.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            renderItem={renderJobItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}

      {viewMode === "applications" && <ViewUserApplications userId="567520" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  menuContainer: { marginTop: 20 },
  header: {
    fontSize: 24,
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
  linkText: { color: "#fff", textAlign: "center", fontSize: 18 },
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
  jobTitle: { fontSize: 18, fontWeight: "bold" },
  jobCompany: { fontSize: 16, color: "#555" },
  jobLocation: { fontSize: 14, color: "#777" },
  applyButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  applyButtonText: { color: "#fff", fontWeight: "bold" },
  retourButton: {
    marginTop: 10,
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  searchButtonText: { color: "#fff", fontWeight: "bold" },
  errorText: { color: "red", textAlign: "center" },
});

export default ProfSocialService;
