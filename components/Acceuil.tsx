import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons
import {
  Menu,
  MenuProvider,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu"; // Import MenuProvider and other components
import AdminService from "./AdminService"; // Import the AdminService component

const Acceuil = ({ navigation }: { navigation: any }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuTranslateX = useState(new Animated.Value(-250))[0]; // For sliding the menu

  // Services and their keys
  const services = [
    { name: "Gestion des démarches administratives", key: "admin" },
    { name: "Coordination médicale et bien-être", key: "health" },
    { name: "Insertion professionnelle et sociale", key: "career" },
    { name: "Sécurité et gestion des urgences", key: "emergency" },
    { name: "Communication et soutien social", key: "social" },
    { name: "Éducation et sensibilisation", key: "education" },
  ];

  // Function to handle service selection
  const handleServiceClick = (serviceKey: string) => {
    setSelectedService(serviceKey); // Update selected service
    closeMenu(); // Close menu after service selection
  };

  // Function to render the content of the selected service
  const renderServiceContent = () => {
    switch (selectedService) {
      case "admin":
        return <AdminService />;
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
            <Text style={styles.greetingText}>Hey, Zahra Ali Batoum</Text>
            <Text style={styles.profileContentText}>
              Welcome to the platform! Select a service from the menu.
            </Text>
          </View>
        );
    }
  };

  const closeMenu = () => {
    // Animate menu sliding out
    Animated.timing(menuTranslateX, {
      toValue: -250,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuVisible(false); // Close menu state
  };

  const openMenu = () => {
    // Animate menu sliding in
    Animated.timing(menuTranslateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuVisible(true); // Open menu state
  };

  return (
    <MenuProvider>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={openMenu}>
            <Ionicons name="menu" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Accesso</Text>
        </View>

        {/* Side Menu */}
        <Animated.View
          style={[
            styles.sideMenu,
            { transform: [{ translateX: menuTranslateX }] },
          ]}
        >
          <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="#007AFF" />
          </TouchableOpacity>

          <View style={styles.menuItems}>
            {/* Home Link */}
            <TouchableOpacity onPress={() => handleServiceClick("home")}>
              <Text style={styles.menuItemText}>Home</Text>
            </TouchableOpacity>
            <View style={styles.hr} />
            {/* Services Links */}
            {services.map((service) => (
              <TouchableOpacity
                key={service.key}
                onPress={() => handleServiceClick(service.key)}
              >
                <Text style={styles.menuItemText}>{service.name}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.hr} />
            {/* Logout Link */}
            <TouchableOpacity onPress={() => console.log("Logout")}>
              <Text style={[styles.menuItemText, styles.logoutText]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

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
    backgroundColor: "#e8e8e8",
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
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#fff",
    paddingTop: 50,
    zIndex: 1,
    elevation: 5, // Elevation for Android
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  menuItems: {
    padding: 20,
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
});

export default Acceuil;
