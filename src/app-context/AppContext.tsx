import {
  NewToDoDetail,
  ToDoDetail,
  UpdateToDoDetail,
} from "@/models/ToDoDetail";
import { createContext, ReactNode, useState } from "react";

export interface AppContext {
  todoList: ToDoDetail[];
  addToDoItem: (todoItem: NewToDoDetail) => void;
  deleteToDoItem: (id: number) => void;
  editToDoItem: (id: number, todoItem: UpdateToDoDetail) => void;
  updateToDoItemStatus: (id: number, completed: boolean) => void;
  readToDoItem: (id: number) => ToDoDetail | undefined;
}

export const AppContext = createContext<AppContext | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todoList, setTodoList] = useState<ToDoDetail[]>(
    Array.from({ length: 25 }, (_, index) => ({
      id: index + 1,
      name: "ToDo Title",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
    }))
  );

  const addToDoItem = (todoItem: NewToDoDetail) => {
    if (todoItem?.name === undefined || todoItem?.desc === undefined) return;

    let nextId = getNextItemId();

    setTodoList([
      ...todoList,
      { id: nextId, name: todoItem.name!, desc: todoItem.desc },
    ]);
  };

  const deleteToDoItem = (id: number) => {
    if (id <= 0) return;

    setTodoList(todoList.filter((x) => x.id !== id));
  };

  const editToDoItem = (id: number, todoItem: UpdateToDoDetail) => {
    updateToDoItem(id, todoItem);
  };

  const updateToDoItemStatus = (id: number, completed: boolean) => {
    updateToDoItem(id, { isCompleted: completed });
  };

  const readToDoItem = (id: number): ToDoDetail | undefined => {
    if (id <= 0) return;

    return todoList.find((x) => x.id === id);
  };

  const updateToDoItem = (id: number, todoItem: UpdateToDoDetail) => {
    if (id <= 0) return;

    var itemIndex = todoList.findIndex((x) => x.id === id);
    if (itemIndex === -1) return;

    if (todoItem.name) todoList[itemIndex].name = todoItem.name!;
    if (todoItem.desc) todoList[itemIndex].desc = todoItem.desc!;
    if (todoItem.isCompleted !== undefined)
      todoList[itemIndex].isCompleted = todoItem.isCompleted!;

    console.log(
      "updateToDoItem",
      todoItem.isCompleted,
      itemIndex,
      todoList[itemIndex].isCompleted,
      todoList[itemIndex]
    );
    setTodoList([...todoList]);
  };
  const getNextItemId = () => {
    if (todoList.length <= 0) return 1;

    return (
      todoList.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1
    );
  };

  return (
    <AppContext.Provider
      value={{
        todoList,
        addToDoItem,
        deleteToDoItem,
        editToDoItem,
        updateToDoItemStatus,
        readToDoItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
