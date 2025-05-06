import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Linking,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as IntentLauncher from "expo-intent-launcher";

import mime from "mime";

type RouteProps = RouteProp<RootStackParamList, "Documents">;

const Documents: React.FC = () => {
  const { machineId } = useRoute<RouteProps>().params;
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const copyAndListFiles = async () => {
      let assetFiles: number[] = [];
      if (machineId === "1") {
        assetFiles = [require(`../assets/documents/1/file1.pdf`)];
      } else if (machineId === "2") {
        assetFiles = [require(`../assets/documents/2/16K30.pdf`)];
      } else if (machineId === "3") {
        assetFiles = [require(`../assets/documents/3/6R13.pdf`)];
      } else if (machineId === "4") {
        assetFiles = [require(`../assets/documents/4/Haas VF-12XT.pdf`)];
      } else if (machineId === "5") {
        assetFiles = [
          require(`../assets/documents/5/DMG MORI CTX gamma 1000.pdf`),
        ];
      }

      const targetDir = `${FileSystem.documentDirectory}documents/${machineId}/`;
      await FileSystem.makeDirectoryAsync(targetDir, { intermediates: true });

      const copiedFiles: string[] = [];

      for (let i = 0; i < assetFiles.length; i++) {
        const asset = Asset.fromModule(assetFiles[i]);
        await asset.downloadAsync();

        const destPath = `${targetDir}${asset.name}`;
        await FileSystem.copyAsync({ from: asset.localUri!, to: destPath });
        copiedFiles.push(destPath);
      }

      setFiles(copiedFiles);
    };

    copyAndListFiles();
  }, [machineId]);

  const handleOpen = async (uri: string) => {
    try {
      const contentUri = await FileSystem.getContentUriAsync(uri);
      const mimeType = mime.getType(uri) || "application/pdf";

      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: contentUri,
        flags: 1,
        type: mimeType,
      });
    } catch (error) {
      console.error("Ошибка при открытии файла:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Документы для машины №{machineId}</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.split("/").pop()}</Text>
            <Button title="Открыть PDF" onPress={() => handleOpen(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  item: { marginBottom: 15, borderColor: "#ccc", borderWidth: 2, padding: 20 },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default Documents;
