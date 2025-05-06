import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type QRScannerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "QRScanner"
>;

const QRScannerScreen: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation<QRScannerScreenNavigationProp>();

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    navigation.replace("MachineCard", { machineId: data.trim() });
  };

  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text>Запрашиваем разрешение...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text>Нет доступа к камере</Text>
        <Button title="Разрешить доступ" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleBarCodeScanned}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>Наведите камеру на QR-код</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
});

export default QRScannerScreen;
