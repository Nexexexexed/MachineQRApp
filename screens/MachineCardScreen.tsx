import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import machineData from "../machine";
import { RootStackParamList } from "../types";

type MachineCardScreenRouteProp = RouteProp<
  { MachineCard: { machineId: string } },
  "MachineCard"
>;

type MachineCardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MachineCard"
>;

const MachineCardScreen: React.FC = () => {
  const route = useRoute<MachineCardScreenRouteProp>();
  const navigation = useNavigation<MachineCardScreenNavigationProp>();

  const { machineId } = route.params;
  const [machineDetails, setMachineDetails] = useState<any>(null);

  useEffect(() => {
    const machine = machineData.find((item) => item.id === machineId);
    if (machine) {
      setMachineDetails(machine);
    } else {
      console.error("Machine not found");
    }
  }, [machineId]);

  if (!machineDetails) {
    return <Text>Загрузка...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Машина № {machineDetails.id}</Text>
      <Text style={styles.header}>Наименование: {machineDetails.name}</Text>
      <Text style={styles.text}>Тип: {machineDetails.type}</Text>
      <Text style={styles.text}>
        Максимальная нагрузка: {machineDetails.max_load}
      </Text>
      <Text style={styles.text}>
        Используется с : {machineDetails.commissioning_date}
      </Text>
      <Text style={styles.text}>Мощность: {machineDetails.power}</Text>
      <Text style={styles.text}>Размеры:</Text>
      <Text style={styles.block}>Д-{machineDetails.dimensions.length}</Text>
      <Text style={styles.block}>
        Ш-
        {machineDetails.dimensions.width}
      </Text>
      <Text style={styles.block_last}>
        В-{machineDetails.dimensions.height}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BreakdownHistory", { machineId })}
      >
        <Text style={styles.buttonText}>Подробнее об истории поломок</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Documents", { machineId })}
      >
        <Text style={styles.buttonText}>Посмотреть Документы</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  block: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  block_last: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 100,
  },
  text: {
    fontSize: 20,
    padding: 10,
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

export default MachineCardScreen;
