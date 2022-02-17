import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import Constants from "expo-constants";

import { useRecoilValue, useSetRecoilState, atom } from "recoil";

import { Card, IconButton } from "react-native-paper";

import TodoItemCreator from "../../components/TodoItemCreator";
import TodoListFilters from "../../components/TodoListFilters";
import TodoListStats from "../../components/TodoListStats";
import TodoItem from "../../components/TodoItem";

import { filteredTodoListState } from "../../recoil/selector";

export default function App({ navigation }) {
  const todoList = useRecoilValue(filteredTodoListState);

  navigation.setOptions({
    headerRight: () => (
      <Pressable onPress={() => navigation.push("TodoAdd")}>
        <IconButton
          icon="plus-box-outline"
          color={"rgba(0, 0, 0, .5)"}
          size={26}
          style={{ marginRight: -10 }}
        />
      </Pressable>
    ),

    headerLeft: () => (
      <Pressable onPress={() => navigation.push("TodoAccount")}>
        <IconButton
          icon="account-circle-outline"
          color={"rgba(0, 0, 0, .5)"}
          size={26}
          style={{ marginLeft: -10 }}
        />
      </Pressable>
    ),
  });

  const renderItem = ({ item }) => <TodoItem key={item.id} item={item} />;

  return (
    <View style={styles.container}>
      <TodoListFilters />
      <FlatList
        data={todoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
});
