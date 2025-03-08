import { AppContainer } from "@/components/AppContainer";
import { AppValidatorLoader } from "@/components/AppLoader";
import { useGlobalStore } from "@/stores/global-store";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LoginForm } from "./form";
export const LoginScreen = () => {
  const [form, setForm] = useState({ email: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { themeColor } = useGlobalStore((state) => state);
  const {
    setApplication,
    application,
    resetApplication,
    currentUserLocation,
    setCurrentUser,
  } = useUserStore((state) => state);
  const router = useRouter();

  const onRequestClose = () => {
    setIsModalVisible(false);
  };
  return (
    <AppContainer showBackButton barColor="dark-content">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-[90] mb-[10]">
          <Text
            className="screen-title text-center"
            style={{ color: themeColor.text }}
          >
            Login to your account
          </Text>
        </View>
        <LoginForm />

        <View className="flex-row items-center self-center gap-1 mt-4">
          <Text className="screen-desc text-[#0C263A]">
            Don’t have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/verify-phone")}>
            <Text className="text-[#2563EB] font-sans text-base">Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AppValidatorLoader
        isModalVisible={isModalVisible}
        onRequestClose={onRequestClose}
      />
    </AppContainer>
  );
};
