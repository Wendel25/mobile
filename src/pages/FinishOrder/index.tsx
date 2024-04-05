import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

import { api } from "../../services/api";

type RouterDetailParams = {
  FinishOrder: {
    number: number | string;
    order_id: string;
  };
};

type FinishOrderRouteProp = RouteProp<RouterDetailParams, "FinishOrder">;

export function FinishOrder() {
  const route = useRoute<FinishOrderRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

  async function handleFinish() {
    try {
      await api.put("order/send", {
        order_id: route.params?.order_id,
      });

      navigation.popToTop();
    } catch (err) {
      console.log("Erro ao finalizar");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.alert}>Deseja finalizar os pedidos?</Text>
      <Text style={styles.title}>Mesa {route.params?.number}</Text>

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.textButton}>Finalizar pedido</Text>
        <Feather name="shopping-cart" color="#1F222B" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "5%",
    backgroundColor: "#343741",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "4%",
  },
  alert: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#248EA6",
    flexDirection: "row",
    width: "65%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  textButton: {
    fontSize: 18,
    marginRight: 8,
    fontWeight: "bold",
    color: "#343741",
  },
});
