import { AppContainer } from "@/components/AppContainer";
import { useGlobalStore } from "@/stores/global-store";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ForgotPasswordForm } from "./form";
export const ForgotPasswordScreen = () => {
  const [form, setForm] = useState({ email: "" });
  const { themeColor } = useGlobalStore((state) => state);
  return (
    <AppContainer
      showBackButton
      barColor="dark-content"
      title="Reset password"
      showScreenTitle
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-[40] w-[227px] mx-auto mb-[40]">
          <Text className="screen-desc text-center text-[#0C263A]">
            Enter your email address and we’ll send you OTP verification code.
          </Text>
        </View>
        <ForgotPasswordForm />
      </ScrollView>
    </AppContainer>
  );
};
