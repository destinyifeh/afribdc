import { AppContainer } from "@/components/AppContainer";
import { useGlobalStore } from "@/stores/global-store";
import { useState } from "react";
import { ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { SignupForm } from "./form";
export const PersonalInfoScreen = () => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [isStateDopwn, setIsStateDown] = useState<boolean>(false);
  const [form, setForm] = useState({ email: "" });
  const { themeColor } = useGlobalStore((state) => state);
  const closeDropDown = () => {
    setIsDropDown(false);
    setIsStateDown(false);
  };

  const openDropDown = () => {
    setIsDropDown(true);
  };
  const onDropDownPress = () => {
    setIsDropDown(!isDropDown);
    setIsStateDown(false);
  };

  const onStateDropDownPress = () => {
    setIsStateDown(!isStateDopwn);
    setIsDropDown(false);
  };

  return (
    <AppContainer
      showBackButton
      barColor="dark-content"
      title="Personal Information"
      showScreenTitle
    >
      <TouchableWithoutFeedback onPress={closeDropDown} style={{}}>
        <View className="flex-1 mt-[30]">
          <ScrollView
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <SignupForm
              isDropDown={isDropDown}
              closeDropDown={closeDropDown}
              openDropDown={openDropDown}
              onDropDownPress={onDropDownPress}
              isStateDown={isStateDopwn}
              onStateDropDownPress={onStateDropDownPress}
            />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </AppContainer>
  );
};
