import { AppButton } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useGlobalStore } from "@/stores/global-store";
import { useUserStore } from "@/stores/user-store";
import { AntDesign } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import moment from "moment";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { z } from "zod";
const signupSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters" }),

  lastname: z
    .string()
    .trim()
    .min(2, { message: "Last name must be at least 2 characters" }),
  // phone: z
  //   .string()
  //   .min(11, { message: "Must be 10 or more characters long" }),
  // address1: z.string({ required_error: "Postal code is required" }),
  // city: z.string({ required_error: "City is required" }),
  // postal: z.string({ required_error: "Postal code is required" }),
  // dob: z.date({ required_error: "Date of birth is required" }),
  // password: z
  //   .string()
  //   .trim()
  //   .min(4, { message: "Password must be 4 or more characters long" })
  //   .regex(/[A-Z]/, {
  //     message: "Password must contain at least one uppercase letter",
  //   })

  //   .regex(/[!@#$%^&*(),.?":{}|<>]/, {
  //     message: "Password must contain at least one special character",
  //   }),
  // .regex(/[0-9]/, {message: 'Password must contain at least one number'}),
  // email: z.string().trim().email({ message: "Invalid email address" }),
  //confirmPassword: z.string().trim(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords must match",
//   path: ["confirmPassword"], // This sets the error message on the `confirmPassword` field
// });

type formValue = {
  firstname: string;
  lastname: string;
  state: string;
  country: string;
  dob: Date;
  address1: string;
  address2: string;
  postal: string;
  city: string;
};

type signupFormData = z.infer<typeof signupSchema>;

