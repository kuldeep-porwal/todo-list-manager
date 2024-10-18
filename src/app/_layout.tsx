import AppProvider from "@/app-context/AppContext";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";

export default function RootLayout() {
  const bcColor = useThemeColor({}, "background");
  return (
    <AppProvider>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <StatusBar
          backgroundColor={bcColor} // For Android
          barStyle={Platform.OS === "ios" ? "light-content" : "default"} // For iOS
        />
        <Stack initialRouteName="index">
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              headerTitleAlign: "center",
              title: "Available ToDo List",
            }}
          />
          <Stack.Screen
            name="addTodoItem"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SafeAreaView>
    </AppProvider>
  );
}
