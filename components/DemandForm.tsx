import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select"; // Import Picker Select

// Define the props interface
interface DemandFormProps {
  onCreateRequest: (newRequest: {
    id: number;
    name: string;
    type: string;
    requiredDocuments: string;
    status: string;
  }) => void;
  onCancel: () => void;
}

const DemandForm: React.FC<DemandFormProps> = ({
  onCreateRequest,
  onCancel,
}) => {
  const [newRequest, setNewRequest] = useState("");
  const [requestType, setRequestType] = useState("");
  const [requiredDocuments, setRequiredDocuments] = useState("");

  const requestTypeOptions = [
    { label: "Financial Aid", value: "financial_aid" },
    { label: "Disability Card Renewal", value: "disability_card_renewal" },
    { label: "Other", value: "other" },
  ];

  const handleCreateRequest = () => {
    if (newRequest.trim() && requiredDocuments.trim() && requestType) {
      const newReq = {
        id: Date.now(), // Generate a unique ID
        name: newRequest,
        type: requestType,
        requiredDocuments,
        status: "Pending",
      };
      onCreateRequest(newReq);
      setNewRequest("");
      setRequestType("");
      setRequiredDocuments("");
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Créer une nouvelle demande</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre demande"
        value={newRequest}
        onChangeText={setNewRequest}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Documents requis (ex: justificatifs)"
        value={requiredDocuments}
        onChangeText={setRequiredDocuments}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateRequest}
      >
        <Text style={styles.createButtonText}>Créer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the picker
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
  },
  inputIOS: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
  },
  createButton: {
    padding: 15,
    backgroundColor: "#007AFF",
    marginTop: 20,
    borderRadius: 5,
  },
  createButtonText: {
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
});

export default DemandForm;
