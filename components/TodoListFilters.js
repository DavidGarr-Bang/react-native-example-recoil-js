import * as React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";

import { Text, Card } from "react-native-paper";

import {
  useRecoilValue,
  useSetRecoilState,
  atom,
  useRecoilState,
} from "recoil";

import { todoListFilterState } from "../recoil/atom";

export default function App() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const [filterid, setFilterid] = React.useState(0);

  const updateFilter = (value) => {
    setFilter(value);
  };

  const items = [
    { value: "Show All", text: "All", id: 0 },
    { value: "Show Completed", text: "Completed", id: 1 },
    { value: "Show Uncompleted", text: "Uncompleted", id: 2 },
  ];

  return (
    <View style={styles.container}>
      {items.map((item, l) => (
        <Pressable
          onPress={() => {
            setFilterid(item.id);
            updateFilter(item.value);
          }}
          style={{
            margin: 3,
            backgroundColor: item.id === filterid ? "black" : "rgba(0,0,0,0.1)",
            borderRadius: 100 / 2,
            paddingTop: 8,
            paddingBottom: 8,
            width: 100,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              padding: 2,
              color: item.id === filterid ? "white" : "black",
            }}
          >
            {item.text}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
});
