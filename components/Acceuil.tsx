import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons

const Acceuil = ({ navigation }: { navigation: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Services and their names for the menu
  const services = [
    { name: "Gestion des démarches administratives", key: "admin" },
    { name: "Coordination médicale et bien-être", key: "health" },
    { name: "Insertion professionnelle et sociale", key: "career" },
    { name: "Sécurité et gestion des urgences", key: "emergency" },
    { name: "Communication et soutien social", key: "social" },
    { name: "Éducation et sensibilisation", key: "education" },
  ];

  const handleServiceClick = (service: string) => {
    setSelectedService(service); // Set the selected service
    setIsMenuOpen(false); // Close the menu
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
  };

  const handleLogout = () => {
    // Handle logout functionality here
    console.log("Logged out");
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Ionicons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Acceuil</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Text style={styles.greetingText}>Hello User</Text>
        <View style={styles.profileContent}>
          <Text style={styles.profileContentText}>
            Welcome to the platform! Select a service from the menu.
          </Text>
        </View>
      </View>

      {/* Service Display */}
      {selectedService && (
        <View style={styles.serviceContainer}>
          <Text style={styles.serviceTitle}>{selectedService}</Text>
          <Text style={styles.serviceDescription}>
            Details about {selectedService} will be displayed here.
          </Text>
        </View>
      )}

      {/* Bottom Bar with Icons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="home-outline" size={30} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person-circle-outline" size={30} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Side Menu Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuOpen}
        onRequestClose={toggleMenu}
      >
        <View style={styles.menuOverlay}>
          <View style={styles.menu}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
              <Ionicons name="close" size={30} color="#333" />
            </TouchableOpacity>

            {/* Home Link */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.menuItemText}>Home</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Service Links */}
            {services.map((service) => (
              <TouchableOpacity
                key={service.key}
                style={styles.menuItem}
                onPress={() => handleServiceClick(service.name)}
              >
                <Text style={styles.menuItemText}>{service.name}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.menuDivider} />

            {/* Logout Link */}
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Text style={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <Pressable style={styles.overlay} onPress={toggleMenu} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#007AFF",
  },
  menuButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center", // Center the title
    flex: 1, // Take up remaining space
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 15,
  },
  profileContent: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  profileContentText: {
    fontSize: 16,
    color: "#333",
  },
  serviceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  serviceDescription: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  helpText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  menuOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: "70%", // Menu pops from the left
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 18,
    color: "#333",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Acceuil;
