import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const SecUrg = () => {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to send your emergency details."
        );
        return null;
      }

      const loc = await Location.getCurrentPositionAsync({});
      return {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Unable to fetch location. Please try again or check your settings."
      );
      return null;
    }
  };

  const handleIconClick = async (type: string) => {
    try {
      const loc = await getLocation();
      if (!loc) return;

      const response = await axios.post("http://10.0.2.2:5000/send-sms", {
        type: type,
        location: loc,
      });

      if (response.status === 200) {
        alert(`${type} alert sent successfully!`);
      } else {
        alert("Failed to send alert. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    }
  };

  const emergencies = [
    { type: "Accident", icon: require("../assets/icons/Accident.png") },
    { type: "Fire", icon: require("../assets/icons/Fire.png") },
    { type: "Flood", icon: require("../assets/icons/Flood.png") },
    { type: "Medical", icon: require("../assets/icons/Ill.png") },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {emergencies.map((emergency, index) => (
          <View key={index} style={styles.iconWrapper}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => handleIconClick(emergency.type)}
            >
              <Image source={emergency.icon} style={styles.icon} />
              <Text style={styles.iconText}>{emergency.type}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#d3d3d3",
    padding: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  iconWrapper: {
    width: "48%",
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
    elevation: 3,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  iconText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#333",
  },
});

export default SecUrg;
