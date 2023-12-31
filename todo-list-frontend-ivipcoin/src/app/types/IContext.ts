import { ITask } from "./ITask"
import { IUserWithToken } from "./IUser"

export interface ITodoListContextState {
  search: string
  tasks: ITask[]
  tasksDefault: ITask[]
  taskToEdit: ITask & { isEditing: boolean }
  userInfo: IUserWithToken
  errorMessage: string 
  setErrorMessage: (message: string) => void
  setSearch: (value: string) => void
  setTasks: (tasks: ITask[]) => void
  setTasksDefault: (tasks: ITask[]) => void
  setTaskToEdit: (task: ITask & {isEditing: boolean}) => void
  setUserInfo: (user: IUserWithToken) => void
};