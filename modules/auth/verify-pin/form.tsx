import { AppButton } from "@/components/Button";
import { apiHookRequester } from "@/services/api/hooks";
import { useGlobalStore } from "@/stores/global-store";
import { useUserStore } from "@/stores/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { z } from "zod";
type formData = {
  otp: string;
};
interface OTPRefProp {
  clear: () => void;
  focus: () => void;
  setValue: (value: string) => void;
}

const otpDataSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(4, { message: "Pin must be 4 characters long" }),
});
export const VerifyEmailForm = () => {
  const { email, previousRoute } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [countdown, setCountdown] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const otpRef = useRef<OTPRefProp>(null);
  const router = useRouter();
  const { themeColor } = useGlobalStore((state) => state);
  const { setApplication, application, resetApplication } = useUserStore(
    (state) => state
  );

  const verifySignupToken = apiHookRequester.usePostData(
    "/api/v1/user/verify-signup-token"
  );

  const verifyResetPasswordToken = apiHookRequester.usePostData(
    "/api/v1/user/verify-password-token"
  );
  const resendToken = apiHookRequester.usePostData("/api/v1/user/resend-token");

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<formData>({
    resolver: zodResolver(otpDataSchema),
    mode: "onSubmit",
  });
  console.log(email, "emailler", previousRoute);
  const clearOtp = () => {
    if (otpRef.current) {
      otpRef.current?.clear(); // Clear the OTP input field
    }
  };

  const onSubmitOtpData = (data: formData) => {
    console.log(data, "dataa");

    setIsLoading(true);
    const otpPayload = {
      ...data,
      email: email,
    };
    clearErrors("otp");
    setTimeout(() => {
      setIsLoading(false);
      ToastAndroid.show("PIN code setup was successful", ToastAndroid.LONG);
      router.replace({
        pathname: "/dashboard",
        params: { previousRoute: "verify-pin" },
      });
    }, 3000);

    // if (previousRoute === "forgotRoute") {
    //   verifyResetPasswordToken.mutate(otpPayload, {
    //     onSuccess(data, variables, context) {
    //       console.log(data, "data issuccess");
    //       reset(); // Clear the form fields after submission
    //       clearOtp();

    //       router.replace({
    //         pathname: "/reset-password",
    //         params: { email: email, previousRoute: "verifyEmail" },
    //       });
    //     },
    //     onError(error: any, variables, context) {
    //       console.log(error, "erorr ocurred");
    //       const { message } = error.data;
    //       ToastAndroid.show(
    //         message || "Oops! Something went wrong",
    //         ToastAndroid.LONG
    //       );
    //       setError("otp", {
    //         type: "server",
    //         message: message,
    //       });
    //     },
    //     onSettled(data, error, variables, context) {
    //       setIsLoading(false);
    //     },
    //   });
    // } else {
    //   verifySignupToken.mutate(otpPayload, {
    //     onSuccess(data: any, variables, context) {
    //       console.log(data, "data issuccess");
    //       reset(); // Clear the form fields after submission
    //       clearOtp();
    //       const { message } = data.data;
    //       ToastAndroid.show(message, ToastAndroid.LONG);
    //       router.replace({
    //         pathname: "/login",
    //         params: { previousRoute: "isFromFinalSetup" },
    //       });
    //     },
    //     onError(error: any, variables, context) {
    //       console.log(error, "erorr ocurred");
    //       const { message } = error?.data || {};
    //       setError("otp", {
    //         type: "server",
    //         message: message,
    //       });
    //     },
    //     onSettled(data, error, variables, context) {
    //       setIsLoading(false);
    //     },
    //   });
    // }
  };

  const onResendCode = () => {
    const data = {
      email: email,
    };

    setIsResending(true);
    setIsLoading(true);
    clearErrors("otp");
    setSeconds(59);
    setTimeout(() => {
      setIsResending(false);
      setIsLoading(false);
      setCountdown(0);
      ToastAndroid.show("Resent successfully", ToastAndroid.LONG);
    }, 30000);

    // resendToken.mutate(data, {
    //   onSuccess(data: any, variables, context) {
    //     console.log(data, "data");
    //     const { message } = data.data;
    //     ToastAndroid.show(message, ToastAndroid.LONG);
    //   },
    //   onError(error: any, variables, context) {
    //     console.log(error, "error");
    //     const { message } = error.data;
    //     setError("otp", {
    //       type: "server",
    //       message: message,
    //     });
    //   },
    //   onSettled(data, error, variables, context) {
    //     setIsResending(false);
    //     setIsLoading(false);
    //   },
    // });
  };

  return (
    <View className="mt-10">
      <Controller
        control={control}
        name="otp"
        render={({ field: { onChange, onBlur, value } }) => (
          <OtpInput
            numberOfDigits={4}
            focusColor="#0C263A"
            // placeholder="******"
            blurOnFilled={true}
            disabled={isLoading}
            type="numeric"
            secureTextEntry={true}
            onTextChange={onChange}
            onFocus={() => clearErrors("otp")}
            theme={{
              pinCodeContainerStyle: styles.otpBox,
              containerStyle: styles.otpContainer,
              pinCodeTextStyle: {
                color: "#22A37C",
                fontSize: 80,
                textAlign: "center",
                position: "absolute",
              },
            }}
            textInputProps={{
              accessibilityLabel: "One-Time Password",
            }}
            ref={otpRef}
          />
        )}
      />
      {Boolean(errors) && (
        <Text className="text-app-danger text-sm font-sans text-center mt-2">
          {errors.otp?.message}
        </Text>
      )}

      <View className="mt-[4%]">
        <AppButton
          title={isLoading ? "Please wait..." : "Proceed"}
          onPress={handleSubmit(onSubmitOtpData)}
          disabled={isLoading || !isValid}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  otpBox: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  otpContainer: {
    width: "80%",
    alignSelf: "center",
    gap: 5,
  },
});