export const SignupForm = ({
  isDropDown,
  closeDropDown,
  openDropDown,
  onDropDownPress,
  isStateDown,
  onStateDropDownPress,
}: {
  isDropDown: boolean;
  isStateDown: boolean;
  closeDropDown: () => void;
  openDropDown: () => void;
  onDropDownPress: () => void;
  onStateDropDownPress: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [isFormattedDate, setIsFormattedDate] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isFocusDateField, setIsFocusDateField] = useState(false);
  const [isFocusCountryField, setIsFocusCountryField] = useState(false);
  const [isFocusStateField, setIsFocusStateField] = useState(false);
  const router = useRouter();
  const [selectedState, setSelectedState] = useState<any>("");
  const [selectedCountry, setSelectedCountry] = useState<any>("");
  const { setApplication, application, resetApplication } = useUserStore(
    (state) => state
  );
  const { themeColor } = useGlobalStore((state) => state);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm<formValue>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const resetFormError = () => {
    clearErrors(["firstname", "lastname"]);
  };

  const onSubmitSignupData = (data: signupFormData) => {
    console.log(data, "ss data");

    setIsLoading(true);
    resetFormError();
    const saveToDraft = {
      ...application,
      ...data,
    };

    //resetApplication();
    // setApplication(saveToDraft);
    setTimeout(() => {
      // ToastAndroid.show("OTP sent to your email", ToastAndroid.LONG);
      setIsLoading(false);
      reset(); // Clear the form fields after submission
      router.replace({
        pathname: "/verify-pin",
        params: { previousRoute: "personal-info" },
      });
    }, 1000);
  };

  const today = new Date();
  const maxDate = new Date(today.setFullYear(today.getFullYear() - 18));

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
      name: "Germany",
      code: "DE",
      zip: "+2",
    },
    {
      name: "Australia",
      code: "AU",
      zip: "+2",
    },
    {
      name: "Algeria",
      code: "DZ",
      zip: "+2",
    },
    {
      name: "South Africa",
      code: "SA",
      zip: "3",
    },
    {
      name: "Egypt",
      code: "EG",
      zip: "+2",
    },
  ];

  const states = [
    {
      name: "State",
      code: "lag",
      zip: "+3",
    },
    {
      name: "State ",
      code: "ed",
      zip: "+1",
    },
    {
      name: "State",
      code: "NG",
      zip: "+2",
    },
    {
      name: "State",
      code: "DE",
      zip: "+2",
    },

    {
      name: "State",
      code: "SA",
      zip: "3",
    },
    {
      name: "State",
      code: "EG",
      zip: "+2",
    },
  ];

  const onSelect = (selected: object) => {
    console.log(selected, "selecyed");
    setSelectedCountry(selected);
    closeDropDown();
  };

  const onSelectstate = (selected: object) => {
    console.log(selected, "selecyed");
    setSelectedState(selected);
    closeDropDown();
  };
  return (
    <View>
      <Controller
        name="firstname"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="First Name *"
            placeholder="first name"
            error={errors.firstname?.message}
            value={value}
            onChangeText={onChange}
            disabled={isLoading}
          />
        )}
      />
      <Controller
        name="lastname"
        control={control}
        //   rules={{required: 'Password is required'}}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Last Name *"
            placeholder="Last name"
            //  onChangeText={username => setValue('username', username)}
            error={errors.lastname?.message}
            //{...register('username')}
            value={value}
            onChangeText={onChange}
            disabled={isLoading}
          />
        )}
      />
      <View className="mt-2">
        <Text
          className="font-sans text-[#0C263A] mb-1 text-base"
          style={{ color: themeColor.text }}
        >
          Date of Birth
        </Text>

        <TouchableOpacity
          disabled={isLoading}
          onPressIn={() => setIsFocusDateField(true)}
          onPress={() => setShowDatePicker(true)}
          className={`${
            isFocusDateField ? "border-app-default" : "border-gray-300"
          } border h-[40.7] rounded-lg flex-row items-center justify-between px-3 w-full`}
        >
          <View className="flex-row items-center gap-3">
            {!isFormattedDate && (
              <AntDesign
                name="calendar"
                size={12.5}
                color="gray"
                className="ml-2"
              />
            )}
            <Text
              className={`${
                isFormattedDate ? "text-[#6B777F]" : " text-[#6B777F]"
              } font-sans text-[14px]`}
            >
              {isFormattedDate || "dd/mm/yyyy"}
            </Text>
          </View>
        </TouchableOpacity>

        {showDatePicker && (
          <Controller
            control={control}
            name="dob"
            //defaultValue={date}
            render={({ field: { onChange, onBlur, value } }) => (
              <RNDateTimePicker
                value={date}
                mode="date"
                minimumDate={new Date(1950, 0, 1)}
                maximumDate={maxDate}
                style={{ backgroundColor: "red" }}
                accentColor="red"
                onChange={(event, selectedDate) => {
                  console.log(selectedDate, "seleeeel");
                  console.log(event, "seleeeel22");
                  setShowDatePicker(false); // Close the picker
                  setIsFocusDateField(false);

                  if (event.type === "dismissed") {
                    console.log("dismissed");
                    return;
                  }
                  if (selectedDate) {
                    const formattedDate =
                      moment(selectedDate).format("DD-MM-YYYY");
                    setDate(selectedDate);
                    setIsFormattedDate(formattedDate); // Update local date state
                    onChange(selectedDate); // Pass the selected date to react-hook-form
                  }
                }}
              />
            )}
          />
        )}

        {Boolean(errors.dob?.message) && (
          <Text className="text-app-danger text-sm font-sans text-center mt-2">
            {errors.dob?.message}
          </Text>
        )}
      </View>

      <View className="mt-2">
        <Text
          className="font-sans text-[#0C263A] mb-1 text-base"
          style={{ color: themeColor.text }}
        >
          Country of Residence
        </Text>

        <TouchableOpacity
          disabled={isLoading}
          onPressIn={() => setIsFocusCountryField(true)}
          onPress={onDropDownPress}
          className={`${
            isFocusCountryField ? "border-app-default" : "border-gray-300"
          } border h-[40.7] rounded-lg flex-row items-center justify-between px-3 w-full`}
        >
          <View className="flex-row items-center gap-3">
            <Text
              className={`${
                selectedCountry.name ? "text-[#6B777F]" : " text-[#6B777F]"
              } font-sans text-[14px]`}
            >
              {selectedCountry.name || "Select"}
            </Text>
          </View>
          <AntDesign
            name={isDropDown ? "caretup" : "caretdown"}
            size={14}
            color="#6B777F"
          />
        </TouchableOpacity>

        {isDropDown && (
          <View
            style={{
              position: "absolute",
              top: 50,
              zIndex: 2,
              height: 250,
            }}
            className="border border-gray-300 rounded-lg px-3 w-[45%] my-5 z-10 bg-white"
          >
            <ScrollView
              // className="min-h-[40.7px] border border-gray-300 rounded-lg px-3 w-[20%]  z-10 bg-white"
              contentContainerClassName="py-4"
              showsVerticalScrollIndicator={false}
            >
              {countries.map((country) => {
                return (
                  <TouchableOpacity
                    onPress={() => onSelect(country)}
                    className="flex-row gap-4 my-auto mb-2 py-2 ml-3"
                    key={country.code}
                  >
                    <CountryFlag isoCode={country.code} size={10} />
                    <Text className="text-sm font-sans text-[#6B777F]">
                      {country.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {Boolean(errors.country?.message) && (
          <Text className="text-app-danger text-sm font-sans text-center mt-2">
            {errors.dob?.message}
          </Text>
        )}
      </View>

      <View className="mt-2 mb-1">
        <Text
          className="font-sans text-[#0C263A] mb-1 text-base"
          style={{ color: themeColor.text }}
        >
          State/Territory
        </Text>

        <TouchableOpacity
          disabled={isLoading}
          onPressIn={() => setIsFocusStateField(true)}
          onPress={onStateDropDownPress}
          className={`${
            isFocusStateField ? "border-app-default" : "border-gray-300"
          } border h-[40.7] rounded-lg flex-row items-center justify-between px-3 w-full`}
        >
          <View className="flex-row items-center gap-3">
            <Text
              className={`${
                isFormattedDate ? "text-[#6B777F]" : " text-[#6B777F]"
              } font-sans text-[14px]`}
            >
              {selectedState.name || "State/territory"}
            </Text>
          </View>
          <AntDesign
            name={isStateDown ? "caretup" : "caretdown"}
            size={14}
            color="#6B777F"
          />
        </TouchableOpacity>

        {isStateDown && (
          <View
            style={{
              position: "absolute",
              top: 50,
              zIndex: 2,
              height: 250,
            }}
            className="border border-gray-300 rounded-lg px-3 w-[45%] my-5 z-10 bg-white"
          >
            <ScrollView
              // className="min-h-[40.7px] border border-gray-300 rounded-lg px-3 w-[20%]  z-10 bg-white"
              contentContainerClassName="py-4"
              showsVerticalScrollIndicator={false}
            >
              {states.map((state) => {
                return (
                  <TouchableOpacity
                    onPress={() => onSelectstate(state)}
                    className="flex-row gap-4 my-auto mb-2 py-2 ml-3"
                    key={state.code}
                  >
                    <Text className="text-sm font-sans text-[#6B777F]">
                      {state.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {Boolean(errors.state?.message) && (
          <Text className="text-app-danger text-sm font-sans text-center mt-2">
            {errors.dob?.message}
          </Text>
        )}
      </View>

      <Controller
        name="address1"
        control={control}
        //   rules={{required: 'Password is required'}}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Address line 1"
            placeholder="Address line 1"
            //  onChangeText={username => setValue('username', username)}
            error={errors.address1?.message}
            //{...register('username')}
            value={value}
            onChangeText={onChange}
            disabled={isLoading}
          />
        )}
      />
      <Controller
        name="address2"
        control={control}
        //   rules={{required: 'Password is required'}}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Address line 2"
            placeholder="Address line 2"
            textContentType="username"
            //  onChangeText={username => setValue('username', username)}
            error={errors.address2?.message}
            //{...register('username')}
            value={value}
            onChangeText={onChange}
            disabled={isLoading}
          />
        )}
      />

      <Controller
        name="city"
        control={control}
        //   rules={{required: 'Password is required'}}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="City"
            placeholder="Address"
            //  onChangeText={username => setValue('username', username)}
            error={errors.city?.message}
            //{...register('username')}
            value={value}
            onChangeText={onChange}
            disabled={isLoading}
          />
        )}
      />

      <Controller
        name="postal"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Postal/Zip Code"
            placeholder="Postal"
            error={errors.postal?.message}
            value={value}
            onChangeText={onChange}
            disabled={isLoading}
          />
        )}
      />

      <View style={{ marginTop: 50, marginBottom: 8 }}>
        <AppButton
          title={isLoading ? "Submitting..." : "Continue"}
          onPress={handleSubmit(onSubmitSignupData)}
          disabled={isLoading || !isValid}
        />
      </View>
    </View>
  );
};
