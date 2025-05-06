import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import machineData from "../machine";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "BreakdownHistory"
>;
type RouteProp = import("@react-navigation/native").RouteProp<
  RootStackParamList,
  "BreakdownHistory"
>;

const BreakdownHistoryScreen: React.FC = () => {
  const route = useRoute<RouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { machineId } = route.params;

  const [status, setStatus] = useState("");
  const [breakdowns, setBreakdowns] = useState<
    { date: string; description: string; status: string }[]
  >([]);

  useEffect(() => {
    const machine = machineData.find((m) => m.id === machineId);
    if (machine?.breakdown_history) {
      setBreakdowns(machine.breakdown_history);
      setStatus(machine.current_status);
    }
  }, [machineId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>История поломок машины №{machineId}</Text>
      <Text style={status === "Работает" ? styles.work : styles.notwork}>
        {status}
      </Text>
      {breakdowns.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() =>
            navigation.navigate("BreakdownDetails", {
              machineId,
              breakdown: item,
            })
          }
        >
          <Text style={styles.date}>{item.date}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("AddReport", { machineId: machineId })
        }
      >
        <Text style={styles.buttonText}>Добавить отчет</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  date: { fontSize: 18, color: "blue" },
  work: {
    fontSize: 20,
    backgroundColor: "green",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginStart: 50,
    marginEnd: 50,
    marginBottom: 25,
    textAlign: "center",
  },
  notwork: {
    fontSize: 20,
    backgroundColor: "red",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginStart: 50,
    marginEnd: 50,
    marginBottom: 25,
    textAlign: "center",
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

export default BreakdownHistoryScreen;
