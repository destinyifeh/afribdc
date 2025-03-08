import { AppContainer } from "@/components/AppContainer";
import { useGlobalStore } from "@/stores/global-store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { VerifyEmailForm } from "./form";

export const VerifyEmailScreen = () => {
  const [form, setForm] = useState({ email: "" });
  const { themeColor } = useGlobalStore((state) => state);
  const router = useRouter();
  const { email } = useLocalSearchParams();

  return (
    <AppContainer
      showBackButton
      barColor="dark-content"
      title="Verify Email"
      showScreenTitle
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-3">
          <Text
            className="screen-title text-lg text-center mt-10"
            style={{ color: themeColor.text }}
          >
            Please verify your email address
          </Text>
          <View className="w-[293px] self-center mt-10">
            <Text className="screen-desc text-center">
              We have sent a 6-digit verification code to {email}. Enter this
              code below
            </Text>
          </View>
        </View>
        <VerifyEmailForm />
      </ScrollView>
    </AppContainer>
  );
};
