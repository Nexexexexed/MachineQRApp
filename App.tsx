import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import MachineCardScreen from "./screens/MachineCardScreen";
import QRScannerScreen from "./screens/QRScannerScreen";
import Documents from "./screens/Documents";
import BreakdownHistory from "./screens/BreakdownHistoryScreen";
import AddReportScreen from "./screens/AddReportScreen";

import { RootStackParamList } from "./types";
import BreakdownDetailsScreen from "./screens/BreakdownDetailscreen";

import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    const copyAssets = async () => {
      const machineId = "1";
      const files = [require("./assets/documents/1/file1.pdf")];

      for (const file of files) {
        const asset = Asset.fromModule(file);
        await asset.downloadAsync();

        const destDir = `${FileSystem.documentDirectory}documents/${machineId}/`;
        const destPath = destDir + asset.name;

        try {
          await FileSystem.makeDirectoryAsync(destDir, { intermediates: true });
        } catch (e) {}

        if (asset.localUri) {
          await FileSystem.copyAsync({
            from: asset.localUri,
            to: destPath,
          });
        }
      }
    };

    copyAssets();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} />
        <Stack.Screen name="MachineCard" component={MachineCardScreen} />
        <Stack.Screen name="Documents" component={Documents} />
        <Stack.Screen name="BreakdownHistory" component={BreakdownHistory} />
        <Stack.Screen
          name="BreakdownDetails"
          component={BreakdownDetailsScreen}
        />
        <Stack.Screen name="AddReport" component={AddReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
