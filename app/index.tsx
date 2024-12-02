import React from "react";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "@/components/HomePage";
import AvecMobile from "@/components/AvecMobile";
import Sans from "@/components/Sans";
import MobileIDAuth from "@/components/MobileIDAuth";
import Acceuil from "@/components/Acceuil";

import "core-js/stable";
import "regenerator-runtime/runtime";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomePage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="LoginIde" component={AvecMobile} />
          <Stack.Screen name="Acceuil" component={Acceuil} />
          <Stack.Screen name="LoginId" component={MobileIDAuth} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
