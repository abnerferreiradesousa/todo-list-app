import { ITodoListContextState, ITask } from '@/app/types/ITask';
import { IUserWithToken } from '@/app/types/IUser';
import { createContext } from 'react';

const DEFAULT_CONTEXT_STATE = {
  search: '',
  setSearch: () => { },
  tasks: [],
  setTasks: (tasks: ITask[]) => { },
  tasksDefault: [],
  setTasksDefault: (tasks: ITask[]) => { },
  taskToEdit: {
    _id: 0,
    title: '',
    details: '',
    isDone: false,
    isEditing: false
  },
  setTaskToEdit: (task: ITask) => { },
  userInfo: {
    user: {
      _id: '',
      email: '',
      password: '',
    },
    token: ''
  },
  setUserInfo: (user: IUserWithToken) => { },
  errorMessage: '', 
  setErrorMessage: (message: string) => { }
}

export const Context = createContext<ITodoListContextState>(DEFAULT_CONTEXT_STATE); 