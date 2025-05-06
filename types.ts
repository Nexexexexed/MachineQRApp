export type RootStackParamList = {
  Home: undefined; // Экран Home не принимает параметров
  QRScanner: undefined; // Экран QRScanner не принимает параметров
  Documents: { machineId: string };
  MachineCard: { machineId: string };
  BreakdownHistory: { machineId: string };
  BreakdownDetails: {
    machineId: string;
    breakdown: {
      date: string;
      description: string;
      status: string;
    };
  };
  AddReport: { machineId: string };
};
