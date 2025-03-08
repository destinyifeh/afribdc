import { AppContainer } from "@/components/AppContainer";
import { useGlobalStore } from "@/stores/global-store";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SignupForm } from "./form";
export const SignupScreen = () => {
  const [form, setForm] = useState({ email: "" });
  const { themeColor } = useGlobalStore((state) => state);
  return (
    <AppContainer showBackButton barColor="dark-content">
      <ScrollView
        style={{ marginTop: 80 }}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="">
          <Text
            className="screen-title text-center"
            style={{ color: themeColor.text }}
          >
            Create your account
          </Text>
        </View>
        <SignupForm />
      </ScrollView>
    </AppContainer>
  );
};
