import { AppContainer } from "@/components/AppContainer";
import { COLOUR_Dark_WHITE } from "@/constants/Styles";
//import AppList from '@/constants/AppPackages';
import { useRef, useState } from "react";
import { TextInput, View } from "react-native";
interface ItemType {
  [key: string]: any;
}

export const SearchScreen = () => {
  const ref = useRef<TextInput | null>(null);
  const [query, setQuery] = useState<string>("");

  return (
    <AppContainer
      showBackButton
      showScreenTitle
      title="Wallet"
      appBackgroundColor={COLOUR_Dark_WHITE}
      barBackground={COLOUR_Dark_WHITE}
    >
      <View></View>
    </AppContainer>
  );
};
