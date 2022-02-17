import * as React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";

import { Text, Title, Avatar, Card } from "react-native-paper";

import {
  useRecoilValue,
  useSetRecoilState,
  atom,
  selector,
  useRecoilState,
} from "recoil";

import { todoListState } from "../recoil/atom";
import { replaceItemAtIndex, removeItemAtIndex } from "../middleware";

import { useNavigation } from "@react-navigation/native";

export default function App(props) {
  const { item, route } = props;

  const navigation = useNavigation();

  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });
    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  };

  return (
    <Pressable
      onPress={() => navigation.push("TodoEdit", { item: item })}
      style={[styles.container, { backgroundColor: item.color }]}
    >
      <View style={{ flexDirection: "row" }}>
        <Title style={{ fontWeight: "bold", color: "black", flex: 7 }}>
          {item.title}
        </Title>

        <Pressable
          onPress={toggleItemCompletion}
          style={{ alignSelf: "flex-end", flex: 1 }}
        >
          <Avatar.Icon
            size={50}
            icon={
              item.isComplete ? "checkbox-marked" : "checkbox-blank-outline"
            }
            color={"black"}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          />
        </Pressable>
      </View>
      <Text style={{ color: "black", marginTop: -6 }}>{item.text}</Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Avatar.Icon
            size={24}
            icon={"calendar-month"}
            color={"black"}
            style={{ backgroundColor: "rgba(0,0,0,0)", marginLeft: -7 }}
          />
          <Text>{item.time.format("LL")}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Avatar.Icon
            size={24}
            icon={"clock-outline"}
            color={"black"}
            style={{ backgroundColor: "rgba(0,0,0,0)", marginLeft: -7 }}
          />
          <Text>{item.time.format("LT")}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 6,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
