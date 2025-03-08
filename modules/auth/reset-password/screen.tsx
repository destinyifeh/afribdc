import { AppContainer } from "@/components/AppContainer";
import { useGlobalStore } from "@/stores/global-store";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ResetPasswordForm } from "./form";
export const ResetPasswordScreen = () => {
  const [form, setForm] = useState({ email: "" });
  const { themeColor } = useGlobalStore((state) => state);
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
        <View className="my-3">
          <Text className="screen-desc text-[#0C263A] font-bold text-center">
            Enter your new password below
          </Text>
        </View>
        <ResetPasswordForm />
      </ScrollView>
    </AppContainer>
  );
};
