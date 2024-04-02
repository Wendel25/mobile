import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

import { AuthProvider } from "./src/contexts/AuthContext";

import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar
            backgroundColor="#343741"
            barStyle="light-content"
            translucent={false}
          />
          <Routes />
          <Toast />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}
