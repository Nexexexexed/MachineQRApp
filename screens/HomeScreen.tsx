import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack"; // Импортируем тип для навигации
import { RootStackParamList } from "../types"; // Импортируем типы маршрутов

// Типизируем хук навигации
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>(); // Типизируем хук

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Добро пожаловать в систему QR-Сканирования технологических машин
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("QRScanner")}
      >
        <Text style={styles.buttonText}>Приступить к работе</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
