import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";

type RouteProp = import("@react-navigation/native").RouteProp<
  RootStackParamList,
  "BreakdownDetails"
>;

const BreakdownDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp>();
  const { breakdown } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Дата: {breakdown.date}</Text>
      <Text style={styles.label}>Описание:</Text>
      <Text style={styles.text}>{breakdown.description}</Text>
      <Text style={styles.label}>Статус:</Text>
      <Text
        style={
          breakdown.status === "ремонт завершён"
            ? styles.text_end
            : styles.text_start
        }
      >
        {breakdown.status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    alignItems: "center",
  },
  title: { fontSize: 25, fontWeight: "bold", marginBottom: 10 },
  label: { fontSize: 20, fontWeight: "600", marginBottom: 15 },
  text: {
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "grey",
    borderRadius: 10,
    paddingBottom: 40,
    paddingTop: 20,
    color: "white",
    marginBottom: 10,
    minWidth: 250,
  },
  text_end: { fontSize: 20, textAlign: "center", color: "green" },
  text_start: { fontSize: 20, textAlign: "center", color: "red" },
});

export default BreakdownDetailsScreen;
