import { AppContainer } from "@/components/AppContainer";
import { useGlobalStore } from "@/stores/global-store";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { LoginForm } from "./form";
export const VerifyPhoneScreen = () => {
  const [form, setForm] = useState({ email: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { themeColor } = useGlobalStore((state) => state);
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
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

  const closeDropDown = () => {
    setIsDropDown(false);
  };

  const openDropDown = () => {
    setIsDropDown(true);
  };
  const onDropDownPress = () => {
    setIsDropDown(!isDropDown);
  };
  return (
    <AppContainer showBackButton barColor="dark-content">
      <TouchableWithoutFeedback onPress={closeDropDown} style={{}}>
        <View className="mt-[30%] flex-1">
          <View className="justify-center">
            <Text
              className="text-[#0C263A] text-2xl font-sans font-bold text-center"
              style={{ color: themeColor.text }}
            >
              Enter Phone number
            </Text>

            <Text className="screen-desc text-[#6B777F] text-center mb-4 mt-2">
              We'll send you a verification code
            </Text>
          </View>
          <LoginForm
            isDropDown={isDropDown}
            closeDropDown={closeDropDown}
            openDropDown={openDropDown}
            onDropDownPress={onDropDownPress}
          />
        </View>
      </TouchableWithoutFeedback>
    </AppContainer>
  );
};
