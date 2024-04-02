import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar
          backgroundColor="#343741"
          barStyle="light-content"
          translucent={false}
        />
        <Routes />
      </NavigationContainer>
    </>
  );
}
