import { AppContainer } from "@/components/AppContainer";
import { useGlobalStore } from "@/stores/global-store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { VerifyEmailForm } from "./form";

export const VerifyPinScreen = () => {
  const [form, setForm] = useState({ email: "" });
  const { themeColor } = useGlobalStore((state) => state);
  const router = useRouter();
  const { email } = useLocalSearchParams();

  return (
    <AppContainer
      showBackButton
      barColor="dark-content"
      title="Set Your Pin"
      showScreenTitle
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-3">
          {/* <Text
            className="screen-title text-lg text-center mt-10"
            style={{ color: themeColor.text }}
          >
            Please verify your phone number
          </Text> */}
          <View className="w-[341px] self-center my-10">
            <Text className="screen-desc text-center">
              Set up your 4 digit pin to make your account more secure. You’ll
              be asked to enter this pin when making transcations.
            </Text>
          </View>
        </View>
        <VerifyEmailForm />
      </ScrollView>
    </AppContainer>
  );
};
