import { AppContainer } from "@/components/AppContainer";
import AppList from "@/constants/AppPackages";
import { COLOUR_Dark_WHITE } from "@/constants/Styles";
import { AppListType, CurrentUserProps } from "@/constants/types";
import { useGlobalStore } from "@/stores/global-store";
import { useUserStore } from "@/stores/user-store";
import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { FC, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";
import { SwiperFlatList } from "react-native-swiper-flatlist";
const deviceWidth = Dimensions.get("window").width;
const deviceHight = Dimensions.get("window").height;

type ActiveUsersProps = {
  item: CurrentUserProps;
};
type FilType = {
  gender?: string;
  minAge?: number;
  maxAge?: number;
};

const TheRates: FC<AppListType> = ({ rate }) => {
  return (
    <View className="flex-row px-2 justify-between my-3" key={rate.name}>
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
          <Text className="text-gray-500 text-sm font-sans flex-wrap w-[180]">
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
};

export const DashboardHomeScreen = () => {
  const router = useRouter();
  const width = Dimensions.get("window").width;
  const [isSelected, setIsSelected] = useState<string>("");
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const isFocused = useIsFocused();
  const [isFilterGender, setIsFilterGender] = useState<string>("");
  const [minAge, setMinAge] = useState<number>(18);
  const [maxAge, setMaxAge] = useState<number>(50);
  const [isLoadingFilter, setIsLoadingFilter] = useState<boolean>(false);
  const { themeColor, notificationToken } = useGlobalStore((state) => state);
  const [isTopNavVisible, setIsTopNavVisible] = useState(false);
  const [notificationCounter, setNotificationCounter] = useState(0);
  const [isFil, setIsFil] = useState(false);
  const [filPayload, setFilPayload] = useState<FilType>({});
  const { currentUser, isConnected, currentUserLocation, setCurrentUser } =
    useUserStore((state) => state);
  const [isVisibleBalance, setIsVisibleBalance] = useState(false);
  console.log(isFocused, "idffoooo");
  console.log(currentUser, "current boss");
  //const onlineUser = useUserOnline();
  //console.log(onlineUser, 'user isOnline');
  const params = new URLSearchParams();

  const image = false;

  const datas = [
    {
      img: require("../../../../assets/images/couple_bg.jpg"),
      id: 1,
    },
    {
      img: require("../../../../assets/images/couple_bg.jpg"),
      id: 2,
    },
  ];

  const appAd = () => {
    return (
      <SwiperFlatList
        style={{ marginBottom: 20, marginTop: 20, borderRadius: 15 }}
        autoplay
        autoplayLoop
        data={datas}
        index={0}
        autoplayDelay={10}
        showPagination={true}
        paginationStyle={{ top: 132 }}
        paginationStyleItemActive={{
          width: 7,
          height: 7,
          borderRadius: 6.58,
          backgroundColor: "green",
          marginLeft: 3,
          marginRight: 3,
        }}
        paginationStyleItemInactive={{
          backgroundColor: "#D9D9D9",
        }}
        paginationStyleItem={{
          width: 7,
          height: 7,
          borderRadius: 6.58,
          marginLeft: 3,
          marginRight: 3,
        }}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              width: width,
            }}
          >
            {/* {loadingAd && (
        <AdSkeletonLoader
          height={137}
          width={width * 0.9}
          borderRadius={10}
        />
      )} */}
            <Image
              source={item.img}
              resizeMode="cover"
              style={styles.bannerContainer}
              //onLoad={() => setLoadingAd(false)}
            />
          </TouchableOpacity>
        )}
      />
    );
  };

  const onRefresh = () => {
    console.log("dee");
    //refetch();
    //refetchCount();
  };

  const renderItem = ({ item }: { item: AppListType }) => {
    return <TheRates rate={item} />;
  };
  const theCounter = null;

  const onBalancePress = () => {
    setIsVisibleBalance(!isVisibleBalance);
  };

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
      barColor="dark-content"
      appBackgroundColor={COLOUR_Dark_WHITE}
      barBackground={COLOUR_Dark_WHITE}
    >
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          {!currentUser?.profilePhoto?.url ? (
            <TouchableOpacity
              onPress={() => router.push("/dashboard/profile")}
              className="bg-app-ghost rounded-[25] w-[45] h-[45] justify-center items-center"
            >
              <Image
                source={require("../../../../assets/images2/user.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => router.push("/dashboard/profile")}>
              <Image
                source={{ uri: currentUser.profilePhoto.url }}
                style={{ width: 45, height: 45, borderRadius: 25 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          <Text
            className="screen-desc font-bold text-[#0C263A] text-lg"
            style={{ color: themeColor.text }}
          >
            Welcome back, Destiny
          </Text>

          <TouchableOpacity

          //  className="bg-app-ghost rounded-[25] w-[45] h-[45] justify-center items-center"
          >
            <View className="absolute top-1 z-5 left-8 ">
              <Text className="text-app-default font-sans font-bold text-base">
                {notificationCounter == 0 ? null : theCounter}
              </Text>
            </View>
            <Image
              source={require("../../../../assets/images2/notification.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="mt-5">
          <Image
            source={require("../../../../assets/images2/btn.png")}
            resizeMode="contain"
            //style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

        <View>
          <Text className="font-sans text-sm text-[#6B777F] my-2">
            Verify your identity to access full features
          </Text>

          <ImageBackground
            source={require("../../../../assets/images2/banner-top.png")}
            style={{ width: "100%", height: 99 }}
          >
            <View className="flex-row gap-20 items-center mt-3 ml-5">
              <Image
                source={require("../../../../assets/images2/empty-wallet.png")}
                resizeMode="contain"
              />
              <View className="">
                <Text className="text-base text-white font-bold font-sans mb-1">
                  Current balance
                </Text>
                <View className="flex-row items-center gap-3">
                  <Text className="text-lg font-bold text-white font-sans">
                    CAD. 0.00
                  </Text>
                  <TouchableOpacity onPress={onBalancePress}>
                    <Feather
                      name={isVisibleBalance ? "eye" : "eye-off"}
                      size={15}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View className="flex-row items-center justify-between mt-5">
          <View>
            <TouchableOpacity className="">
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../../../assets/images2/fund.png")}
              />
            </TouchableOpacity>
            <Text className="text-center text-base text-[#0C263A] top-1">
              Fund wallet
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                style={{ width: 50, height: 50 }}
                source={require("../../../../assets/images2/swap.png")}
              />
            </TouchableOpacity>
            <Text className="text-center text-base text-[#0C263A] top-1">
              Swap
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../../../assets/images2/buySell.png")}
              />
            </TouchableOpacity>
            <Text className="text-center text-base text-[#0C263A] top-1">
              Buy/Sell
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../../../assets/images2/withdraw.png")}
              />
            </TouchableOpacity>
            <Text className="text-center text-base text-[#0C263A] top-1">
              Withdraw
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between mt-8 mb-1">
          <Text className="text-base font-sans text-[#0C263A] font-bold">
            Sell Offers
          </Text>
          <TouchableOpacity>
            <Text className="text-[#004BEC] text-sm font-sans">See all</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 bg-white p-4">
          <AppList
            data={exchangeRates}
            renderItem={renderItem}
            estimatedItemSize={200}
            numColumns={1}
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
            // ListFooterComponent={renderFooter}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={false}
            //     onRefresh={onRefresh}
            //     colors={["#22A37C"]}
            //   />
            // }
          />
        </View>
      </View>
    </AppContainer>
  );
};

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  bannerContainer: {
    width: width,
    height: 120,
    borderRadius: 10,
  },
  paginationStyle: {
    bottom: 10,
  },
});
