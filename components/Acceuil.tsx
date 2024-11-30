import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons
import {
  Menu,
  MenuProvider,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from "react-native-popup-menu"; // Import MenuProvider and other components
import AdminService from "./AdminService"; // Import the AdminService component

const Acceuil = ({ navigation }: { navigation: any }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // Services and their keys
  const services = [
    // { name: "Home", key: "home" },
    { name: "Gestion des démarches administratives", key: "admin" },
    { name: "Coordination médicale et bien-être", key: "health" },
    { name: "Insertion professionnelle et sociale", key: "career" },
    { name: "Sécurité et gestion des urgences", key: "emergency" },
    { name: "Communication et soutien social", key: "social" },
    { name: "Éducation et sensibilisation", key: "education" },
  ];

  // Function to handle service selection
  const handleServiceClick = (serviceKey: string) => {
    console.log("Selected Service:", serviceKey); // Debug
    setSelectedService(serviceKey); // Update selected service
    setMenuVisible(false); // Close menu after service selection
  };

  // Function to render the content of the selected service
  const renderServiceContent = () => {
    console.log("Rendering content for service:", selectedService); // Debug
    switch (selectedService) {
      case "admin":
        return <AdminService />; // Render AdminService when "admin" is selected
      case "home":
        return (
          <View style={styles.profileContainer}>
            <Text style={styles.greetingText}>Hey, Zahra Ali Batoum</Text>
            <Text style={styles.profileContentText}>
              Welcome to the platform! Select a service from the menu.
            </Text>
          </View>
        );
      default:
        return (
          <View style={styles.profileContainer}>
            <Text style={styles.greetingText}>Hey, Zahra Ali</Text>
            <Text style={styles.profileContentText}>
              Welcome to the platform! Select a service from the menu.
            </Text>
          </View>
        );
    }
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <MenuProvider>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Menu
            opened={menuVisible} // Control menu visibility
            onBackdropPress={closeMenu} // Close menu on backdrop press
          >
            <MenuTrigger onPress={() => setMenuVisible(true)}>
              <Ionicons name="menu" size={30} color="#fff" />
            </MenuTrigger>
            <MenuOptions customStyles={{ optionWrapper: styles.menuOptions }}>
              {/* Close Icon */}
              <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
                <Ionicons name="close" size={30} color="#007AFF" />
              </TouchableOpacity>

              {/* Home Link */}
              <MenuOption onSelect={() => handleServiceClick("home")}>
                <Text style={styles.menuItemText}>Home</Text>
              </MenuOption>
              <View style={styles.hr} />
              {/* Services Links */}
              {services.map((service) => (
                <MenuOption
                  key={service.key}
                  onSelect={() => handleServiceClick(service.key)}
                >
                  <Text style={styles.menuItemText}>{service.name}</Text>
                </MenuOption>
              ))}
              <View style={styles.hr} />
              {/* Logout Link */}
              <MenuOption onSelect={() => console.log("Logout")}>
                <Text style={[styles.menuItemText, styles.logoutText]}>
                  Logout
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
          <Text style={styles.title}>Accesso</Text>
        </View>

        {/* Dynamic Content Area */}
        <View style={styles.contentContainer}>{renderServiceContent()}</View>

        {/* Bottom Bar */}
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
      </View>
    </MenuProvider>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e8e8e8", // Added background color for better contrast
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 15,
  },
  profileContentText: {
    fontSize: 16,
    color: "#333",
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
  menuOptions: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 250,
  },
  menuItemText: {
    fontSize: 18,
    color: "black",
    paddingVertical: 10,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 10,
  },
  logoutText: {
    color: "red",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default Acceuil;
