import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../container/screens/Home";
import TodoAdd from "../container/screens/TodoAdd";
import TodoEdit from "../container/screens/TodoEdit";

import TodoAccount from "../container/screens/TodoAccount";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerTitleAlign: "center" }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShadowVisible: false,
            headerTitleAlign: "left",
          }}
        />

        <Stack.Screen
          name="TodoAccount"
          component={TodoAccount}
          options={{
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="TodoAdd"
          component={TodoAdd}
          options={{
            title: "New task",
          }}
        />

        <Stack.Screen
          name="TodoEdit"
          component={TodoEdit}
          options={{
            title: "Edit task",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
