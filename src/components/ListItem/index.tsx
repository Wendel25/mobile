import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ItemProps } from "../../interfaces/ListItemInterface";
import { api } from "../../services/api";

export function ListItem({ data, deleteItem }: ItemProps) {
  async function DeleteItems() {
    deleteItem(data.id);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        {data.amount} - {data.name}
      </Text>

      <TouchableOpacity onPress={DeleteItems}>
        <Feather name="trash-2" color="#FF3F4B" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F222B",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: "#8a8a8a",
  },
  item: {
    color: "#fff",
  },
});
