import * as React from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import Constants from "expo-constants";

import {
  Text,
  Title,
  Caption,
  Card,
  ProgressBar,
  Divider,
} from "react-native-paper";

import { useRecoilValue } from "recoil";
import { todoListStatsState } from "../../recoil/selector";

const Item = ({ title, subTitle }) => (
  <View style={{ margin: 10 }}>
    <View style={{ flexDirection: "row" }}>
      <Text style={{ textAlign: "left", color: "rgba(0,0,0,0.6)", flex: 1 }}>
        {title}
      </Text>
      <Text style={{ textAlign: "right", flex: 1 }}>{subTitle}</Text>
    </View>
  </View>
);

export default function App(props) {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    useRecoilValue(todoListStatsState);

  const formattedPercentCompleted =
    percentCompleted == 1.0 ? 1 : parseFloat(percentCompleted).toFixed(1);

  const DATA = [
    {
      id: 0,
      title: "Total todo",
      subTitle: totalNum,
    },
    {
      id: 1,
      title: "Completed",
      subTitle: totalCompletedNum,
    },
    {
      id: 2,
      title: "Uncompleted",
      subTitle: totalUncompletedNum,
    },
  ];

  const {} = props;
  const renderItem = ({ item }) => (
    <Item title={item.title} subTitle={item.subTitle} />
  );

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 50,
          width: 0.5,
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Overall progress</Text>
      <ProgressBar
        progress={parseFloat(formattedPercentCompleted)}
        color={"#2469d6"}
        style={{ margin: 10 }}
      />

      <Text style={styles.title}>Your stats</Text>
      <View style={{}}>
        <FlatList
          // ItemSeparatorComponent={FlatListItemSeparator}
          horizontal={false}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "left",
    color: "rgba(0,0,0,0.8)",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
});
