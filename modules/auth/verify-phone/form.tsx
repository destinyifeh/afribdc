import { AppButton } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { apiHookRequester } from "@/services/api/hooks";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CountryFlag from "react-native-country-flag";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";
type formData = {
  phone: string;
};

type selectedPropTypes = {
  code: string;
  zip: string;
  name: string;
};

const forgotDataSchema = z.object({
  phone: z.string().min(11, { message: "Minimum 10 digits required" }),
});
export const LoginForm = ({
  isDropDown,
  closeDropDown,
  openDropDown,
  onDropDownPress,
}: {
  isDropDown: boolean;
  closeDropDown: () => void;
  openDropDown: () => void;
  onDropDownPress: () => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<any>("");
  const { mutate } = apiHookRequester.usePostData(
    "/api/v1/user/forgot-password"
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedCountry({
      name: "Australia",
      code: "AU",
      zip: "+2",
    });
  }, []);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<formData>({
    resolver: zodResolver(forgotDataSchema),
    mode: "onChange",
  });

  const onSubmitForgotData = (data: formData) => {
    console.log(data, "dataa");
    const payload = {
      ...data,
    };
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace({
        pathname: "/verify-number",
        params: { phone: data.phone, zip: selectedCountry.zip },
      });
    }, 3000);
    // mutate(payload, {
    //   onSuccess(data: any, variables, context) {
    //     console.log(data, "data isSuccess");
    //     const { message } = data.data;
    //     reset();
    //     ToastAndroid.show(message, ToastAndroid.LONG);
    //     router.replace({
    //       pathname: "/verify-email",
    //       params: { email: payload.phone, previousRoute: "forgotRoute" },
    //     });
    //   },
    //   onError(error: any, variables, context) {
    //     console.log(error, "forgot err...");
    //     const { message } = error.data || {};
    //     setError("phone", {
    //       type: "server",
    //       message: message,
    //     });
    //   },
    //   onSettled(data, error, variables, context) {
    //     setIsLoading(false);
    //     console.log(data, "final data");
    //   },
    // });
  };

  const countries = [
    {
      name: "United State",
      code: "US",
      zip: "+3",
    },
    {
      name: "Canada",
      code: "Ca",
      zip: "+1",
    },
    {
      name: "Nigeria",
      code: "NG",
      zip: "+2",
    },
    {
      name: "Australia",
      code: "AU",
      zip: "+2",
    },
  ];

  const onSelect = (selected: object) => {
    console.log(selected, "selecyed");
    setSelectedCountry(selected);
    closeDropDown();
  };
  return (
    <View className="mb-20">
      <View className="flex-row items-center gap-2 w-[100%] mb-8">
        <View className="h-[40.7px] border border-gray-300 rounded-lg px-3 w-[20%]">
          <TouchableOpacity
            className="flex-row items-center gap-2 justify-center my-auto"
            onPress={onDropDownPress}
          >
            <CountryFlag
              isoCode={selectedCountry?.code ? selectedCountry.code : ""}
              size={10}
            />
            <Text className="text-sm font-sans text-[#6B777F]">
              {selectedCountry.zip}
            </Text>
            <Ionicons
              name={!isDropDown ? "chevron-down-sharp" : "chevron-up-sharp"}
              size={15}
              color="#6B777F"
            />
          </TouchableOpacity>
        </View>
        <View className="w-[78%]">
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                keyboardType="phone-pad"
                error={errors.phone?.message}
                value={value}
                onChangeText={onChange}
                disabled={isLoading}
              />
            )}
          />
        </View>
      </View>
      {isDropDown && (
        <ScrollView
          style={{ position: "absolute", top: 50, width: "98%", zIndex: 2 }}
          // className="min-h-[40.7px] border border-gray-300 rounded-lg px-3 w-[20%]  z-10 bg-white"
          contentContainerClassName="min-h-[40.7px] border border-gray-300 rounded-lg px-3 w-[20%]  z-10 bg-white"
        >
          {countries.map((country) => {
            return (
              <TouchableOpacity
                onPress={() => onSelect(country)}
                className="flex-row items-center gap-2 justify-center my-auto mb-2 mt-2"
                key={country.code}
              >
                <CountryFlag isoCode={country.code} size={10} />
                <Text className="text-sm font-sans text-[#6B777F]">
                  {country.zip}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      <AppButton
        title={isLoading ? "Please wait..." : "Continue"}
        onPress={handleSubmit(onSubmitForgotData)}
        disabled={isLoading || !isValid}
      />
    </View>
  );
};
