import "./src/lib/dayjs";

import { StatusBar } from "expo-status-bar";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";

export default function App() {
  const [isFontLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!isFontLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Routes />
      <StatusBar style="inverted" />
    </>
  );
}
