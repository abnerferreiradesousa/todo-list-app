import { Dispatch, SetStateAction } from "react";
import { ITask } from "./ITask";

export interface IPaginationWrapperProps {
  totalTasks: number;
  postsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
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

export interface ITaskCardProps {
  task: ITask 
  handleEdit: (task: ITask) => void
}
