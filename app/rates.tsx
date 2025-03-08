import { AppContainer } from "@/components/AppContainer";
import { AppButton } from "@/components/Button";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LandingScreen() {
  const router = useRouter();

  const exchangeRates = [
    {
      name: "DON",
      status: "Buying",
      rate: {
        baseCurrency: "CAD",
        exchangeRate: 90.5,
        quoteCurrency: "KSH",
      },
    },
    {
      name: "RITA",
      status: "Selling",
      rate: {
        baseCurrency: "USD",
        exchangeRate: 780,
        quoteCurrency: "NGN",
      },
    },
    {
      name: "JANE",
      status: "Buying",
      rate: {
        baseCurrency: "EUR",
        exchangeRate: 1150,
        quoteCurrency: "UGX",
      },
    },

    {
      name: "ODEGA",
      status: "Selling",
      rate: {
        baseCurrency: "ZAR",
        exchangeRate: 2300,
        quoteCurrency: "MWK",
      },
    },
    {
      name: "AKUA",
      status: "Buying",
      rate: {
        baseCurrency: "CHF",
        exchangeRate: 4100,
        quoteCurrency: "RWF",
      },
    },
    {
      name: "KOFI",
      status: "Selling",
      rate: {
        baseCurrency: "JPY",
        exchangeRate: 820,
        quoteCurrency: "MZN",
      },
    },
    {
      name: "YAA",
      status: "Buying",
      rate: {
        baseCurrency: "CNY",
        exchangeRate: 1200,
        quoteCurrency: "BWP",
      },
    },

    {
      name: "ADJOA",
      status: "Buying",
      rate: {
        baseCurrency: "BRL",
        exchangeRate: 2100,
        quoteCurrency: "SZL",
      },
    },
    {
      name: "ABA",
      status: "Selling",
      rate: {
        baseCurrency: "RUB",
        exchangeRate: 1100,
        quoteCurrency: "STD",
      },
    },
    {
      name: "EBO",
      status: "Buying",
      rate: {
        baseCurrency: "MXN",
        exchangeRate: 1800,
        quoteCurrency: "MAD",
      },
    },
    {
      name: "AFIA",
      status: "Selling",
      rate: {
        baseCurrency: "TRY",
        exchangeRate: 2600,
        quoteCurrency: "ERN",
      },
    },

    {
      name: "ABENA",
      status: "Selling",
      rate: {
        baseCurrency: "HKD",
        exchangeRate: 3100,
        quoteCurrency: "GMD",
      },
    },
    {
      name: "AKWASI",
      status: "Buying",
      rate: {
        baseCurrency: "SGD",
        exchangeRate: 3300,
        quoteCurrency: "SLL",
      },
    },
    {
      name: "DORA",
      status: "Selling",
      rate: {
        baseCurrency: "SEK",
        exchangeRate: 3500,
        quoteCurrency: "SCR",
      },
    },

    {
      name: "BERNICE",
      status: "Selling",
      rate: {
        baseCurrency: "DKK",
        exchangeRate: 3900,
        quoteCurrency: "BIF",
      },
    },
    {
      name: "NANA",
      status: "Buying",
      rate: {
        baseCurrency: "PLN",
        exchangeRate: 4100,
        quoteCurrency: "DJF",
      },
    },
  ];

  return (
    <AppContainer
      barColor="light-content"
      barTranslucent
      barBackground="transparent"
      showBackButton={true}
      allowContentContainer={true}
      title="Exchange Rates"
      showScreenTitle
    >
      <View className="flex-1">
        <View className="my-2">
          <Text className="font-sans text-[#0C263A] font-medium text-base pb-3">
            Live exchange rates
          </Text>
        </View>
        <ScrollView
          contentContainerClassName="pb-3"
          showsVerticalScrollIndicator={false}
        >
          {exchangeRates.map((rate) => {
            return (
              <View
                className="flex-row px-2 justify-between my-3"
                key={rate.name}
              >
                <View className="flex-row gap-3">
                  <Pressable
                    style={{ backgroundColor: "rgba(230, 242, 239, 0.95)" }}
                    className="w-[30] h-[30] rounded-2xl justify-center "
                  >
                    <Text className="text-[#22A37C] font-medium text-lg text-center">
                      {rate.name.slice(0, 2)}
                    </Text>
                  </Pressable>
                  <View>
                    <Text className="text-black text-base font-sans capitalize">
                      {rate.name.toLowerCase()}
                    </Text>
                    <Text className="text-gray-500 text-sm font-sans">
                      Rate 1 {rate.rate.baseCurrency} = {rate.rate.exchangeRate}{" "}
                      {rate.rate.quoteCurrency}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text className="text-[#22A37C] text-base text-center">
                    {rate.status}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View className="mb-10">
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
      </View>
    </AppContainer>
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
