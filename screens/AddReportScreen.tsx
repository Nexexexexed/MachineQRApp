import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import machineData from "../machine";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "BreakdownHistory"
>;

type RouteParams = {
  machineId: string;
};

const AddReportScreen = () => {
  const [description, setDescription] = useState("");
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { machineId } = route.params as RouteParams;

  const handleSave = async () => {
    if (!description.trim()) {
      Alert.alert("Ошибка", "Пожалуйста, введите описание поломки.");
      return;
    }

    const machine = machineData.find((m) => m.id === machineId);
    if (!machine) {
      Alert.alert("Ошибка", "Машина не найдена.");
      return;
    }

    if (!machine.breakdown_history) machine.breakdown_history = [];

    const currentDate = new Date().toLocaleDateString("en-CA");

    const newBreakdown = {
      date: currentDate,
      description: description,
      status: "ожидает ремонта",
    };

    machine.breakdown_history.push(newBreakdown);
    machine.current_status = "Остановлен";

    try {
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + "machine.json",
        JSON.stringify(machineData, null, 2)
      );
      Alert.alert("Успех", "Поломка добавлена.");
      navigation.navigate("BreakdownHistory", { machineId });
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось сохранить изменения в файл.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Новая поломка</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите описание поломки..."
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Сохранить поломку</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 200,
    borderColor: "#ccc",
    borderWidth: 2,
    marginBottom: 20,
    padding: 5,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#000",
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

export default AddReportScreen;
