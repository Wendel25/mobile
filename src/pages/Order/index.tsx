import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { api } from "../../services/api";
import {
  CategoryProps,
  ItemsProps,
  ProductsProps,
  RouterDetailParams,
} from "../../interfaces/OrdensInterface";
import { ModalCategory } from "../../components/Modal";
import { ListItem } from "../../components/ListItem";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

type OrderRouterProps = RouteProp<RouterDetailParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouterProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [products, setProducts] = useState<ProductsProps[] | []>([]);
  const [productsSelected, setProductsSelected] = useState<ProductsProps>();
  const [modalProductsVisible, setModalProductsVisible] = useState(false);

  const [amount, setAmount] = useState("1");
  const [items, setItems] = useState<ItemsProps[]>([]);

  useEffect(() => {
    async function loadingInfoCategory() {
      const response = await api.get("/categories");

      setCategory(response.data);
      setCategorySelected(response.data[0]);
    }

    loadingInfoCategory();
  }, []);

  useEffect(() => {
    async function loadingProducts() {
      const response = await api.get("/category/product", {
        params: {
          category_id: categorySelected?.id,
        },
      });

      setProducts(response.data);
      setProductsSelected(response.data[0]);
    }

    loadingProducts();
  }, [categorySelected]);

  async function handleDeleteOrder() {
    try {
      await api.delete("/order", {
        params: {
          order_id: route.params?.order_id,
        },
      });

      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  function handleChangeProducts(item: ProductsProps) {
    setProductsSelected(item);
  }

  async function handleAddItem() {
    const response = await api.post("/order/add", {
      order_id: route.params?.order_id,
      product_id: productsSelected?.id,
      amount: Number(amount),
    });

    let data = {
      id: response.data.id,
      product_id: productsSelected?.id as string,
      name: productsSelected?.name as string,
      amount: amount,
    };

    setItems((oldArray) => [...oldArray, data]);
  }

  async function handleDeleteItem(item_id: string) {
    await api.delete("/order/item", {
      params: {
        item_id: item_id,
      },
    });

    let removeItems = items.filter((item) => {
      return item.id !== item_id;
    });

    setItems(removeItems);
  }

  async function finishOrder() {
    navigation.navigate("FinishOrder", {
      number: route.params?.number,
      order_id: route.params?.order_id,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        {items.length === 0 && (
          <TouchableOpacity onPress={handleDeleteOrder}>
            <Feather name="trash-2" size={28} color={"#FF3F4B"} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalCategoryVisible(true)}
      >
        <Text style={{ color: "#ffffff" }}>{categorySelected?.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalProductsVisible(true)}
      >
        <Text style={{ color: "#ffffff" }}>{productsSelected?.name}</Text>
      </TouchableOpacity>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[styles.input, { width: "60%", textAlign: "center" }]}
          placeholderTextColor="#248EA6"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItem}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
          disabled={items.length === 0}
          onPress={finishOrder}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem data={item} deleteItem={handleDeleteItem} />
        )}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalCategory
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductsVisible}
        animationType="fade"
      >
        <ModalCategory
          handleCloseModal={() => setModalProductsVisible(false)}
          options={products}
          selectedItem={handleChangeProducts}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "5%",
    backgroundColor: "#343741",
    paddingEnd: "4%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 14,
  },
  input: {
    backgroundColor: "#1F222B",
    borderRadius: 4,
    width: "100%",
    height: 40,
    marginBottom: 12,
    justifyContent: "center",
    paddingHorizontal: 8,
    color: "#ffffff",
    fontSize: 20,
  },
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtdText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonAdd: {
    width: "20%",
    backgroundColor: "#30e8a2",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F222B",
  },
  button: {
    width: "75%",
    backgroundColor: "#248EA6",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
