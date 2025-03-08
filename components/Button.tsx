import { FC } from "react";
import { Text, TouchableOpacity } from "react-native";

type AppButtonProps = {
  onPress?: () => void;
  title: string;
  disabled?: boolean;
  isLoading?: boolean;
};

export const AppButton: FC<AppButtonProps> = ({
  onPress,
  title,
  isLoading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      onPress={onPress}
      className={`${
        disabled ? "bg-app-ghost" : "bg-app-default"
      }  h-[40.7px] rounded-3xl w-full justify-center my-1`}
    >
      <Text
        className={`${
          disabled ? "text-gray-400" : "text-app-light "
        } text-center text-lg font-bold font-sans`}
      >
        {isLoading ? "Please wait..." : title}
      </Text>
    </TouchableOpacity>
  );
};

export const AppButtonLight: FC<AppButtonProps> = ({
  onPress,
  title,
  isLoading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      onPress={onPress}
      className={`${
        disabled ? "bg-app-ghost" : "bg-app-light"
      }  h-[40.7px] rounded-3xl w-full justify-center my-5 border-[0.5px] border-[#0C263A]`}
    >
      <Text
        className={`${
          disabled ? "text-gray-400" : "text-[#0C263A] "
        } text-center text-lg font-bold font-sans`}
      >
        {isLoading ? "Please wait..." : title}
      </Text>
    </TouchableOpacity>
  );
};
