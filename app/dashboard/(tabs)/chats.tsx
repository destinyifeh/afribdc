import { AppContainer } from "@/components/AppContainer";
import { COLOUR_Dark_WHITE } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function ChatMainScreen() {
  const router = useRouter();

  return (
    <AppContainer
      showBackButton
      showScreenTitle
      title="Orders"
      appBackgroundColor={COLOUR_Dark_WHITE}
      barBackground={COLOUR_Dark_WHITE}
    >
      <View className="flex-1"></View>
    </AppContainer>
  );
}
