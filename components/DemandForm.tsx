import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select"; // Import Picker Select
import useCreateDemand from "@/hooks/useCreateDemand";

// Define the props interface
interface DemandFormProps {
  onCreateRequest: (newRequest: {
    id: number;
    name: string;
    type: string;
    requiredDocuments: string;
    demandDescription: string;
    status: string;
  }) => void; // The function now expects the newRequest parameter
  onCancel: () => void;
}

const DemandForm: React.FC<DemandFormProps> = ({
  onCreateRequest,
  onCancel,
}) => {
  const [newRequest, setNewRequest] = useState(""); // This stores the demand description
  const [requestType, setRequestType] = useState("");
  const [requiredDocuments, setRequiredDocuments] = useState("");

  const { createDemand, loading, error } = useCreateDemand(); // Use the hook

  const requestTypeOptions = [
    { label: "Financial Aid", value: "financial_aid" },
    { label: "Disability Card Renewal", value: "disability_card_renewal" },
    { label: "Other", value: "other" },
  ];

  const handleCreateRequest = async () => {
    // Make sure all fields are filled
    if (newRequest.trim() && requiredDocuments.trim() && requestType) {
      const userId = "576520"; // Default user ID
      const demandDescription = newRequest; // The demand description from the user input

      try {
        // Call the hook to send the request
        await createDemand({
          userId,
          requestType,
          demandDescription, // Pass the demand description to the hook
          requiredDocuments,
        });

        const request = {
          id: Math.random(), // Simulating a random ID generation
          name: demandDescription,
          type: requestType,
          requiredDocuments,
          demandDescription,
          status: "Pending",
        };

        onCreateRequest(request); // Pass the newly created request to the parent
        setNewRequest(""); // Clear input after success
        setRequestType(""); // Clear selection after success
        setRequiredDocuments(""); // Clear input after success
      } catch (err) {
        console.error("Failed to create request:", err);
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Créer une nouvelle demande</Text>

      {/* Demand Description TextArea */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Entrez votre demande"
        value={newRequest}
        onChangeText={setNewRequest}
        multiline
        numberOfLines={4} // Allow multiple lines
      />

      {/* Request Type Dropdown */}
      <RNPickerSelect
        placeholder={{
          label: "Sélectionner le type de demande",
          value: null,
        }}
        onValueChange={(value) => setRequestType(value)}
        items={requestTypeOptions}
        value={requestType}
        style={pickerSelectStyles}
      />

      {/* Required Documents Input */}
      <TextInput
        style={styles.input}
        placeholder="Documents requis (ex: justificatifs)"
        value={requiredDocuments}
        onChangeText={setRequiredDocuments}
      />

      {/* Create Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateRequest}
        disabled={loading}
      >
        <Text style={styles.createButtonText}>
          {loading ? "Création..." : "Créer la demande"}
        </Text>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top", // Align text to the top of the textarea
  },
  createButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  createButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  cancelButton: {
    padding: 15,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#333",
    textAlign: "center",
    fontSize: 18,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  inputAndroid: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
};

export default DemandForm;
