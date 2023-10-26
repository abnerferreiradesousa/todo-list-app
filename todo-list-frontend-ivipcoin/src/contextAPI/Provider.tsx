'use client'
import { PropsWithChildren, useState } from "react";
import { Context } from "./Context";
import { ITask } from "@/app/types/ITask";
import { IUserWithToken } from "@/app/types/IUser";

const Provider = ({ children }: PropsWithChildren) => {
  const [search, setSearch] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksDefault, setTasksDefault] = useState<ITask[]>([]);
  const [errorMessage, setErrorMessage] = useState("")
  const [userInfo, setUserInfo] = useState<IUserWithToken>({
    user: {
      _id: '',
      email: '',
      password: '',
    },
    token: ''
  });
  const [taskToEdit, setTaskToEdit] = useState<ITask & { isEditing: boolean }>({
    _id: 0,
    title: '',
    details: '',
    isDone: false,
    isEditing: false
  });

  const state = {
    search, setSearch,
    tasks, setTasks,
    tasksDefault, setTasksDefault,
    taskToEdit, setTaskToEdit,
    userInfo, setUserInfo,
    errorMessage, setErrorMessage
  }
  

  return (
    <div>
      <Context.Provider value={state}>
        {children}
      </Context.Provider>
    </div>
  )
}

export default Provider;