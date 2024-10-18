//import liraries
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export type CustomIconProps = IconProps<any> & {};

// create a component
const CustomIcon = ({ name, size, color }: CustomIconProps) => {
  return <Ionicons name={name} size={size} color={color} />;
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default CustomIcon;
