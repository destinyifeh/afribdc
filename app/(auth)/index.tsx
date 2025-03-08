import { AppContainer } from "@/components/AppContainer";
import { AppButton, AppButtonLight } from "@/components/Button";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const landingBg = require("../../assets/images/couple_bg.jpg");
export default function LandingScreen() {
  const router = useRouter();

  return (
    // <ProtectedRoute>
    <AppContainer
      barColor="light-content"
      barTranslucent
      barBackground="transparent"
      showBackButton={false}
      allowContentContainer={true}
    >
      <View className="flex-1 justify-center">
        <View className="self-center">
          <Image
            source={require("../../assets/images/world.png")}
            resizeMode="contain"
          />
        </View>

        <View className="w-[300px] self-center my-7">
          <Text className="text-center font-sans text-[#0C263A] font-bold text-base">
            Exchange currencies with ease and confidence, anytime, anywhere.
          </Text>
        </View>
        <AppButtonLight
          title="View Best Rate Now"
          onPress={() => router.push("/rates")}
        />
        <AppButton
          title="Get started"
          onPress={() => router.push("/verify-phone")}
        />

        <View className="flex-row items-center ml-[80] gap-2 mt-3">
          <Text className="text-black text-base font-sans">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text className="text-[#2563EB] text-base font-sans">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppContainer>
    // </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "grey",
  },
  button: {
    width: 27,
    height: 27,
    backgroundColor: "red",
    borderWidth: 0.5,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    marginBottom: 15,
  },
});
