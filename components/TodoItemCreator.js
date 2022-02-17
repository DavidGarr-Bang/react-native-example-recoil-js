import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import Constants from "expo-constants";

import { Card } from "react-native-paper";

import { useSetRecoilState } from "recoil";
import { todoListState } from "../recoil/atom";

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
      />

      <Pressable
        style={{ backgroundColor: "white", padding: 10 }}
        onPress={addItem}
      >
        <Text style={{ textAlign: "center" }}>Post</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
