import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  FlatList,
} from "react-native";

import Constants from "expo-constants";

import { Avatar, Card, IconButton, Caption } from "react-native-paper";

import moment from "moment";

import { useSetRecoilState } from "recoil";
import { todoListState } from "../../recoil/atom";

let colors = [
  { id: 0, color: "rgb(236,121,65)" },
  { id: 1, color: "rgb(122,225,122)" },
  { id: 2, color: "rgb(130,193,225)" },
  { id: 3, color: "rgb(188,189,236)" },
  { id: 4, color: "rgb(241,203,112)" },
];

let taskType = [
  { id: 0, text: "Basic" },
  { id: 1, text: "Urgnet" },
  { id: 2, text: "Important" },
];

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}

export default function App({ navigation }) {
  const [inputTask, setinputTask] = useState("");
  const [inputTitle, setinputTitle] = useState("");

  const setTodoList = useSetRecoilState(todoListState);
  const [colorPicked, setColorPicked] = useState(0);

  const inputRef = React.useRef();

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        title: inputTitle,
        text: inputTask,
        color: colors[colorPicked].color,
        isComplete: false,
        time: moment(),
      },
    ]);
    setinputTask("");
    navigation.goBack();
  };

  navigation.setOptions({
    headerRight: () => (
      <IconButton
        icon="check"
        color={"rgba(3, 41, 64, .8)"}
        size={26}
        onPress={addItem}
        style={{ marginRight: -10 }}
      />
    ),
  });

  const renderItem = ({ item }) => (
    <Pressable
      style={{
        flex: 1,
        marginLeft: 0,
        marginRight: 10,
        width: 30,
        height: 30,
        backgroundColor: item.color,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      }}
      onPress={() => setColorPicked(item.id)}
    >
      {colorPicked == item.id ? (
        <Avatar.Icon
          size={28}
          icon="check"
          style={{ backgroundColor: "rgba(0,0,0,0)" }}
        />
      ) : null}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={{ margin: 10 }}>
        <Caption>Task title</Caption>
        <TextInput
          ref={inputRef}
          style={styles.input}
          onChangeText={setinputTitle}
          value={inputTitle}
          autoFocus={true}
        />
      </View>

      <View style={{ margin: 10 }}>
        <Caption>Task</Caption>
        <TextInput
          ref={inputRef}
          style={styles.input}
          onChangeText={setinputTask}
          value={inputTask}
          autoFocus={true}
        />
      </View>

      <View style={{ marginLeft: 10, marginTop: 10 }}>
        <Caption>Color Task</Caption>

        <FlatList
          data={colors}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={colorPicked}
          style={{ marginTop: 10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    padding: 8,
  },
  input: {
    borderBottomWidth: 1,
  },
});
