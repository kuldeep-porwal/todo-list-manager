//import liraries
import CustomIcon from "@/components/CustomIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppContext } from "@/hooks/useAppContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ToDoDetail } from "@/models/ToDoDetail";
import {
  RouteParams,
  SearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

// create a component
const addToDoItem = () => {
  const textColor = useThemeColor({}, "text");

  const { readToDoItem, addToDoItem, editToDoItem } = useAppContext();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [itemId, setItemId] = useState<number | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const upsertTodoItem = () => {
    if (title == "") return;

    const todoItem = { name: title, desc: description };
    if (itemId) editToDoItem(itemId!, todoItem);
    else addToDoItem(todoItem);

    navigateToHome();
  };

  const navigateToHome = () => {
    router.push({ pathname: "/" });
  };

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      const todoItem = readToDoItem(parseInt(id.toString()));
      if (todoItem) {
        console.log(todoItem);
        setItemId(todoItem.id);
        setTitle(todoItem.name);
        setDescription(todoItem.desc);
      }
    }
  }, [id]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={navigateToHome}
          >
            <CustomIcon
              name="arrow-back-sharp"
              size={30}
              color={textColor}
              style={styles.headerButtonIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextContainer}>
          <ThemedText type="subtitle" style={styles.headerText}>
            Add Task
          </ThemedText>
        </View>
      </ThemedView>
      <View style={styles.addItemFormContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={setTitle}
            style={styles.inputText}
            placeholder="Title"
            value={title}
            selectionColor="#8B8787" // Change cursor color here
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={3}
            style={styles.inputText}
            placeholder="Description"
            selectionColor="#8B8787" // Change cursor color here
          />
        </View>
        <TouchableOpacity onPress={upsertTodoItem}>
          <ThemedView style={styles.inputButtonContainer}>
            <ThemedText style={styles.inputButton}>
              {itemId ? "Update" : "Add"}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    marginTop: 0,
    backgroundColor: "#fff",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 0,
  },
  headerTextContainer: {
    marginStart: 20,
  },
  headerText: {},
  headerButtonContainer: {
    marginEnd: 20,
  },
  headerButton: { marginHorizontal: 5 },
  headerButtonIcon: {},
  backButtonContainer: {
    marginStart: 10,
  },
  addItemFormContainer: {},
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#8B8787",
    padding: 10,
    margin: 15,
    marginHorizontal: 30,
  },
  inputText: {
    fontSize: 20,
  },
  inputButton: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  inputButtonContainer: {
    padding: 15,
    margin: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});

//make this component available to the app
export default addToDoItem;
