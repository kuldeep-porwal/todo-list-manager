import { AppContext } from "@/app-context/AppContext";
import { useContext } from "react";

export const useAppContext = () => {
  const appContext = useContext(AppContext);

  if (!appContext)
    throw new Error("useTasks must be used within a TaskProvider");

  return appContext;
};
