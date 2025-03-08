import { AppContainer } from "@/components/AppContainer";
import { COLOUR_Dark_WHITE } from "@/constants/Styles";
import { useGlobalStore } from "@/stores/global-store";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";

export const ProfileScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState("");
  const [isMainPhotoModalVisible, setIsMainPhotoModalVisible] = useState(false);
  const [fileObject, setFileObject] = useState<object>({});
  const [selectedImage, setSelectedImage] = useState<string>("");
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [imageType, setImageType] = useState<string>("");
  const { themeColor } = useGlobalStore((state) => state);

  return (
    <AppContainer
      showBackButton
      showScreenTitle
      title="Cards"
      appBackgroundColor={COLOUR_Dark_WHITE}
      barBackground={COLOUR_Dark_WHITE}
    >
      <View />
      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text className="text-lg text-[#004BEC]">Go to login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text className="text-lg text-[#004BEC]">Go to landig</Text>
      </TouchableOpacity>
      <View />
    </AppContainer>
  );
};
