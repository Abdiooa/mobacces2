import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import backgroundImage from "../assets/images/page-ac.jpeg";
import { RootStackParamList } from "@/constant/types";

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomePage = () => {
  const navigation = useNavigation<HomePageNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.imbac}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.boldItalicText}>
            Un monde numérique sans barrières
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("LoginId")}
            >
              <Text style={styles.buttonText}>Avec Mobile ID</Text>
            </TouchableOpacity>
            <Text style={styles.middleText}>Ou</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("ALogin")}
            >
              <Text style={styles.buttonText}>SANS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", height: "100%" },
  imbac: { flex: 1, width: "100%", height: "100%" },
  contentContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  boldItalicText: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#000",
    marginBottom: 50,
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    paddingHorizontal: 50,
    minWidth: 270,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  middleText: { fontSize: 18, fontWeight: "500", marginVertical: 10 },
});
