import { IUserWithToken } from "./IUser"

export interface ITask {
    _id: number
    title: string
    details: string
    isDone: boolean
}

export interface IFormUserProps {
    title: string
    buttonText: string
    path?: string
    linkText: string
    linkPath: string
    errorMessage: string
    handleUser: (email: string, password: string) => void
}

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

export interface ITaskCardProps {
    task: ITask 
    handleEdit: (task: ITask) => void
}
