import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import { DropDown, DropDownMenuItem } from "../components/DropDown";
import colors from "../theme/colors";

export const HomeScreen = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <View style={styles.container}>
        <DropDown align="right">
          <DropDownMenuItem onPress={() => console.log("1 pressed!")}>
            Item 1
          </DropDownMenuItem>
          <DropDownMenuItem onPress={() => console.log("2 pressed!")}>
            Item 2
          </DropDownMenuItem>
        </DropDown>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black200,
    alignItems: "center",
    justifyContent: "center",
  },
});
