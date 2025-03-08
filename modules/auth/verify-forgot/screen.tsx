import { AppContainer } from "@/components/AppContainer";
import { useGlobalStore } from "@/stores/global-store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { VerifyEmailForm } from "./form";

export const VerifyForgotScreen = () => {
  const [form, setForm] = useState({ email: "" });
  const { themeColor } = useGlobalStore((state) => state);
  const router = useRouter();
  const { email } = useLocalSearchParams();

  return (
    <AppContainer
      showBackButton
      barColor="dark-content"
      title="Reset Password"
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
            Enter Code
          </Text>
          <View className="w-[293px] self-center mt-5">
            <Text className="screen-desc text-center text-[#0C263A]">
              We have sent an OTP verification code to {email}
            </Text>
          </View>
        </View>
        <VerifyEmailForm />
      </ScrollView>
    </AppContainer>
  );
};
