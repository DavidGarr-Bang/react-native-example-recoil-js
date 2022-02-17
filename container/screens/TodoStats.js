import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import { useRecoilValue } from "recoil";
import { todoListStatsState } from "../recoil/selector";

import { Card } from "react-native-paper";

export default function App() {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = parseFloat(percentCompleted).toFixed(1);
  return (
    <View style={styles.container}>
      <Text>Total items: {totalNum}</Text>
      <Text>Completed: {totalCompletedNum}</Text>
      <Text>Not completed: {totalUncompletedNum}</Text>
      <Text>Percent completed: {formattedPercentCompleted}</Text>
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
