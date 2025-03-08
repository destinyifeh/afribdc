import { AppButton } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { apiHookRequester } from "@/services/api/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { z } from "zod";
type formData = {
  email: string;
};

const forgotDataSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
});
export const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { mutate } = apiHookRequester.usePostData(
    "/api/v1/user/forgot-password"
  );

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
      ToastAndroid.show("OTP sent to your email", ToastAndroid.LONG);
      router.push({
        pathname: "/verify-forgot",
        params: { email: data.email },
      });
    }, 3000);
    // mutate(payload, {
    //   onSuccess(data: any, variables, context) {
    //     console.log(data, 'data isSuccess');
    //     const {message} = data.data;
    //     reset();
    //     ToastAndroid.show(message, ToastAndroid.LONG);
    //     router.replace({
    //       pathname: '/verify-email',
    //       params: {email: payload.email, previousRoute: 'forgotRoute'},
    //     });
    //   },
    //   onError(error: any, variables, context) {
    //     console.log(error, 'forgot err...');
    //     const {message} = error.data || {};
    //     setError('email', {
    //       type: 'server',
    //       message: message,
    //     });
    //   },
    //   onSettled(data, error, variables, context) {
    //     setIsLoading(false);
    //     console.log(data, 'final data');
    //   },
    // });
  };

  return (
    <View>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Required",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={onChange}
            value={value}
            error={errors.email?.message}
            disabled={isLoading}
            isEmail
          />
        )}
      />

      <View className="mt-10">
        <AppButton
          title={isLoading ? "Please wait..." : "Next"}
          onPress={handleSubmit(onSubmitForgotData)}
          disabled={isLoading || !isValid}
        />
      </View>
      <View className="flex-row items-center self-center gap-2 mt-5">
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text className="text-[#0C263A] text-base font-sans">
            Return to login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
