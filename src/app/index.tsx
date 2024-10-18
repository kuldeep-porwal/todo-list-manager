import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import CustomIcon from "@/components/CustomIcon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { useAppContext } from "@/hooks/useAppContext";
export default function Index() {
  const { todoList, deleteToDoItem, updateToDoItemStatus } = useAppContext();
  const bcColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const router = useRouter();

  const upsertTodoItem = (id: number | undefined = undefined) => {
    router.push({
      pathname: "/addTodoItem",
      params: {
        id: id,
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <ThemedText type="subtitle" style={styles.headerText}>
            ToDo App
          </ThemedText>
        </View>
        {/* <View style={styles.headerButtonContainer}>
          <TouchableOpacity style={styles.headerButton}>
            <CustomIcon
              name="calendar-number-outline"
              size={30}
              color={textColor}
              style={styles.headerButtonIcon}
            />
          </TouchableOpacity>
        </View> */}
      </ThemedView>
      <FlatList
        style={styles.todoListContainer}
        data={todoList}
        keyExtractor={(item, index) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <ThemedView style={styles.todoItemContainer}>
            <View style={styles.todoItemDetailContainer}>
              <ThemedText style={styles.name}>
                {item.name}-{item.id}
              </ThemedText>
              <Text numberOfLines={2} style={styles.description}>
                {item.desc}
              </Text>
            </View>
            <View style={styles.todoItemButtonContainer}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => upsertTodoItem(item.id)}
              >
                <CustomIcon
                  name="pencil-outline"
                  size={20}
                  color={bcColor}
                  style={styles.headerButtonIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => deleteToDoItem(item.id)}
              >
                <CustomIcon
                  name="trash-outline"
                  size={20}
                  color={bcColor}
                  style={styles.headerButtonIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => updateToDoItemStatus(item.id, !item.isCompleted)}
              >
                <CustomIcon
                  name={
                    item?.isCompleted
                      ? "checkmark-circle"
                      : "checkmark-circle-outline"
                  }
                  size={20}
                  color={item?.isCompleted ? "green" : bcColor}
                  style={styles.headerButtonIcon}
                />
              </TouchableOpacity>
            </View>
          </ThemedView>
        )}
      />
      <ThemedView style={styles.addTodoItemContainer}>
        <TouchableOpacity
          onPress={() => {
            upsertTodoItem();
          }}
          style={styles.addTodoItemButton}
        >
          <Ionicons name="add-outline" size={30} color={textColor} />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: "#D6D7EF",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  todoListContainer: { margin: "auto" },
  todoItemContainer: {
    width: Dimensions.get("screen").width - 30,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
    padding: 5,
    elevation: 2,
  },
  todoItemDetailContainer: {
    flex: 2,
    marginStart: 10,
    marginVertical: 10,
  },
  todoItemButtonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  name: { fontWeight: "bold", textTransform: "uppercase", color: "#9395D3" },
  description: {
    fontSize: 15,
    color: "#000",
  },
  addTodoItemContainer: {
    position: "absolute",
    bottom: 20,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: "#9395D3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  addTodoItemButton: {
    position: "relative",
  },
  contentContainer: {
    paddingBottom: 100, // Add enough padding at the bottom for the absolute footer
  },
});
